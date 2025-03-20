import { useState } from "react";
import { User ,Mail } from 'lucide-react';
import { userAuthStore } from "../store/useAuthStore";
function Signup() {
    const [showpassword, setShowpassword] = useState(false);
    const [formData, setFormdata] = useState(
        {
            fullName: '',
            password: '',
            email: '',
        }
        
    )
    const { Signup, isSignup } = userAuthStore();
    const validateForm = () => { }
    const handleSubmit = (e) => {
        e.preventDefault();    
    }
    return (
        <>
            <div className="h-screen w-screen bg-slate-900 flex justify-center items-center">
          
                <div className=" px-10  flex flex-col   h-[700px] w-[500px] bg-slate-700 border-2 rounded-2xl ">
                    <h1 className=" text-center  text-white mb-5 mt-5 font-bold text-5xl">Sign Up</h1>
                    
                    <div>
                        <form onSubmit={handleSubmit} className="flex  gap-4 w-full flex-col">
                            <label className="text-white text-3xl flex items-center gap-2">Name <User className="size-7"></User></label>
                            {/* */}
                            <input type="text"
                            className=" input input-bordered p-2  bg-slate-950 text-white w-full rounded-2xl "    placeholder="Abcd..."
                                value={formData.fullName} onChange={(e) => setFormdata({ ...formData, fullName: e.target.value })} />
                            <label className="text-white text-3xl flex items-center gap-2">Email <Mail /></label>
                            <input type="text" placeholder="...@gmail.com " value={formData.email} className="input inputborder text-white p-2 bg-slate-950 w-full rounded-2xl"
                                onChange={(e) => setFormdata({ ...formData, email: e.target.value })} />
                            
                            <label className="text-white text-3xl flex items-center gap-2">Password</label>
                            <input type="password" placeholder="*%&&###" value={formData.password} className="input inputborder text-white p-2 bg-slate-950 w-full rounded-2xl"
                                onChange={(e) => setFormdata({ ...formData, password: e.target.value })} />
                         
                        </form>
                        <div className="flex items-center justify-center w-full p-18 ">
                        <button className="text-white font-bold text-4xl bg-green-600 border rounded-4xl w-full ">Submit</button>
                        </div>
                    </div>
              </div>
  
       </div>
        </>
    );
}
export default Signup;