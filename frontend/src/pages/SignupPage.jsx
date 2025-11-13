import React from "react";
// Path confirmation: This now correctly resolves to src/store/useAuthStore.js
import { useAuthStore } from "../store/useAuthStore.js"; 
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Rocket,
  Stars,
  MessageSquare, // Used for Chat context
  Send, // Used for Chat context
} from "lucide-react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div
      data-theme="synthwave"
      className="min-h-screen flex items-center justify-center bg-base-300 relative overflow-hidden p-4"
    >
      {/* Floating Icons for ambiance */}
      <Sparkles className="absolute top-12 left-16 text-secondary opacity-80 animate-bounce" size={32} />
      <Stars className="absolute bottom-16 right-20 text-accent opacity-70 animate-pulse" size={40} />
      <Rocket className="absolute top-1/2 left-10 text-primary opacity-60 animate-spin-slow" size={48} />

      {/* --- Main Content Area (Two Columns) --- */}
      <div className="flex w-full max-w-6xl z-10 p-8 rounded-xl shadow-2xl bg-base-200/90 backdrop-blur-sm border border-secondary/10">
        
        {/* ======================================= */}
        {/* --- Left Column: Signup Form (Wider on mobile, 50% on desktop) --- */}
        {/* ======================================= */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="card w-full max-w-sm bg-transparent">
            <div className="card-body p-0">
              <h2 className="text-3xl font-bold text-center text-secondary mb-6 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6" />
                Create Account
                <Sparkles className="w-6 h-6" />
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Fullname Field: Input Text set to WHITE */}
                <label className="input input-bordered flex items-center gap-2 bg-base-100/70 border-secondary/30">
                  <User className="text-secondary" size={20} />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    // Crucial: Use text-white
                    className="grow bg-transparent text-white placeholder-secondary/80" 
                    required
                  />
                </label>

                {/* Email Field: Input Text set to WHITE */}
                <label className="input input-bordered flex items-center gap-2 bg-base-100/70 border-secondary/30">
                  <Mail className="text-secondary" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    // Crucial: Use text-white
                    className="grow bg-transparent text-white placeholder-secondary/80"
                    required
                  />
                </label>

                {/* Password Field: Input Text set to WHITE */}
                <label className="input input-bordered flex items-center gap-2 bg-base-100/70 border-secondary/30">
                  <Lock className="text-secondary" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    // Crucial: Use text-white
                    className="grow bg-transparent text-white placeholder-secondary/80"
                    required
                  />
                  {showPassword ? (
                    <EyeOff
                      className="cursor-pointer text-secondary hover:text-accent transition-colors"
                      onClick={() => setShowPassword(false)}
                      size={20}
                    />
                  ) : (
                    <Eye
                      className="cursor-pointer text-secondary hover:text-accent transition-colors"
                      onClick={() => setShowPassword(true)}
                      size={20}
                    />
                  )}
                </label>

                {/* Signup Button */}
                <button
                  type="submit"
                  className="btn btn-secondary w-full mt-4 text-base font-semibold tracking-wider flex items-center justify-center gap-2 hover:brightness-125 transition-all"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Launch Chatting
                    </>
                  )}
                </button>
              </form>

              {/* Already have an account - Visibility Fix: Using text-accent */}
              <div className="text-center mt-6">
                <p className="text-accent text-sm font-semibold">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:text-secondary font-bold underline-offset-4 hover:underline transition-all duration-300"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================= */}
        {/* --- Right Column: Animated Boxes & Text (Hidden on mobile) --- */}
        {/* ======================================= */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center relative p-8 border-l border-secondary/10">
          
          <h3 className="text-2xl font-bold text-primary mb-6 text-center tracking-wider flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent" />
            Join the Neon Network
          </h3>
          
          {/* Fix applied: text-accent for maximum readability */}
          <p className="text-accent text-center mb-8 max-w-sm font-semibold"> 
            Unlock real-time chat, secure messaging, and a dazzling Synthwave experience!
          </p>

          <div className="grid grid-cols-3 gap-6 w-full max-w-xs opacity-80">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-16 h-16 border-2 border-accent/70 rounded-lg animate-pulse shadow-[0_0_10px_#f000b8] transition-all duration-500 bg-secondary/20`}
                style={{
                  animationDelay: `${(i % 3) * 0.2 + Math.floor(i / 3) * 0.15}s`,
                  animationDuration: "3s",
                }}
              ></div>
            ))}
          </div>

          <p className="text-sm text-secondary mt-8 flex items-center gap-1">
             <Send className="w-4 h-4" /> Start messaging in seconds!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;