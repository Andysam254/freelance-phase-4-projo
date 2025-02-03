import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Jobdetails from './pages/Jobdetail';
import Profile from './pages/Profile';
import BrowseJobs from './pages/BrowseJobs';
import Dashboard from './pages/Dashboard';
import FindFreelancers from './pages/Findfreelancers';
import PostJobs from './pages/PostJobs';
import JobCard from './components/JobCard';
import Chat from './components/Chat';
import { UserProvider } from './context/UserContext';
import { JobProvider } from './context/JobContext';
import Register from './pages/Register';

function App() {
  return (
    // Wrapping everything inside BrowserRouter
    <BrowserRouter>
      <UserProvider> {/* UserProvider now inside Router */}
        <JobProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="browsejobs" element={<BrowseJobs />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="postjobs" element={<PostJobs />} />
              <Route path="jobdetails" element={<Jobdetails />} />
              <Route path="findfreelancers" element={<FindFreelancers />} />
              <Route path="jobcard" element={<JobCard />} />
              <Route path="chat" element={<Chat />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </JobProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

// React 18 - Correct Way to Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
