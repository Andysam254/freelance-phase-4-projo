import React from "react";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";

const Dashboard = () => {
  const userType = "freelancer"; // or "client" based on user role
  const userName = "Samuel"; // Replace with actual user data

  const senderId = 1; // Replace with logged-in user ID
  const receiverId = 2; // Replace with the client/freelancer user I
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Freelance Hub</h2>
        </div>
        <nav className="flex-1 px-4 space-y-4">
          <Link
            to="/"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Settings
          </Link>
          <Link onClick={()=>logout()}  class="block py-2 px-3 rounded hover:bg-gray-700">
          Logout
          </Link>

        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">Welcome, {userName}!</h1>
          <p className="text-gray-600 text-center">
            Here’s your dashboard with the latest updates.
          </p>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-xl font-semibold">Applications</h2>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-green-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-xl font-semibold">Posted Jobs</h2>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-xl font-semibold">Messages</h2>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>

        {/* Action Sections */}
        <section>
          {userType === "freelancer" ? (
            <>
              {/* Suggested Jobs */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Suggested Jobs</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p>No job suggestions available at the moment.</p>
                </div>
              </div>

              {/* Application Status */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Applications</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p>Track the status of your job applications here.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Posted Jobs */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Your Posted Jobs</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p>Manage your posted jobs and applications.</p>
                </div>
              </div>

              {/* Freelancer Applications */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Freelancer Applications</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <p>Review and manage applications from freelancers.</p>
                </div>
              </div>
            </>
          )}
        </section>

          {/* Chat Section */}
          <div className="col-span-3">
            <Chat senderId={senderId} receiverId={receiverId} />
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
