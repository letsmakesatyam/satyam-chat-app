import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer.jsx';
import Sidebar from '../components/Sidebar.jsx';

const HomePage = () => {
  const{selectedUser} = useChatStore();
  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
      <div>
        <div>
          <Sidebar/>
          {!selectedUser ? <NoChatSelected /> : <ChatContainer/>}
        </div>
      </div>
    </div>
  )
}

export default HomePage
