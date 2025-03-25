import { useState, useEffect } from "react";
import { userChatstore } from "../store/userChatstore";
import { Users } from 'lucide-react'
import defaultUserImage from "../assets/user.png";
import { userAuthStore } from "../store/useAuthStore";
function Sidebar() {
    const { selectedUser, isUserLoading, getUsers, users, setSelectedUser } = userChatstore();
    const { onlineUsers } = userAuthStore();
    useEffect(() => {
        getUsers();
        console.log("Fetched Users:", users); 
    },[getUsers])
    return (
        <>
            <aside className="h-screen w-30 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
                
                <div className="w-full border-b border-base-300 p-5">
                    <div className="items-center flex  gap-2">
                        <Users className="size-6" />
                        <p>Contacts</p>
                    </div>
              
                    <div>
      {/* have to do to toogle online user only */}
                    </div>
                   
                </div>
                <div className="overflow-y-auto w-full py-3">
                        {users.map((user)=>(
                        
                            < button
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id===user._id?'bg-base-300 ring-1 ring-base-300':''} `}
                            
                            >
                                <div className="relative">
                                    <img src={user.profilepic || defaultUserImage} alt={user.name} className="size-12 object-cover rounded-full" />
                                    {onlineUsers.includes(user._id) && (
                                        <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-700"/>
                                    )}
                                </div>
                                <div className="hidden lg:block text-left min-w-0">
                                    <p className="font-medium truncate">{user.fullName}</p>
                                    <div className="text-sm text-zinc-700">
                                        {onlineUsers.includes(user._id)?'Online':"Offline"}
                                    </div>
                </div>
</button>
                        
                        ))}
                      {/* user details only visible in full screen */}
                
                </div>
              
        </aside>
        </>
    )
}
export default Sidebar;