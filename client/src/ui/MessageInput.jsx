// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import { useState } from "react";
import { sendMessage } from "../services/apiChatIO";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getSocket } from "../features/socket";

function MessageInput() {
  const { user } = useSelector((state) => state.user);
  const { chatUser } = useSelector((state) => state.currentChat);
  const socket = getSocket();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return toast("Message cannot be empty!");

    const data = await sendMessage({ chatId: chatUser._id, message });
    console.log(data);
    if (data.status === "success") {
      console.log(socket);
      socket.emit("sendMessage", {
        roomId: user.chats[chatUser._id].id,
        user: chatUser,
      });
      toast.success(data.message);
      setMessage("");
    } else toast.error(data.message);
  };

  return (
    <div className="basis-18 px-2 py-2">
      <form
        onSubmit={handleSubmit}
        className="flex w-full h-full gap-3"
        autoComplete="off"
      >
        <div className="flex items-center justify-center bg-amber-300 rounded-full">
          {/* <label htmlFor="Doc" className="px-4 py-2 rounded-md ">
            <InsertDriveFileIcon />
          </label> */}
          <input type="file" name="Doc" id="Doc" className="hidden" />
        </div>
        <input
          className=" p-2 rounded-md bg-gray-200 text-lg w-full h-full focus:outline-0"
          type="text"
          placeholder="Type a message..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 rounded-md bg-amber-400">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
