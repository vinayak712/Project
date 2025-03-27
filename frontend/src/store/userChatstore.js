import { create } from 'zustand'
import { axiosInstanace } from '../lib/axios'
import { toast } from "react-hot-toast"
import { userAuthStore } from './useAuthStore'
export const userChatstore = create((set,get) =>( {
    messages: [],
    users: [],
        selectedUser:null,
    isUserLoading: false,
    isMessageLoading: false,
          getUsers: async () => {
              set({ isUserLoading: true })
              try {
                  const res = await axiosInstanace.get('/message/users');
                  set({ users: res.data });
              } catch (error) {
                toast.error(error.res.data.message)
              }
              finally {
                  set({ isUserLoading: false });
              }
    },
    getMessages: async (userId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstanace.get(`/message/${userId}`)
            set({ messages: res.data })
        }
        catch (error) {
            toast.error(error.res.data.message);
        }
        finally {
            set({ isMessageLoading: false })
        }
    },
    SendMessages: async (Mdata) => {
        const { selectedUser, messages } = get();
        try {
            const res =  await axiosInstanace.post(`/message/send/${selectedUser._id}`, Mdata)
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.res.data.message);
        }
    
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket=userAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            set({messages:[...get().messages,newMessage],})
        })
    },
    unscribeFromMessages: () => {
        const socket = userAuthStore.getState().socket;
        socket.off("newMessage");
    },
    //have to implemented yet
    setSelectedUser: (selectedUser)=>set({selectedUser}),
}))