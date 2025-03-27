import { StrictMode, useEffect } from "react"
import { createRoot } from 'react-dom/client'
import {Routes,Route, Navigate} from 'react-router-dom'
import NavBar from "./components/navbar"
import { userAuthStore } from './store/useAuthStore'
import{useThemeStore} from './store/useThemeStore'
import Home from "./pages/home"
import LoginPage from "./pages/login"
import Setting from "./pages/seeting" 
import Signup from "./pages/signup"
import Profile from "./pages/profile"
import {Loader} from'lucide-react'
import { Toaster} from'react-hot-toast'

function App() {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = userAuthStore();
  console.log( onlineUsers);
  
  useEffect(() => {
    checkAuth();
  },[checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
</div>
)
  }
  return (
    < div data-theme={theme}>
<NavBar/>
      <Routes>
        <Route path="/" element={authUser?<Home />:<Navigate to="/login"/>} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/"/>} />
        <Route path="/signup" element={!authUser?<Signup />:<Navigate to='/'/>} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={authUser?<Profile />:<Navigate to="/"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
