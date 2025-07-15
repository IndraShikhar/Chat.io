import { useSelector } from "react-redux";
import ProfilePic from "../ui/ProfilePic";

function ChatInfoSection() {
  const chatUser = useSelector((state) => state.currentChat.chatUser);

  return (
    <div className="bg-gray-300 rounded-bl-xl flex items-center px-6">
      <div className="flex items-center gap-4">
        Back
        <ProfilePic type="small" user={chatUser} />
        <p>{chatUser?.username}</p>
        <span className="bg-amber-400 w-6 h-6 rounded-full flex justify-center items-center italic">
          i
        </span>
      </div>
    </div>
  );
}

export default ChatInfoSection;
