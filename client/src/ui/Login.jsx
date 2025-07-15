import { useState } from "react";
import { User, Lock } from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "./AuthInput";
import PropTypes from "prop-types";
import { attemptLogin } from "../services/apiChatIO";
import { useDispatch } from "react-redux";
// import { login } from "../features/userSlice";
import { useNavigate } from "react-router";
import { loginAndJoinSocket } from "../features/actions";

Login.propTypes = {
  setAuth: PropTypes.func,
};

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { username, password });

    const data = await attemptLogin(username, password);
    console.log(data);

    if (data.status === "success") {
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      dispatch(loginAndJoinSocket(data.user));
      // dispatch(login(data.user));
      navigator("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          placeholder="Username"
          value={username}
          setValue={setUsername}
          Icon={User}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          Icon={Lock}
        />

        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            Remember me
          </label>
          <a href="#" className="hover:underline font-semibold">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="bg-gray-500 p-2 rounded-md">
          Login
        </button>
      </form>
      <p className="text-center text-sm text-gray-700 mt-6 font-medium">
        Don’t have an account?{" "}
        <a
          onClick={() => setAuth("signup")}
          className="text-amber-600 hover:underline font-semibold"
        >
          Create one
        </a>
      </p>
    </div>
  );
}

export default Login;
