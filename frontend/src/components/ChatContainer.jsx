import React, { useEffect } from 'react'
import {useChatStore} from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import {MessageSkeleton} from "./skeletons/MessageSkeleton"
const ChatContainer = () => {
  const {messages , getMessages , isMessagesLoading , selectedUser} = useChatStore();
  useEffect(()=>{
    getMessages(selectedUser._id)
  }, [selectedUser._id , getMessages]);
  if(isMessagesLoading){
    <div>
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/>

    </div>
  }
  return (
    <div>
      <ChatHeader/>
      <p>Loadding......</p>
      <MessageInput/>     
    </div>
  )
}

export default ChatContainer
