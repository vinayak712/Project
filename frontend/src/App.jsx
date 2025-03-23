import { StrictMode, useEffect } from "react"
import { createRoot } from 'react-dom/client'
import {Routes,Route, Navigate} from 'react-router-dom'
import NavBar from "./components/navbar"
import {userAuthStore,userThemeStore} from'./store/useAuthStore'
import Home from "./pages/home"
import LoginPage from "./pages/login"
import Setting from "./pages/seeting" 
import Signup from "./pages/signup"
import Profile from "./pages/profile"
import {Loader} from'lucide-react'
import { Toaster} from'react-hot-toast'
// import SignupPage from "./pages/signup"
function App() {
  const { theme } = userThemeStore();
  const { authUser, checkAuth,  isCheckingAuth } = userAuthStore();
  useEffect(() => {
    checkAuth();
  },[checkAuth])
  console.log( authUser);
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
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
