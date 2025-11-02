import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <header className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Connor’s Electrical</h1>
      <button
        onClick={toggleTheme}
        className="btn bg-accent text-white rounded-lg px-4 py-2"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}
