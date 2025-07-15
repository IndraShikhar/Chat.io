import PropTypes from "prop-types";
import Login from "../ui/Login";
import Signup from "../ui/Signup";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthLayout({ authType }) {
  const [auth, setAuth] = useState(authType || "login");

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((store) => store.user);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-4 py-8 gap-4 bg-gray-50">
        <div>
          <Logo />
        </div>

        {auth === "login" && <Login setAuth={setAuth} />}
        {auth === "signup" && <Signup setAuth={setAuth} />}
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  authType: PropTypes.string,
};

export default AuthLayout;
