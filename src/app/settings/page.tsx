"use client";

import Sidebar from "@/components/Sidebar";
import { format } from "date-fns";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function Settings() {
  const [name, setName] = useState("User Random");
  const [password, setPassword] = useState("");
  const currentDate = format(new Date(), "EEEE, d MMMM yyyy");

  const handleSave = () => {
    if (password && (password.length < 4 || password.length > 12)) {
      alert("Password must be between 4 and 12 characters");
      return;
    }
    alert("Settings saved successfully!");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:flex-row lg:ml-0">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-green-600 font-medium text-sm sm:text-base">{currentDate}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 max-w-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Your password is between 4 and 12 characters
                </p>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">My Profile</h2>
            <p className="text-green-600 font-medium text-sm sm:text-base">75% completed your profile</p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
              <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="none"
                  className="sm:hidden"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#10b981"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 42 * 0.75} ${2 * Math.PI * 42}`}
                  strokeLinecap="round"
                  className="sm:hidden"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                  className="hidden sm:block"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56 * 0.75} ${2 * Math.PI * 56}`}
                  strokeLinecap="round"
                  className="hidden sm:block"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-18 h-18 sm:w-24 sm:h-24 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">User R.</h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center">Developer at White Digital</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
