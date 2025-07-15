import { useSelector } from "react-redux";
import Logo from "../ui/Logo";
import ProfilePic from "../ui/ProfilePic";

function UserSection() {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className="basis-1/4 py-2 px-6 bg-gray-300 rounded-br-xl flex items-center justify-between">
      <Logo />
      <div>
        <ProfilePic type="small" user={user} />
      </div>
    </div>
  );
}

export default UserSection;
