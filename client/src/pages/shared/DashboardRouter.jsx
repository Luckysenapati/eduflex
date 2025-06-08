// This is newly created by lucky

// client/src/pages/shared/DashboardRouter.jsx


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebarstudent from "../student/Sidebarstudent";
import Sidebar from "../admin/Sidebar";
import Dashboardstudent from "../student/Dashboardstudent";
import Dashboard from "../admin/Dashboard";
import { useSelector } from "react-redux";

const DashboardRouter = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  return (
    <Routes>
      {user.role === "student" ? (
        <Route path="/" element={<Sidebarstudent />}>
          <Route index element={<Dashboardstudent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
};

export default DashboardRouter;

