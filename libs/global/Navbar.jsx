"use client";
import React from "react";
import AccountBanner from "./AccountBanner";

function Navbar() {
  return (
    <div className="w-full fixed top-0 z-50 flex justify-center bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
      <nav className="w-11/12 flex items-center justify-between p-4 rounded-lg">
        {/* Logo/Title */}
        <div className="flex items-center text-white">
          <span className="text-2xl font-bold tracking-wide font-raleway">
            Student Management System
          </span>
        </div>

        {/* Account Banner */}
        <div className="flex items-center">
          <AccountBanner />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
