import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';
export const useChatStore = create((set ,get)=>({
    messages: [],
    users: [],
    
    isMessagesLoading: false,
    isUsersLoading: false,
    selectedUser: null,
    getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const response = await axiosInstance.get('messages/users');
            set({users: response.data.users});
           console.log(response.data.users);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            set({isUsersLoading: false});
        }   
    },
   getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const response = await axiosInstance.get(`messages/${userId}`);
            set({messages: response.data});
        } catch (error) {
            toast.error('Failed to load messages');
        } finally {
            set({isMessagesLoading: false});
        }   
    },
  
    setSelectedUser: (selectedUser) => set({ selectedUser }),
sendMessage: async (messageData ) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData ,  { withCredentials: true });
      console.log(res)
      set({ messages: [...(messages || []), res.data] });

    } catch (error) {
        const msg =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Failed to send message";

  toast.error(msg);
    }
  },  
  subscribeToMessages: () => {
    const {selectedUser} = get();
    
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("newMessage", (message) => {
      const { messages } = get();
      if(message.senderId !== selectedUser._id && message.receiverId !== selectedUser._id) return;  
    
      set({ messages: [...(messages || []), message] });
    });
  },
  unsubscribeFromMessages: (userId) =>     {
    const socket = useAuthStore.getState().socket;
    
    if (!socket) return;
    socket.off("newMessage");

  },

     


}));