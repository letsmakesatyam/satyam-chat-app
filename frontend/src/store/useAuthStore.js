import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth : async()=>{
        try{
            set({isCheckingAuth:true});
            const response = await axiosInstance.get("/auth/check");
            set({authUser:response.data, isCheckingAuth:false});


        }
        catch(err){
            console.log("Error in checking authentication in frontend ");
            set({authUser:null, isCheckingAuth:false});



        }
    }
}));