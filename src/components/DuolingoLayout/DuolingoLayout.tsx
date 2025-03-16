"use client";

import { useState } from "react";

export default function DuolingoLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-green-100">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } fixed left-0 top-0 h-screen bg-white shadow-md flex flex-col items-center py-6 transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-green-600 mb-6"
        >
          {isOpen ? "⬅️" : "➡️"}
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 w-full">
          <SidebarItem icon="🏠" label="Home" isOpen={isOpen} active />
          <SidebarItem icon="🔥" label="Streak" isOpen={isOpen} />
          <SidebarItem icon="🎯" label="Goals" isOpen={isOpen} />
          <SidebarItem icon="🏆" label="Leaderboard" isOpen={isOpen} />
          <SidebarItem icon="⚙️" label="Settings" isOpen={isOpen} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ml-${isOpen ? "64" : "20"} transition-all`}>
        {/* Navbar */}
        <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
          <h1 className="text-green-600 text-2xl font-bold">Duolingo Clone</h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </nav>

        {/* Content */}
        <main className="pt-16 flex flex-col items-center justify-center h-screen">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">Continue Learning</h2>
            <p className="text-gray-600">Your streak: 🔥 15 days</p>
            <button className="mt-4 bg-green-500 text-white py-2 px-6 rounded-xl hover:bg-green-600">
              Start Lesson
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen, active }: { icon: string; label: string; isOpen: boolean; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
        active ? "bg-green-100 text-green-600 font-semibold" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span>{label}</span>}
    </a>
  );
}