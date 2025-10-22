import React from 'react';
import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-6">
        <AppRouter />
      </main>
    </div>
  );
}
