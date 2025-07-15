import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth");
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
}

export default ProtectedRoute;
