import React, { useEffect, useRef } from 'react';
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from "../lib/utils.js" 

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
        getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);
  
  if (isMessagesLoading) {
    return (
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

  return (
    <div className='flex flex-col h-full bg-base-100 rounded-lg shadow-xl border border-base-200'> 
      
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4"> 
        
        {!messages?.length && (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-lg text-base-content opacity-70 italic">
                Say hello to {selectedUser.fullName || "your new friend"}! 👋
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isSender = msg.senderId === authUser._id;
          
          const profilePic = isSender 
            ? authUser.profilePic || "/avatar.png" 
            : selectedUser.profilePic || "/avatar.png";

          const messageTime = formatMessageTime(msg.createdAt);
          
          // Helper flags using the confirmed 'msg.image' property
          const hasImage = !!msg.image;
          const hasText = !!msg.text;

          return (
            <div
              key={msg._id}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                  <img
                    alt={`${isSender ? 'You' : selectedUser.fullName}'s avatar`}
                    src={profilePic}
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className={`chat-header text-xs text-base-content opacity-50 ${isSender ? 'text-right' : 'text-left'}`}>
                <time className="ml-1">{messageTime}</time>
              </div>

              {/* 🖼️ CORRECTED CHAT BUBBLE LOGIC */}
              <div 
                className={`chat-bubble ${
                  // CRITICAL: Remove padding and hide overflow if an image is present
                  hasImage ? 'p-0 overflow-hidden' : ''
                } ${
                  isSender 
                    ? "chat-bubble-primary text-primary-content" 
                    : "chat-bubble-info text-info-content"
                }`}
              >
                {/* Check for image first */}
                {hasImage ? (
                  // If image exists, render the image tag
                  <img
                    src={msg.image} // Using msg.image as specified
                    alt={hasText ? msg.text : "sent file"}
                    // Use max-w-64 for consistency and to respect bubble size
                    className="w-full max-w-64 h-auto rounded-xl object-cover" 
                  />
                ) : (
                  // If no image, render text or empty placeholder
                  <span className='p-3'>
                    {msg.text || <i className='opacity-75'>(empty)</i>}
                  </span>
                )}
                
                {/* Render text content separately if both image and text exist 
                   (This handles captions, but keeps the main logic cleaner for image-only) */}
                {hasImage && hasText && (
                   <span className="p-3 block text-xs opacity-80"> 
                       {msg.text}
                   </span>
                )}
              </div>
              {/* 🖼️ END OF CHAT BUBBLE LOGIC */}
            </div>
          );
        })}
        
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer;