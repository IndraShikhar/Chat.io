import MessageInput from "../ui/MessageInput";
import Messages from "../ui/Messages";

function MessagesSection() {
  return (
    <div className="bg-gray-300 rounded-tl-xl flex flex-col overflow-auto">
      <Messages />
      <MessageInput />
    </div>
  );
}

export default MessagesSection;
