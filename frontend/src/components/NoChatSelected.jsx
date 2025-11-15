import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-base-100 p-10">
      <div className="max-w-md text-center space-y-6">

        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce shadow-md">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-base-content">
          Welcome to ChatBox!
        </h2>

        <p className="text-base-content/60 text-sm sm:text-base">
          Select a conversation from the sidebar to start chatting.
        </p>

      </div>
    </div>
  );
};

export default NoChatSelected;
