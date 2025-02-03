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
    fetch("http://127.0.0.1:5000/api/jobs", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [onChange]);

  // ================================ FETCH APPLICATIONS ====================================
  useEffect(() => {
    if (authToken) {
      fetch("http://127.0.0.1:5000/api/applications", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
        })
        .catch((error) => console.error("Error fetching applications:", error));
    }
  }, [onChange, authToken]);

  // ================================ APPLY FOR JOB ====================================
  const applyForJob = (jobId, coverLetter, resume) => {
    if (!authToken) {
      toast.error("Please log in to apply for jobs.");
      return;
    }

    toast.loading("Submitting application...");
    fetch("http://127.0.0.1:5000/api/applications/apply", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ job_id: jobId, cover_letter: coverLetter, resume }),
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
      .catch(() => toast.error("Something went wrong!"));
  };

  // ================================ DELETE JOB (Admin Only) ====================================
  const deleteJob = (jobId) => {
    if (!authToken) {
      toast.error("Unauthorized action!");
      return;
    }

    toast.loading("Deleting job...");
    fetch(`http://127.0.0.1:5000/api/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
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
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <JobContext.Provider value={{ jobs, applications, applyForJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};
