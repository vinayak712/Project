import { StrictMode } from "react"
import { createRoot } from 'react-dom/client'
import {Routes,Route} from 'react-router-dom'
import NavBar from "./components/navbar"
import Home from "./pages/home"
import Login from "./pages/login"
import Setting from "./pages/seeting" 
import Signup from "./pages/signup"
import Profile from "./pages/profile"

function App() {

  return (
    <>
<NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
</Routes>
    </>
  )
}

export default App
