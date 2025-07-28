import MessageInput from "../ui/MessageInput";
import Messages from "../ui/Messages";

function MessagesSection() {
  return (
    <div className="bg-amber-300 rounded-tl-xl flex flex-col overflow-auto">
      <div className="flex flex-1 overflow-auto pr-2">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
}

export default MessagesSection;
