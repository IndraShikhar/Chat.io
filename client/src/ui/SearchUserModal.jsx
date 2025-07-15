import { X, Search } from "lucide-react";
import { useState } from "react";
import { createConversation, searchUsers } from "../services/apiChatIO";
import ProfilePic from "./ProfilePic";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { onAddChat } from "../features/actions";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../features/currentChatSlice";

SearchUserModal.propTypes = {
  onClose: PropTypes.func,
};

function SearchUserModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
    console.log("Close Modal");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search User:", username);
    (async function () {
      const data = await searchUsers(username);
      console.log(data);
      if (data.status === "success") setResult(data.results);
    })();
  };

  const handleAddChat = (user) => (e) => {
    console.log("Adding user:", user);
    (async function () {
      const data = await createConversation(user);
      console.log(data);
      if (data.status === "success") {
        toast.success(data.message);
        const conversationId = data.conversationId;
        console.log("Conversation ID:", conversationId);
        dispatch(onAddChat({ chatUser: user, conversationId }));
        handleClose(e);
      } else if (data.status === "exists") {
        toast.error("Conversation already exists!");
        dispatch(setCurrentChat({ user: user, messages: [] }));
        handleClose(e);
      } else {
        toast.error(data.message);
      }
    })();
    // onAddChat(user);
  };

  // return (
  //   <div
  //     onClick={handleClose}
  //     className="flex h-screen w-full items-center justify-center"
  //   >
  //     <div
  //       onClick={(e) => {
  //         e.stopPropagation();
  //       }}
  //       className="relative flex flex-col gap-4 bg-white p-6 rounded-md h-screen md:h-3/5 sm:h-4/5 w-125 overflow-auto"
  //     >
  //       <button
  //         onClick={handleClose}
  //         className="absolute bg-amber-200 top-4 right-4 text-2xl"
  //       >
  //         <X />
  //       </button>
  //       <form onSubmit={handleSubmit}>
  //         <input
  //           type="text"
  //           placeholder="Search Users"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //           className="mt-6 p-2 pl-4 rounded-xl bg-gray-200 w-full"
  //         />
  //       </form>
  //       <div className="flex-1 flex flex-col gap-4 overflow-auto">
  //         {result.length === 0 && <p className="self-center">No results</p>}
  //         {result.length > 0 &&
  //           result.map((user) => (
  //             <div
  //               className=" flex items-center py-2 px-4 gap-4 cursor-pointer bg-gray-200 h-22 rounded-md hover:bg-amber-100 hover:shadow-md active:scale-98 transition-scale duration-300"
  //               key={user._id}
  //             >
  //               <ProfilePic type={"primary"} />
  //               <div className="flex-1 flex justify-between">
  //                 <h1 className="font-semibold self-center text-2xl">
  //                   {user.username}
  //                 </h1>
  //                 {/* <p>%Last Message%</p> */}
  //                 <button className="px-4 py-2 rounded-md bg-amber-400">
  //                   Add
  //                   <Plus />
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div
      onClick={handleClose}
      className="flex h-screen w-full items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-lg w-full max-w-md  mx-4 p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Start New Chat
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-gray-700"
          >
            <X strokeWidth={4} className="w-6 h-6" />
          </button>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center mb-4 bg-gray-100 px-3 py-2 rounded-lg shadow-inner"
        >
          <Search />
          <input
            type="text"
            placeholder="Search by username or email..."
            className="ml-2 w-full bg-transparent focus:outline-none font-medium text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>

        {/* User List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {result.length > 0 ? (
            result.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between px-3 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <ProfilePic type={"small"} user={user} />
                  <div>
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleAddChat(user)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 text-sm rounded-lg font-medium"
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUserModal;
