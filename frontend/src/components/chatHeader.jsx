import { useState, useEffect, useCallback, useActionState } from "react";
import { userAuthStore } from "../store/useAuthStore";
import { userChatstore } from "../store/userChatstore";
import { X } from 'lucide-react'
import defaultUserImage from "../assets/user.png";
function chatHeader() {
    const { selectedUser, setSelectedUser } = userChatstore();
    const { onlineUsers } = userAuthStore();
    return (
        <>
            <div className="p-2.5 border-b border-base-300  ">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                        <div className="size-10 rounded-full relative">
                    <img src={selectedUser.profilepic|| defaultUserImage} alt={selectedUser.fullName} className="rounded-full"/>
                    </div> 
                   </div>
               
                {/* user information */}
                <div>
                    <h3 className="font-medium text-lg">{selectedUser.fullName}</h3>
                    <p className="text-sm text-base-content/70">{ onlineUsers.includes(selectedUser._id)?'Online':'Offline'}</p>
                    </div>
                    </div>

                    <button onClick={()=>setSelectedUser(null)} className="size-10 hover:bg-base-200 rounded-full"> <X/></button>
                    </div>
      </div>
        </>
    )  
}
export default chatHeader;