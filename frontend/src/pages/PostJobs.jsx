import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Updating existing job
      const updatedJobs = [...jobs];
      updatedJobs[editingIndex] = { title, description, deadline, category_id };
      setJobs(updatedJobs);
      setEditingIndex(null);
      toast.success("Job updated successfully!");
    } else {
      // Adding a new job
      setJobs([...jobs, { title, description, deadline, category_id }]);
      toast.success("Job posted successfully!");
    }
    // Clear form fields
    setTitle("");
    setCategoryId("");
    setDescription("");
    setDeadline("");
  };

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    toast.error("Job deleted successfully!");
  };

  const handleEdit = (index) => {
    const job = jobs[index];
    setTitle(job.title);
    setCategoryId(job.category_id);
    setDescription(job.description);
    setDeadline(job.deadline);
    setEditingIndex(index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-12">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Post a Job Opportunity
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Fill in the details below to connect with skilled freelancers.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Category</label>
          <select
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
            required
          >
            <option value="">Select Category</option>
            <option value="1">Development</option>
            <option value="2">Design</option>
            <option value="3">Marketing</option>
            <option value="4">Writing</option>
            <option value="5">Consulting</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
            rows="5"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg hover:bg-indigo-700"
          >
            {editingIndex !== null ? "Update Job" : "Post Job"}
          </button>
        </div>
      </form>

      {/* Display Jobs */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Posted Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job, index) => (
              <li key={index} className="p-4 bg-white shadow rounded-md">
                <h4 className="text-xl font-bold">{job.title}</h4>
                <p className="text-gray-700">{job.description}</p>
                <p className="text-gray-500">Deadline: {job.deadline}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}