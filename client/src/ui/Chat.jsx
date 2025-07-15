import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";
import PropTypes from "prop-types";
import { onSetCurrentChat } from "../features/actions";

Chat.propTypes = {
  chat: PropTypes.object,
  newMessage: PropTypes.number,
  lastMessage: PropTypes.string,
};

function Chat({ chat, newMessage = 0, lastMessage }) {
  const { chatUser } = useSelector((state) => state.currentChat);

  const active = chat._id === chatUser._id;

  const basic =
    "flex items-center py-2 px-4 gap-2 cursor-pointer bg-gray-200 h-22 rounded-md hover:bg-amber-100 hover:shadow-md active:scale-98 transition-scale duration-300";
  let style = basic;
  if (active) {
    style = `${basic} border-0 border-l-12 border-amber-400`;
  }
  if (newMessage > 0) {
    style = `${style} border-2 border-amber-400`;
  }

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(onSetCurrentChat({ user, chatUser: chat }));
  };

  return (
    <div onClick={handleClick} className={style}>
      {/* Profile Picture */}
      <div className="shrink-0 mr-3">
        <ProfilePic type="primary" user={chat} />
      </div>

      {/* Username and Last Message */}
      <div className="flex flex-col justify-center w-full overflow-hidden">
        <h1 className="font-bold text-base text-gray-900">{chat.username}</h1>
        <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
      </div>

      {/* New Message Badge */}
      {newMessage > 0 && (
        <div className="bg-amber-400 w-6 h-6 rounded-full flex justify-center items-center ml-auto">
          <p className="text-xs font-semibold text-white">{newMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
