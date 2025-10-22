// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-lg">Connor Electrical</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Signup</Link>}
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user?.email === "admin@connorelectrical.com" && (
            <Link to="/admin">Admin</Link>
          )}
          <Link to="/services">Services</Link>
          <Link to="/bookings">Bookings</Link>
          {user && (
            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
