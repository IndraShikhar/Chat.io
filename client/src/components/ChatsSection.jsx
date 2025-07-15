import { useState } from "react";
import { Search } from "lucide-react";
import Chats from "../ui/Chats";
import Overlay from "../ui/Overlay";
import SearchUserModal from "../ui/SearchUserModal";
import { useDispatch } from "react-redux";
import { searchChat } from "../features/chatsSlice";

function ChatsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpenSearchModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchChat(searchQuery));
  };

  return (
    <>
      {openSearchModal && (
        <Overlay>
          <SearchUserModal onClose={() => setOpenSearchModal(false)} />
        </Overlay>
      )}
      <div className="pt-4 w-full flex flex-col gap-4 bg-amber-50 rounded-tr-xl overflow-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center mx-2 p-2 pl-4  rounded-xl bg-gray-200"
        >
          <label>
            <Search />
          </label>
          <input
            type="text"
            placeholder="Search Chats"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="mx-2 w-full focus:outline-none"
          />
        </form>

        <div className="flex items-center justify-between mr-2">
          <h1 className="px-4 text-2xl">Chats</h1>
          <button
            onClick={handleClick}
            className="px-4 py-2 rounded-md bg-amber-400"
          >
            New Chat
          </button>
        </div>

        <Chats />
      </div>
    </>
  );
}

export default ChatsSection;
