"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings } from "lucide-react";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
}

export default function Sidebar({ userName = "User R.", userEmail = "test-mail@email.com" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200 fixed lg:static z-40">
      <div className="p-4 lg:p-6">
        <div className="flex items-center gap-3 mb-6 lg:mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-gray-700 font-semibold text-lg hidden sm:block">TESTAPP</span>
        </div>

        <nav className="space-y-2">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/"
                ? "bg-green-50 text-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/" ? "text-green-600" : "text-gray-500"}`}
            />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/settings"
                ? "bg-green-50 text-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/settings" ? "text-green-600" : "text-gray-500"}`}
            />
            <span className="font-medium">Setting</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 lg:p-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="text-sm font-medium text-gray-700 truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
