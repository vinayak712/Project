import { useState,useEffect } from "react";
import { userChatstore } from "../store/userChatstore";
import MessageInput from "./MessageInput";
import ChatHeader from "./chatHeader";
import { Loader } from "lucide-react";
function ChatContainer() {
    const { messages, selectedUser, isMessageLoading, getMessages } = userChatstore();
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
                <p>messages..</p>
                <MessageInput/>
 </div>
        </>
    )
}
export default ChatContainer;