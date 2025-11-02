import { useAuth } from "../context/AuthContext";
import { db } from "../api/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const bookingsRef = ref(db, "bookings");
    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setBookings(Object.values(data));
    });
  }, []);

  if (!user) return <p className="text-center mt-12">Please login.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h2>
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-2">All Bookings</h3>
        <ul className="space-y-3">
          {bookings.map((b, i) => (
            <li key={i} className="border-b pb-2">
              <strong>{b.name}</strong> — {b.service} — {b.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
