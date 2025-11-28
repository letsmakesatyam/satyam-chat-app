import React, { useEffect, useRef } from 'react';
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from "../lib/utils.js" 

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser , subscribeToMessages , unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if(messagesEndRef.current && messages.length > 0 ){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
        getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);
  
  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col h-full bg-base-100 lg:rounded-lg lg:border border-base-200 overflow-hidden'>
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
    // FIX: Added 'flex-1' to fill space, removed fixed margins, 
    // and made borders/rounding desktop-only (lg:) for better mobile fit
    <div className='flex-1 flex flex-col h-full bg-base-100 lg:rounded-lg lg:shadow-xl lg:border border-base-200 overflow-hidden'> 
      
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4"> 
        
        {!messages?.length && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-4">
               {/* Added fallback for users with no image */}
               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <span className="text-2xl">👋</span>
               </div>
               <p className="text-lg text-base-content opacity-70 italic">
                  Say hello to <span className="font-bold text-primary">{selectedUser.fullName || "your new friend"}</span>!
               </p>
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const isSender = msg.senderId === authUser._id;
          
          const profilePic = isSender 
            ? authUser.profilePic || "/avatar.png" 
            : selectedUser.profilePic || "/avatar.png";

          const messageTime = formatMessageTime(msg.createdAt);
          
          const hasImage = !!msg.image;
          const hasText = !!msg.text;

          return (
            <div
              key={msg._id}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className='chat-image avatar'>
                <div className='w-10 rounded-full border border-base-300'>
                  <img
                    alt="avatar"
                    src={profilePic}
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className={`chat-header text-xs text-base-content opacity-50 mb-1 ${isSender ? 'text-right' : 'text-left'}`}>
                <time className="ml-1">{messageTime}</time>
              </div>

              <div 
                className={`chat-bubble flex flex-col ${
                  hasImage ? 'p-0 overflow-hidden' : ''
                } ${
                  isSender 
                    ? "chat-bubble-primary text-primary-content" 
                    : "chat-bubble-info text-info-content" // Changed to info/secondary for better contrast
                }`}
              >
                {hasImage && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="w-full max-w-sm h-auto rounded-none sm:rounded-xl object-cover" 
                  />
                )}
                
                {hasText && (
                  <span className={`${hasImage ? 'p-3 pt-2 text-sm' : 'p-3'}`}>
                    {msg.text}
                  </span>
                )}
              </div>
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