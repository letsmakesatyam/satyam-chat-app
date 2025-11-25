import React, { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, Eye, EyeOff, Box } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { authUser, isLoggingIn, login } = useAuthStore();

  console.log("LoginPage render - authUser:", authUser);

  useEffect(() => {
    console.log("useEffect triggered - authUser:", authUser);
    if (authUser) {
      console.log("Navigating to home...");
      navigate("/", { replace: true });
    }
  }, [authUser, navigate]);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login...");
    const success = await login(formData);
    console.log("Login result:", success);
    if (success) {
      console.log("Login successful, navigating...");
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      data-theme="synthwave"
      className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4"
    >
      {/* Logo & Title */}
      <div className="flex flex-col items-center mb-8">
        <Box className="w-14 h-14 text-secondary drop-shadow-[0_0_10px_#f000b8]" />
        <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_6px_#f000b8] mt-2">
          ChatBox Login
        </h1>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-base-200 p-8 rounded-xl shadow-xl border border-secondary/30"
      >
        {/* Email Field */}
        <label className="block mb-4">
          <span className="text-white text-sm">Email</span>
          <div className="flex items-center gap-2 bg-base-300 px-4 py-3 rounded-lg mt-1">
            <Mail className="w-5 h-5 text-secondary" />
            <input
              type="email"
              name="email"
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </label>

        {/* Password Field */}
        <label className="block mb-6">
          <span className="text-white text-sm">Password</span>
          <div className="flex items-center gap-2 bg-base-300 px-4 py-3 rounded-lg mt-1">
            <Lock className="w-5 h-5 text-secondary" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {showPassword ? (
              <EyeOff
                className="w-5 h-5 text-secondary cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="w-5 h-5 text-secondary cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </label>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-secondary text-white py-3 rounded-lg font-semibold 
          hover:bg-secondary-focus transition-all duration-200 drop-shadow-[0_0_6px_#f000b8]
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-secondary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;