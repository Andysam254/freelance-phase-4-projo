import React, { useState, useEffect } from 'react';
import JobCard from '../components/Jobcard'; // Import the JobCard component
import { Link } from 'react-router-dom';

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);  // State to store job data
  const [categories, setCategories] = useState(['All', 'Development', 'Design', 'Writing', 'Marketing']); // Example categories
  const [selectedCategory, setSelectedCategory] = useState('All'); // Selected category filter

  // Fetch job data from an API or a static file (placeholder data here)
  useEffect(() => {
    // Example API request (replace with actual API endpoint)
    const fetchJobs = async () => {
      // This should be replaced with an actual API call
      const response = await fetch('/api/jobs');  // Your API endpoint for jobs
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  // Filter jobs by selected category
  const filteredJobs = selectedCategory === 'All' ? jobs : jobs.filter(job => job.category === selectedCategory);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Jobs</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="text-lg font-semibold mr-4">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">No jobs available in this category. Try another category!</div>
        )}
      </div>

      {/* Add a CTA to post a job */}
      <div className="mt-8 text-center">
        <Link to="/postjobs" className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700">
          Post a Job
        </Link>
      </div>

    </div>
  );
};

export default BrowseJobs;
