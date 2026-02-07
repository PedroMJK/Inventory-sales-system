import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="bg-white shadow px-4 md:px-6 py-4 flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700 cursor-pointer text-xl"
          aria-label="Open menu"
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Inventory Sales System
        </h1>
      </div>

      {/* User menu */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {initial}
          </div>

          <span className="hidden sm:block text-gray-800 font-medium">
            {user?.name}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
