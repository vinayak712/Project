import { useState, useEffect } from "react";
import { userChatstore } from "../store/userChatstore";
import { Users } from 'lucide-react'
import defaultUserImage from "../assets/user.png";
import { userAuthStore } from "../store/useAuthStore";
function Sidebar() {
    const { selectedUser, isUserLoading, getUsers, users, setSelectedUser } = userChatstore();
    const { onlineUsers } = userAuthStore();

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    useEffect(() => {
        getUsers();
        console.log("Fetched Users:", users); 
    }, [getUsers])
    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;
    const onlineUsersCount = onlineUsers?.length ?? 0;
    return (
        <>
            <aside className="h-full w-30 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 ">
                
                <div className="w-full border-b border-base-300 p-5.5">
                    <div className=" flex items-center   gap-2">
                        <Users className="size-6" />
                        <p className="font-medium hidden lg:block">Contacts</p>
                    </div>

                              {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({Math.max(0, onlineUsersCount - 1)} online)</span>
        </div>
      </div>
             
                
                
                <div className="overflow-y-auto w-full  py-3">
                        {filteredUsers.map((user)=>(
                        
                            < button
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id===user._id?'bg-base-300 ring-1 ring-base-300':''} `}
                            
                            >
                                <div className="relative mx-auto lg:mx-0">
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