import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { userAuthStore } from "../store/useAuthStore";
import {Link} from'react-router-dom'

function Signup() {
  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormdata] = useState({
    fullName: "",
    password: "",
    email: "",
  });

  const { Signup, isSignup } = userAuthStore();

  const validateForm = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen w-screen bg-slate-900 flex justify-center items-center">
      <div className="px-10 py-8 flex flex-col h-[650px] w-[500px] bg-slate-700 border-2 border-slate-600 rounded-2xl shadow-lg">
        <h1 className="text-center text-white mb-6 mt-4 font-bold text-5xl">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-6 w-full flex-col">
          {/* Name Input */}
          <label className="text-white text-2xl flex items-center gap-x-3">
            Name <User className="size-6 text-green-500" />
          </label>
          <input
            type="text"
            className="input p-3 bg-slate-950 text-white w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name..."
            value={formData.fullName}
            onChange={(e) =>
              setFormdata({ ...formData, fullName: e.target.value })
            }
          />

          {/* Email Input */}
          <label className="text-white text-2xl flex items-center gap-x-3">
            Email <Mail className="size-6 text-green-500" />
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="input p-3 bg-slate-950 text-white w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            value={formData.email}
            onChange={(e) =>
              setFormdata({ ...formData, email: e.target.value })
            }
          />

          {/* Password Input */}
          <label className="text-white text-2xl flex items-center gap-x-3">
            Password <Lock className="size-6 text-green-500" />
          </label>
          <input
            type="password"
            placeholder="********"
            className="input p-3 bg-slate-950 text-white w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            value={formData.password}
            onChange={(e) =>
              setFormdata({ ...formData, password: e.target.value })
            }
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 text-white font-bold text-2xl bg-green-600 w-full py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
          >
            Create Account
                  </button>
                  <p  className="text-center text-1xl mb-4">Already have a account? <span className="text-green-500"> <Link to="/login">Login</Link> </span> </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
