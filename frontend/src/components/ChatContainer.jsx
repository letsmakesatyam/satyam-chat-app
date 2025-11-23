import React, { useEffect, useRef } from 'react'; // Added useRef
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
import { useAuthStore } from '../store/useAuthStore';
import {formatMessageTime} from "../lib/utils.js"

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  
  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef(null); // Changed to useRef hook

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
        getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);
  
  // 🐛 Loading state must return JSX
  if (isMessagesLoading) {
    return (
      // 🧱 Base container for proper layout during loading
      <div className='flex flex-col h-full bg-base-100 rounded-lg border border-base-200'>
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <MessageSkeleton />
            <MessageSkeleton isSender={false} />
            <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  // Primary component structure
  return (
    // 🧱 Container Layout: bg-base-100 and shadow adapt to the theme
    <div className='flex flex-col h-full bg-base-100 rounded-lg shadow-xl border border-base-200'> 
      
      <ChatHeader />
      
      {/* 📜 Message Area: Use flex-1 for growth and overflow-y-auto for scrolling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4"> 
        
        {/* 💡 Empty State Message */}
        {!messages?.length && (
          // text-base-content adapts its color for dark/light themes
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-lg text-base-content opacity-70 italic">
                Say hello to {selectedUser.fullName || "your new friend"}! 👋
            </p>
          </div>
        )}

        {/* 💬 Mapping through Messages */}
        {messages.map((msg) => {
          const isSender = msg.senderId === authUser._id;
          
          const profilePic = isSender 
            ? authUser.profilePic || "/avatar.png" 
            : selectedUser.profilePic || "/avatar.png";

          const messageTime = formatMessageTime(msg.createdAt);

          return (
            // 🎯 DAISYUI Chat component class
            <div
              key={msg._id}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                  {/* 🖼️ Avatar Image */}
                  <img
                    alt={`${isSender ? 'You' : selectedUser.fullName}'s avatar`}
                    src={profilePic}
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* 🕒 Time and Name: text-base-content opacity-50 ensures it's readable but muted */}
              <div className={`chat-header text-xs text-base-content opacity-50 ${isSender ? 'text-right' : 'text-left'}`}>
                <time className="ml-1">{messageTime}</time>
              </div>

              {/* 🧼 Chat Bubble Style (Semantic Colors) */}
              <div 
                className={`chat-bubble ${
                  isSender 
                    // Use primary and its content color for sender
                    ? "chat-bubble-primary text-primary-content" 
                    // Use info (or another contrasting color like secondary/accent) for receiver
                    // NOTE: chat-bubble-info is generally a good contrasting color across themes
                    : "chat-bubble-info text-info-content"
                }`}
              >
                {msg.text || <i className='opacity-75'>(image or empty)</i>}
              </div>
            </div>
          );
        })}
        
        {/* ⚓ Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* ⌨️ Message Input */}
      <MessageInput />
    </div>
  )
}

export default ChatContainer;