import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FindFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories] = useState(['All', 'Development', 'Design', 'Writing', 'Marketing']);
  const [rating, setRating] = useState(0);

  // Fetch freelancer data from the API
  useEffect(() => {
    const fetchFreelancers = async () => {
      const response = await fetch('/api/freelancers'); // Replace with actual API endpoint
      const data = await response.json();
      setFreelancers(data);
    };
    fetchFreelancers();
  }, []);

  // Filter freelancers based on search and selected filters
  const filteredFreelancers = freelancers.filter((freelancer) => {
    return (
      (selectedCategory === 'All' || freelancer.category === selectedCategory) &&
      (rating === 0 || freelancer.rating >= rating) &&
      (freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );
  });

  return (
    <div className="container mx-auto p-6">
      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Find the Perfect Freelancer
      </h1>

      {/* Search and Filter Section */}
      <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-lg">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-2/3 border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Options */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block font-semibold mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex-1">
            <label className="block font-semibold mb-2">Minimum Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All</option>
              <option value={4}>4 Stars & Above</option>
              <option value={3}>3 Stars & Above</option>
              <option value={2}>2 Stars & Above</option>
              <option value={1}>1 Star & Above</option>
            </select>
          </div>
        </div>
      </div>

      {/* Freelancers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={freelancer.profilePicture || '/default-avatar.png'}
                alt={freelancer.name}
                className="w-20 h-20 rounded-full mb-4 mx-auto"
              />
              <h2 className="text-xl font-bold text-center text-gray-800">
                {freelancer.name}
              </h2>
              <p className="text-center text-gray-600">{freelancer.profession}</p>
              <p className="text-center mt-2">
                <span className="font-semibold">Rating:</span> {freelancer.rating} ⭐
              </p>
              <p className="text-center mt-2">
                <span className="font-semibold">Hourly Rate:</span> ${freelancer.hourlyRate}/hr
              </p>
              <Link
                to={`/freelancer/${freelancer.id}`}
                className="block bg-blue-600 text-white py-2 px-6 rounded-lg text-center mt-4 hover:bg-blue-700"
              >
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No freelancers found. Try adjusting your filters!
          </div>
        )}
      </div>
    </div>
  );
};

export default FindFreelancers;
