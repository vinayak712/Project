import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { userAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function LoginPage() {
  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormdata] = useState({
    fullName: "",
    password: "",
    email: "",
  });

  const { Login, isLogin } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(formData);
  };

  return (
    <>
      <div className="h-screen w-screen bg-base-200 flex justify-center items-center">
        <div className="px-10 py-8 flex flex-col h-[650px] w-[500px] bg-base-100 border-2 border-base-300 rounded-2xl shadow-lg">
          <h1 className="text-center text-base-content mb-6 mt-4 font-bold text-5xl">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="flex gap-6 w-full flex-col">
            {/* Name Input */}
            <label className="text-base-content text-2xl flex items-center gap-x-3">
              Name <User className="size-6 text-green-500" />
            </label>
            <input
              type="text"
              className="input p-3 bg-base-200 text-base-content w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name..."
              value={formData.fullName}
              onChange={(e) =>
                setFormdata({ ...formData, fullName: e.target.value })
              }
            />

            {/* Email Input */}
            <label className="text-base-content text-2xl flex items-center gap-x-3">
              Email <Mail className="size-6 text-green-500" />
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="input p-3 bg-base-200 text-base-content w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              value={formData.email}
              onChange={(e) =>
                setFormdata({ ...formData, email: e.target.value })
              }
            />

            {/* Password Input */}
            <label className="text-base-content text-2xl flex items-center gap-x-3">
              Password <Lock className="size-6 text-green-500" />
            </label>
            <div className="relative w-full">
              <input
                type={showpassword ? "text" : "password"}
                placeholder="********"
                className="input p-3 bg-base-200 text-base-content w-full rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                value={formData.password}
                onChange={(e) =>
                  setFormdata({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 pr-3 flex items-center"
                onClick={() => {
                  setShowpassword(!showpassword);
                }}
              >
                {showpassword ? (
                  <EyeOff className="size-5 text-green-500" />
                ) : (
                  <Eye className="size-5 text-green-500" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 text-white font-bold text-2xl bg-green-600 w-full py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
              disabled={isLogin}
            >
              {isLogin ? (
                <>
                  <Loader className="size-5 animate-spin inline-block mr-2" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-center text-base-content mb-4">
              Create account 👉{" "}
              <span className="text-green-500">
                <Link to="/Signup">Signup</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
