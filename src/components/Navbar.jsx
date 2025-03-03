import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-gray-900 text-white shadow-md">
      <nav className="max-w-5xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <NavLink to="/" className="hover:text-blue-500 transition">
            PasteBin
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-blue-400 transition ${
                isActive ? "text-blue-500 underline" : "text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/paste"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-blue-400 transition ${
                isActive ? "text-blue-500 underline" : "text-white"
              }`
            }
          >
            Paste
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
