import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🟢 Components & Routes ('src' folder ke andar hain -> ./)
import Layout from "./components/shared/layout.jsx";
import Login from "./components/Auth/login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";

// 🔵 Pages ('src' ke baahar root level par hain -> ../)
import Overview from "../pages/user/Overview/Overview.jsx"; 
import Discover from "../pages/user/Discover/Discover.jsx";
import ProjectList from "../pages/user/MyProjects/ProjectList.jsx";
import Dashboard from "../pages/user/Dashboard/Dashboard.jsx";
import Messages from "../pages/user/Messages/Messages.jsx";
import Profile from "../pages/user/Profile/Profile.jsx";
import Notifications from "../pages/user/Notifications/Notifications.jsx";
import CollaborationRequests from "../pages/user/CollaborationRequests/CollaborationRequests.jsx";
import AdminOverview from "../pages/user/AdminOverview.jsx/AdminOverview.jsx";
import SavedProjects from "../pages/user/SavedProjects/SavedProjects.jsx";
import HomePage from '../pages/Homepage/homepage.jsx';

export default function App() {
  return (
    <Routes>
      {/* 🔓 Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      

            <Route path="/" element={<HomePage />} />



<<<<<<< HEAD
      {/* 🔴 ADMIN ONLY ROUTES (Role: 'admin') */}
      <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminOverview />} />
=======
      {/* 🟢 Admin Route (Layout/Sidebar se BAHAR nikal diya hai) */}
      <Route path="/admin" element={<AdminOverview />} />

      {/* 🟢 Main App Layout (Yeh saare sidebar wale pages hain) */}
      <Route element={<Layout />}>
        <Route path="/user" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/my-projects" element={<ProjectList />} />
        <Route path="/saved-projects" element={<SavedProjects />} />
        <Route path="/requests" element={<CollaborationRequests />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
>>>>>>> cf2a52fe1f7ee48551eab88620ea28cf8cd9ecf0
      </Route>

      {/* 🟢 USER ONLY ROUTES (Role: 'user') */}
      <Route element={<ProtectedRoutes allowedRoles={['user']} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/my-projects" element={<ProjectList />} />
          <Route path="/saved-projects" element={<SavedProjects />} />
          <Route path="/requests" element={<CollaborationRequests />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* 🔄 Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}