import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [onChange, setOnChange] = useState(true);

  // ================================ FETCH JOBS =====================================
  useEffect(() => {
    fetch("https://freelance-phase-4-projo.onrender.com/job/all", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
  }, []);

  // ================================ FETCH APPLICATIONS ====================================
  useEffect(() => {
    if (authToken) {
      fetch("https://freelance-phase-4-projo.onrender.com/applications", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
        })
        .catch((error) => console.error("Error fetching applications:", error));
    }
  }, []);

  // ================================ APPLY FOR JOB ====================================
  const applyForJob = (title , description , skills_required , budget  ,deadline , category) => {
    if (!authToken) {
      toast.error("Please log in to apply for jobs.");
      return;
    }

    toast.loading("Submitting application...");
    fetch("https://freelance-phase-4-projo.onrender.com/jobs/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify({ title , description , skills_required , budget  ,deadline , category }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        toast.dismiss();
        if (response.success) {
          toast.success("Application submitted successfully!");
          setOnChange(!onChange);
        } else {
          toast.error(response.error || "Failed to apply.");
        }
      })
  };

  // ================================ DELETE JOB (Admin Only) ====================================
  const deleteJob = (jobId) => {
    if (!authToken) {
      toast.error("Unauthorized action!");
      return;
    }

    toast.loading("Deleting job...");
    fetch(`https://freelance-phase-4-projo.onrender.com/jobs${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        toast.dismiss();
        if (response.success) {
          toast.success("Job deleted successfully.");
          setOnChange(!onChange);
          navigate("/");
        } else {
          toast.error(response.error || "Failed to delete job.");
        }
      })
  };

  return (
    <JobContext.Provider value={{ jobs, applications, applyForJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};
