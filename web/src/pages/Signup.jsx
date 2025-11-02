import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase"
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8 mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
