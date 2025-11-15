import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer.jsx';
import Sidebar from '../components/Sidebar.jsx';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      {/* Flex container to align sidebar + chat horizontally */}
      <div className="flex gap-4 h-full">
        
        {/* Sidebar stays fixed width */}
        <div className="w-1/4 min-w-[220px]">
          <Sidebar />
        </div>

        {/* Chat section takes remaining space */}
        <div className="flex-1">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
