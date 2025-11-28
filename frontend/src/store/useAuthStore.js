import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001" 
  : "https://chatbox-satyam-e4th.onrender.com"; // Your actual backend URL
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL , {
      query:{
        userId: authUser._id,
      }
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    })
    
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  // Check Auth
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/check");
      const user = res.data.user || res.data;
      set({ authUser: user, isCheckingAuth: false });
      get().connectSocket();
    } catch (err) {
      console.error("Auth check error:", err);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  // Signup
  signup: async (signupData) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      const user = res.data.user || res.data;
      set({ authUser: user, isSigningUp: false });
      toast.success("Signup successful 🚀");
      get().connectSocket();
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      set({ isSigningUp: false });
      toast.error("Signup failed ❗");
      return false;
    }
  },

  // Login
  login: async (loginData) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      
      // Handle both res.data.user and res.data response structures
      const user = res.data.user || res.data;
      
      set({ authUser: user, isLoggingIn: false });
      toast.success("Login successful 🎉");
      get().connectSocket();
      return true;
    } catch (err) {
      console.error("Login error:", err);
      set({ isLoggingIn: false });
      toast.error("Login failed ❗");
      return false;
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out 👋");
      get().disconnectSocket();
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed ❗");
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", profileData);
      const user = res.data.user || res.data;
      set({ authUser: user, isUpdatingProfile: false });
      toast.success("Profile updated ✨");
    } catch (err) {
      console.error("Update profile error:", err);
      set({ isUpdatingProfile: false });
      toast.error("Profile update failed ❗");
    }
  },
}));