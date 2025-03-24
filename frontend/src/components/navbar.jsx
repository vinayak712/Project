import { Settings, User, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom';
import { userAuthStore } from "../store/useAuthStore";
function NavBar() {
    const { Logout, authUser } = userAuthStore();
    function handleLogOut(e) {
        e.preventDefault();
        Logout();
    }
    return (
        <>
            <div className='w-full min-h-full bg-slate-900 '>
                <nav className='relative bg-slate-950 w-full h-[70px]' >
                    <ul className='w-full  h-full flex justify-between items-center absolute'>
                        <Link to="/">
                        <li className='text-3xl text-green-700 gap-2'>ChatME💬</li>
                        </Link>
                        <div className='flex items-center gap-8 ml-auto p-3'>
                            <Link to="/setting">
                            <li className="flex items-center gap-1 text-white"><Settings className='size-5 ' /> <span>Settings</span></li>
                            </Link>
                            
                            {authUser && (
                                <>
                                 <Link to="/profile">
                            <li className="flex items-center gap-1 text-white"><User className='size-5 ' /><span>Profile</span></li>
                            </Link>
                       
                            <button onClick={handleLogOut}>
                            <li className="flex items-center gap-1 text-white"><LogOut  className='size-5 '/><span>Log-Out</span></li>
                     </button>
                                </>
                           )}
                      </div>
                </ul>
                </nav>
   </div>
        </>
    )
}
export default NavBar;