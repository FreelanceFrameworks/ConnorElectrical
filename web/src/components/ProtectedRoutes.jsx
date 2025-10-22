// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  // Example role logic — assuming admin email check for now
  if (adminOnly && user.email !== "admin@connorelectrical.com")
    return <Navigate to="/dashboard" replace />;

  return children;
}
