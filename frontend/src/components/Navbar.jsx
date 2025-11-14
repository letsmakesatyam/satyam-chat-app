import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// Icons (lucide-react)
import { Box, Settings, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="w-full bg-base-200 text-secondary flex justify-between items-center px-6 py-3 shadow-lg">
      
      {/* Left - Logo */}
      <Link to="/" className="flex items-center gap-2">
        <Box className="w-8 h-8 text-secondary drop-shadow-[0_0_6px_#f000b8]" />
        <h1 className="text-2xl font-bold tracking-wide text-secondary-content drop-shadow-[0_0_4px_#f000b8]">
          ChatBox
        </h1>
      </Link>

      {/* Right - Nav Icons */}
      <div className="flex items-center gap-6">

        {/* Settings */}
        <Link
          to="/settings"
          className="hover:text-secondary-content transition duration-200"
        >
          <Settings className="w-6 h-6" />
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="hover:text-secondary-content transition duration-200"
        >
          <User className="w-6 h-6" />
        </Link>

        {/* Logout (only if user logged in) */}
        {authUser && (
          <button
            onClick={logout}
            className="hover:text-secondary-content transition duration-200"
          >
            <LogOut className="w-6 h-6" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
