import { useSelector } from "react-redux";
import Chat from "./Chat";

function Chats() {
  const { chats: result } = useSelector((state) => state.chats);

  console.log(result);

  return (
    <div className="px-4 flex flex-1 flex-col gap-2 overflow-auto">
      {result.length > 0
        ? result.map((chat) => (
            <Chat
              key={chat.chatUser._id}
              chat={chat.chatUser}
              lastMessage={chat.lastMessage}
            />
          ))
        : null}
      {result.length === 0 && <p>No Chats</p>}
    </div>
  );
}

export default Chats;
