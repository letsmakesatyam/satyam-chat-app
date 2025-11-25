import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore"; // Import useAuthStore
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore(); // Get onlineUsers from the correct store

  useEffect(() => {
    getUsers();
  }, []); // Removed getUsers from dependency array to prevent re-fetching

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => {
          // Check if the current user ID is included in the list of online user IDs
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              // Use DaisyUI's 'active' or custom styles for selection
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              
              {/* Profile Picture Container: MUST BE 'relative' for the dot to be positioned correctly */}
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullname}
                  className="size-12 object-cover rounded-full"
                />

                {/* 🟢 ONLINE STATUS DOT */}
                {isOnline && (
                  <span 
                    // Tailwind/DaisyUI classes for the dot
                    className="
                      absolute 
                      bottom-0 
                      right-0 
                      h-3 w-3 
                      bg-success 
                      rounded-full 
                      ring-2 ring-base-100 
                      shadow-md
                    "
                    title={`${user.fullname} is online`}
                  ></span>
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <h4 className="font-medium truncate">{user.fullname}</h4>
                {/* Status text, already confirmed to be working */}
                {isOnline && <p className="text-xs text-success">Online</p>}
              </div>
            </button>
          );
        })}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;