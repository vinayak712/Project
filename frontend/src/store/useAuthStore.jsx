import { create } from 'zustand'
import {axiosInstanace} from'../lib/axios'
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
    signup: async (data)=>{
        
    }
}));