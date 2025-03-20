import { create } from 'zustand'
export const userAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
}));