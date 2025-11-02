import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to login: " + err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
