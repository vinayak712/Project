import { useState,useEffect } from "react";
import { userChatstore } from "../store/userChatstore";
import MessageInput from "./MessageInput";
import { userAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import defaultUserImage from "../assets/user.png";
import ChatHeader from "./chatHeader";
import { Loader } from "lucide-react";
function ChatContainer() {
    const { messages, selectedUser, isMessageLoading, getMessages } = userChatstore();
    const { authUser } = userAuthStore();
    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
        }
    }, [selectedUser?._id, getMessages]);

    if (isMessageLoading) {
        return (
            <>
             <Loader className="size-5 animate-spin inline-block mr-2" />
             Loading...
            </>
        )
    }
    return (
        <>
            <div className="flex-1 flex flex-col overflow-auto">
                < ChatHeader />
         
                <div className="flex flex-1 overflow-y-auto space-y-4 p-4">

                    {messages.map((message) => (
                        <div key={message._id}
                            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
                            
                        >
                            <div className="size-10 rounded-full border">
<img src={message.senderId===authUser._id?authUser.profilepic:selectedUser.profilepic || defaultUserImage } alt="profilepic" />
                            </div>
                            <div>
                                <time className="text-sm opacity-50 ml-1">
                                    {formatMessageTime(message.createdAt)}
                                </time>
                            </div>
                            
                            <div>
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                )}
                                     {message.text && <p>{message.text}</p>}
                            </div>
            </div>
        ))}

                </div>



                <MessageInput/>
 </div>
        </>
    )
}
export default ChatContainer;