import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { logout } from "../../../backend/src/controllers/auth.controller";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // 🔹 Check authentication
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data, isCheckingAuth: false });
      toast.success("Authentication verified ✅");
    } catch (err) {
      console.error("Error in checking authentication in frontend", err);
      set({ authUser: null, isCheckingAuth: false });
      toast.error("Authentication failed ❌");
    }
  },

  // 🔹 Signup function
  signup: async (signupData) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: response.data, isSigningUp: false });
      toast.success("Signup successful 🚀 Welcome aboard!");
    } catch (err) {
      console.error("Error in signup", err);
      set({ isSigningUp: false });
      toast.error("Signup failed ❗ Please try again.");
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully 👋");
    } catch (err) {
      console.error("Error in logout", err);
      toast.error("Logout failed ❗ Please try again.");
    }
    },
}));
