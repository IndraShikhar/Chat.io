import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

import AuthInput from "./AuthInput";
import PropTypes from "prop-types";

Signup.propTypes = {
  setAuth: PropTypes.func,
};

function Signup({ setAuth }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Attempt:", { username, email, password });
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
          type="email"
          placeholder="Email Address"
          value={email}
          setValue={setEmail}
          Icon={Mail}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          Icon={Lock}
        />

        <button type="submit" className="bg-gray-500 p-2 rounded-md">
          SignUp
        </button>
      </form>
      <p className="text-center text-sm text-gray-700 mt-6 font-medium">
        Already have an account?{" "}
        <a
          onClick={() => setAuth("login")}
          className="text-amber-600 hover:underline font-semibold"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}

export default Signup;
