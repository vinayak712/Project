import { useState,useEffect, useRef } from "react";
import { userChatstore } from "../store/userChatstore";
import MessageInput from "./MessageInput";
import { userAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import defaultUserImage from "../assets/user.png";
import ChatHeader from "./chatHeader";
import { Loader } from "lucide-react";
function ChatContainer() {
    const { messages, selectedUser, isMessageLoading, getMessages,unscribeFromMessages, subscribeToMessages } = userChatstore();
    const { authUser } = userAuthStore();
    const messageEndRef = useRef(null);
    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
            subscribeToMessages();
        }
        return () => unscribeFromMessages();
    }, [selectedUser?._id, getMessages,    unscribeFromMessages, subscribeToMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });

        }
    },[messages])
    if (isMessageLoading) {
        return (
            <>
                <div className="flex  justify-center items-center h-full">
                <Loader className="size-5 animate-spin inline-block mr-2" />
                Loading...
            </div>
            </>
        )
    }
    return (
        <>
            <div className="flex-1 flex flex-col overflow-hidden">
                < ChatHeader />
         
                <div className="flex flex-col overflow-y-auto space-y-4 p-4 h-full">

                    {messages.map((message) => (
                        <div key={message._id}
                            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
                        >
                            <div className="chat-image avatar flex ">
                            <div className="size-10 rounded-full border">
                                    <img
                                        src={
                                            message.senderId === authUser._id ? authUser.profilepic : selectedUser.profilepic || defaultUserImage} alt="profilepic" />
                            </div>
                 </div>
                            <div className="chat-header mb-1 ">
                                <time className="text-sm opacity-50 ml-1">
                                    {formatMessageTime(message.createdAt)}
                                </time>
                            </div>
                            
                            <div className="chat-bubble flex flex-col  ">
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="sm:max-w-[200px] rounded-md mb-2 flex flex-col"
                                    />
                                )}
                                {/* className="bg-primary text-primary-content chat-bubble" can apply this */}
                                {message.text && <p >{message.text}</p>}  
                            </div>
            </div>
        ))}

                <div ref={messageEndRef} />
                </div>


                <MessageInput/>
 </div>
        </>
    )
}
export default ChatContainer;