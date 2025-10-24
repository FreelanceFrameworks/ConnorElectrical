import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const [user] = useAuthState(auth);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">Welcome, {user?.email}</h1>
      <p className="mt-2 text-gray-600">Manage your bookings and view your account info.</p>
    </div>
  );
}
