import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from "./components/shared/layout.jsx";
import Login from "./components/Auth/login.jsx";
import Signup from "./components/Auth/Signup.jsx";

// User Screens
import Overview from "../pages/user/Overview/Overview.jsx"; 
import Discover from "../pages/user/Discover/Discover.jsx";
import ProjectList from "../pages/user/MyProjects/ProjectList.jsx";
import Dashboard from "../pages/user/Dashboard/Dashboard.jsx";
import Messages from "../pages/user/Messages/Messages.jsx";
import Profile from "../pages/user/Profile/Profile.jsx";
import Notifications from "../pages/user/Notifications/Notifications.jsx";

// Standalone Test Screen
import TestModal from "../pages/user/Overview/TestModal.jsx"; 

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Standalone Route */}
      <Route path="/test-modal" element={<TestModal />} />

      {/* Main App Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/my-projects" element={<ProjectList />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}

export default App;