import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"
const BASE_URL="http://localhost:5001";
export const useAuthStore = create((set , get ) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers : [],
  socket :null,
  connectSocket : ()=>{
    const {authUser } = get()
    if(!authUser || get().socket?.connected) return;
      const socket = io(BASE_URL);
      socket.connect()
      set({socket : socket});
  },
  disconnectSocket:()=>{
      if(get().socket?.connected) get().socket.disconnect();
  },
  // Check Auth
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user, isCheckingAuth: false });
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
      set({ authUser: res.data.user, isSigningUp: false });
      toast.success("Signup successful 🚀");
    } catch (err) {
      console.error("Signup error:", err);
      set({ isSigningUp: false });
      toast.error("Signup failed ❗");
    }
    get().connectSocket();
  },

  // Login
  login: async (loginData , onSuccess) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      set({ authUser: res.data.user, isLoggingIn: false });

      toast.success("Login successful 🎉");

       get().connectSocket();
       if(onSuccess) onSuccess;
    } catch (err) {
      console.error("Login error:", err);
      set({ isLoggingIn: false });
      toast.error("Login failed ❗");
     
    
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
      set({ authUser: res.data.user, isUpdatingProfile: false });
      toast.success("Profile updated ✨");
    } catch (err) {
      console.error("Update profile error:", err);
      set({ isUpdatingProfile: false });
      toast.error("Profile update failed ❗");
    }
  },
}));
