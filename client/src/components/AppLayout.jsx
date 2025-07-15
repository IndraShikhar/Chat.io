import { useSelector } from "react-redux";
import ChatInfoSection from "./ChatInfoSection";
import ChatsSection from "./ChatsSection";
import MessagesSection from "./MessagesSection";
import UserSection from "./UserSection";

function AppLayout() {
  // eslint-disable-next-line no-unused-vars
  const { chatUser } = useSelector((state) => state.currentChat);

  return (
    <div className="bg-gray-100 h-screen flex xl:p-12 lg:p-8 p-0 transition-all duration-300">
      <div className="flex-1 grid grid-cols-[23rem_1fr] grid-rows-[5rem_1fr] gap-2 lg:rounded-2xl overflow-hidden">
        <UserSection />
        {/* {chatUser.username ? (
          <ChatInfoSection />
        ) : (
          <div className="row-span-2">Select a chat</div>
        )} */}
        <ChatInfoSection />
        <ChatsSection />
        {/* {chatUser.username && <MessagesSection />} */}
        <MessagesSection />
      </div>
    </div>
  );
}

export default AppLayout;
