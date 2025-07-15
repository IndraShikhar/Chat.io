import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loading from "./Loading";

AuthRoute.propTypes = {
  children: PropTypes.node,
};

function AuthRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector((store) => store.user);

  if (isLoading) return <Loading />;

  if (isAuthenticated) return <Navigate to="/app" replace />;

  return <div>{children}</div>;
}

export default AuthRoute;
