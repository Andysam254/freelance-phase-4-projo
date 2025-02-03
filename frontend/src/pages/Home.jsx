import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const jobs = []; // Placeholder for jobs data, you can replace it with context or props later.
  const categories = ['Writing', 'Design', 'Development', 'Marketing', 'Data Entry'];
  const testimonials = [
    { name: 'Jane Doe', role: 'Client', review: 'Great experience hiring freelancers here!' },
    { name: 'John Smith', role: 'Freelancer', review: 'Found amazing opportunities and work.' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white text-center py-16" style={{ backgroundImage: 'url(https://via.placeholder.com/1600x600)' }}>
        <h1 className="text-5xl font-bold">Find Your Next Freelance Job or Hire Top Talent</h1>
        <p className="mt-4 text-xl">Connecting businesses with the best freelancers for every project.</p>
        <div className="mt-8">
          <Link to="/postjobs" className="bg-blue-600 py-3 px-8 rounded-lg text-xl hover:bg-blue-700 mr-4">
            Post a Job
          </Link>
          <Link to="/find-work" className="bg-green-600 py-3 px-8 rounded-lg text-xl hover:bg-green-700">
            Find Work
          </Link>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-6">Why Choose Freelance Hub?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">Quick Matching</h3>
            <p className="mt-2 text-gray-600">Find the perfect freelancer or job in minutes using our smart matching system.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">Secure Payments</h3>
            <p className="mt-2 text-gray-600">We ensure safe and timely payments for every project.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">Verified Freelancers</h3>
            <p className="mt-2 text-gray-600">Only the best freelancers, handpicked and verified for your project.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">24/7 Support</h3>
            <p className="mt-2 text-gray-600">Our support team is always available to help with any issues or questions.</p>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg text-blue-800 font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-6">What Our Users Say</h2>
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <p className="italic">"{testimonial.review}"</p>
              <h4 className="font-semibold text-lg mt-2">{testimonial.name}, <span className="text-sm text-gray-600">{testimonial.role}</span></h4>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-6">Featured Jobs & Freelancers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Featured Job */}
          <div className="border p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">Web Developer</h3>
            <p className="mt-2 text-gray-600">Create and maintain a modern, responsive website.</p>
            <Link to="/jobdetail" className="text-blue-600 hover:underline mt-2">View Job</Link>
          </div>
          {/* Example Featured Freelancer */}
          <div className="border p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">John Doe</h3>
            <p className="mt-2 text-gray-600">Full-stack Developer with 5+ years of experience.</p>
            <Link to="/freelancerprofile" className="text-blue-600 hover:underline mt-2">View Profile</Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">For Clients</h3>
            <ol className="list-decimal pl-6 mt-2 text-gray-600">
              <li>Post a Job</li>
              <li>Review Applicants</li>
              <li>Hire and Pay Securely</li>
            </ol>
          </div>
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">For Freelancers</h3>
            <ol className="list-decimal pl-6 mt-2 text-gray-600">
              <li>Create a Profile</li>
              <li>Apply for Jobs</li>
              <li>Get Paid</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-6">Pricing Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">Basic</h3>
            <p className="mt-2 text-gray-600">Free plan with limited features for freelancers.</p>
            <Link to="/pricing" className="text-blue-600 hover:underline mt-2">Learn More</Link>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl text-blue-800">Pro</h3>
            <p className="mt-2 text-gray-600">Advanced features for clients and freelancers.</p>
            <Link to="/pricing" className="text-blue-600 hover:underline mt-2">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
