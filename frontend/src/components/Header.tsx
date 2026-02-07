import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const userInitials = user?.name
        ?.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

  return (
    <header className="bg-white shadow px-4 md:px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-4">
        <button
            onClick={onMenuClick}
            className="md:hidden text-gray-700 text-xl cursor-pointer"
            aria-label="Open menu"
        >
            ☰
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
            Inventory Sales System
        </h1>
      </div>


      {user && (
        <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {userInitials}
            </div>

            <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-medium text-gray-800">
                    {user.name}
                </span>

                <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition cursor-pointer"
                >
                    Logout
                </button>
            </div>

            {/* Mobile logout */}
            <button
                onClick={handleLogout}
                className="sm:hidden text-sm text-red-600 font-medium"
            >
                Logout
            </button>
        </div>   
      )}
    </header>
  );
}