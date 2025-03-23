import { useState } from "react";
import defaultUserImage from "../assets/user.png";
import { User, Camera, Mail, Loader } from "lucide-react";
import { userAuthStore } from "../store/useAuthStore";

function Profile() {
  const { authUser, Profile, isUpdatingprof } = userAuthStore();
  const [selectedimg, setSelectedimg] = useState(null);

  async function handleImageUp(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      console.log("Base64 Image:", base64Image);
      setSelectedimg(base64Image);

      try {
        await Profile({ profilepic: base64Image });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    };
  }

  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center bg-base-100">
        {/* Profile Container */}
        <div className="flex flex-col items-center w-[700px] h-auto p-8 rounded-2xl shadow-2xl border border-base-300 bg-base-200">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">Profile</h1>
            <p className="text-lg text-green-500 font-medium mt-2">
              Your Profile Information
            </p>
          </div>

          {/* Profile Picture Section */}
          <div className="relative mt-6">
            <img
              src={selectedimg || defaultUserImage || authUser?.Profile}
              alt="User profile photo"
              className="rounded-full size-32 object-cover border-4 border-primary bg-base-100 shadow-lg"
            />
            {/* Camera Icon for Upload */}
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 shadow-md"
            >
              <Camera className="size-6 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUp}
                disabled={isUpdatingprof}
              />
            </label>
          </div>
          {/* Upload Status */}
          <p className="text-lg text-base-content p-4 font-bold">
            {authUser?.fullName || "Loading..."}
          </p>

          <p className="text-base-content text-lg text-center p-5">
            {isUpdatingprof ? (
              <>
                <Loader className="size-5 animate-spin inline-block mr-2" />
                Uploading...
              </>
            ) : (
              "Click the camera icon to update your photo"
            )}
          </p>

          {/* User Info Section */}
          <div className="space-y-6 w-full px-6">
            {/* Full Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-lg text-base-content">
                <User className="size-5" />
                <span className="font-semibold">Full Name</span>
              </div>
              <p className="text-base-content bg-base-100 rounded-lg border border-base-300 p-4 w-full">
                {authUser?.fullName}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-lg text-base-content">
                <Mail className="size-5" />
                <span className="font-semibold">Email</span>
              </div>
              <p className="text-base-content bg-base-100 rounded-lg border border-base-300 p-4 w-full">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-base-100 w-full rounded-xl p-6 border border-base-300">
            <h2 className="text-lg font-medium text-primary mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-sm text-base-content">
              <div className="flex items-center justify-between py-2 border-b border-base-300">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
