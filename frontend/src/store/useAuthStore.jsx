import { create } from 'zustand'
import { axiosInstanace } from '../lib/axios'
import { toast } from "react-hot-toast"
import{io} from'socket.io-client'
// import { connect } from 'mongoose';
const Base_URL =  import.meta.env.MODE==="development"?"http://localhost:7000":"/";
export const userAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignup: false,
    isLogin: false,
    isUpdatingprof: false,
    onlineUsers: [],
    socket: null,
    
    // we are calling checkAuth when we refresh or render on  our page using useEffect hook in app.jsx
    checkAuth: async () => {
        try {
            const res = await axiosInstanace.get('/auth/check');
            set({ authUser: res.data });
            get().connectSocket()
        } catch (error) {
            console.log('Error in checking authincation', error.response?.data || error.message);
            set({ authUser: null });
         
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    Signup: async (data)=>{
        set({ isSignup: true });
        try {
            const res = await axiosInstanace.post("/auth/signup", data)
            set({ authUser: res.data });
            toast.success("Account Created Successfully🎉")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            set({isSignup:false})
        }
    },
    Login: async (data) => {
 try {
    set({ isLogin: true });
    const res = await axiosInstanace.post("/auth/login", data);
    set({ authUser: res.data });
     toast.success("Login Successfully🎉")
     get().connectSocket()
 } catch (error) {
     toast.error(error.response.data.message);

        }
 finally {
     set({ isLogin: false });
        }
    },
    Logout: async () => {
       try {
        const res = await axiosInstanace.post('/auth/logout');
        set({ authUser: null });
           toast.success("Logout Successfully🎉");
           get().disconnectSocket();
       } catch (error) {
           toast.error(error.response.data.message);
       }
    },
    Profile: async (data) => {
        set({ isUpdatingprof: true });
        try {
            const res = await axiosInstanace.put('/auth/update-profile', data)
      
            set({ authUser: res.data })
            toast.success("Updated Successfully🎉")
        } catch (error) {
            toast.error(error.response.data.message|| "Something went Wrong");
        }
        finally {
            set({isUpdatingprof:false})
        }
    },
    connectSocket: async () => { 
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(Base_URL, {
            query: {
                userId:authUser._id,
            },
        });
        socket.connect();
        set({ socket: socket });
        socket.on("getOnlineUsers",(userIds)=> {
    set({onlineUsers:userIds})
        })
    },
    disconnectSocket: async () => {
        if (get().socket?.connected)
        {
            get().socket.disconnect();
}
    },
}));