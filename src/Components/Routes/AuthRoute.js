import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.login);

  if (isLoggedIn) {
    return <Navigate to="/ottapp" replace />;
  } 

  return children;
};

export default AuthRoute;
