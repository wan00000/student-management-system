"use client";
import React from "react";
import Link from "next/link";

function Sidebar() {
  const toggleSide = () => {
    const sideMenu = document.getElementById("sidebar");
    sideMenu?.classList.toggle("hidden");
  };

  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSide}
        className="bg-red-500 text-white p-3 rounded-md shadow-md font-medium hover:bg-red-600 transition duration-300"
      >
        Toggle
      </button>

      {/* Sidebar Content */}
      <div
        id="sidebar"
        className="hidden flex-col bg-gray-800 text-white p-5 rounded-md shadow-md mt-4 w-48"
      >
        <ul className="space-y-4">
          <li className="hover:underline">
            <Link href="/" className="text-lg font-medium">
              Home
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/attendance" className="text-lg font-medium">
              Attendance
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/marks" className="text-lg font-medium">
              Marks
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/library" className="text-lg font-medium">
              Library
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
