import { create } from 'zustand'
import { axiosInstanace } from '../lib/axios'
import {toast} from "react-hot-toast"
export const userAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignup: false,
    isLogin: false,
    isUpdatingprof: false,
    checkAuth: async () => {
        try {
            const res = await axiosInstanace.get('/auth/check');
            set({ authUser: res.data });

        } catch (error) {
            console.log('Error in checking authincation');
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
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            set({isSignup:false})
        }
    }
}));