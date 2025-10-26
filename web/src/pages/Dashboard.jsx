import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email}</h1>
      <p className="text-gray-600 mb-6">Manage your bookings, services, and profile below.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/services"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          View Services
        </Link>
        <Link
          to="/bookings"
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Manage Bookings
        </Link>
      </div>
      <button
        onClick={logout}
        className="mt-8 text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </div>
  );
}
