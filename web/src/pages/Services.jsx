import { ref, onValue } from "firebase/database";
import { db } from "../api/firebase";
import { useState, useEffect } from "react";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const servicesRef = ref(db, "services");
    onValue(servicesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setServices(Object.values(data));
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Services</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
            <p className="text-gray-600 mb-2">{s.description}</p>
            <p className="text-blue-600 font-semibold">${s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
