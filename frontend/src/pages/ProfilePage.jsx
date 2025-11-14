import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-base-100">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-base-200/40 rounded-xl p-8 shadow-xl border border-base-300">

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-base-content drop-shadow-[0_0_6px_#f000b8]">
              Profile
            </h1>
            <p className="mt-2 text-base-content/70">
              Manage your account details
            </p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                className="size-36 rounded-full object-cover border-4 border-primary shadow-[0_0_15px_#f000b8]"
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer transition-all hover:scale-110 shadow-lg ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-100" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-base-content/70">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Information Fields */}
          <div className="mt-8 space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm flex items-center gap-2 text-base-content/80">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <p className="px-4 py-3 bg-base-300 text-base-content rounded-lg border border-base-200">
                {authUser? authUser.fullname: ""}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm flex items-center gap-2 text-base-content/80">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <p className="px-4 py-3 bg-base-300 text-base-content rounded-lg border border-base-200">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Extra Info */}
          <div className="mt-10 bg-base-300/40 p-6 rounded-xl border border-base-200">
            <h2 className="text-lg font-semibold text-base-content mb-4">
              Account Information
            </h2>

            <div className="space-y-3 text-base-content/80 text-sm">
              <div className="flex justify-between py-2 border-b border-base-300">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>

              <div className="flex justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
