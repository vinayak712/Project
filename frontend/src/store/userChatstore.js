import { create } from 'zustand'
import { axiosInstanace } from '../lib/axios'
import {toast} from "react-hot-toast"
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
        set({ isMessageLoading: false })
        try {
            const res = await axiosInstanace.get(`/message/${userId}`)
            set({ message: res.data })
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
            const res = axiosInstanace.post(`/message/send/${selectedUser._id}`, Mdata)
            set({ messages: [...messages, res.Mdata] });
        } catch (error) {
            toast.error(error.res.data.message);
        }
    
    },
    //have to implemented yet
    setSelectedUser: (selectedUser)=>set({selectedUser}),
}))