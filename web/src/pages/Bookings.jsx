import { ref, push, onValue } from "firebase/database";
import { db, rtdb } from "../api/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const bookingsRef = ref(db, "bookings");
    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setBookings(Object.values(data));
    });
  }, []);

  useEffect(() => {
    const testRef = ref(rtdb, "/testConnection");
    onValue(testRef, (snapshot) => {
      console.log("✅ Firebase connected:", snapshot.exists());
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first");
    const booking = {
      user: user.email,
      service,
      date,
      createdAt: new Date().toISOString(),
    };
    await push(ref(db, "bookings"), booking);
    setService("");
    setDate("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Book a Service</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Service"
          className="border p-3 rounded-lg flex-grow"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <input
          type="date"
          className="border p-3 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Book
        </button>
      </form>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Your Bookings</h3>
        <ul className="space-y-2">
          {bookings
            .filter((b) => b.user === user?.email)
            .map((b, i) => (
              <li key={i} className="border-b pb-2">
                {b.service} — {b.date}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
