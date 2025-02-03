import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>

      {/* Job Category & Budget */}
      <p className="text-gray-500 text-sm my-2">
        Category: <span className="font-medium text-gray-700">{job.category}</span>
      </p>
      <p className="text-gray-700 font-semibold">💰 Budget: ${job.budget}</p>

      {/* Job Description */}
      <p className="text-gray-600 mt-3 text-sm">
        {job.description.length > 100
          ? `${job.description.substring(0, 100)}...`
          : job.description}
      </p>

      {/* Apply Button */}
      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/job/${job.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          View Details
        </Link>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
