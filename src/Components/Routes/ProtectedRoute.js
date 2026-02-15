import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.login);

  if (!isLoggedIn) {
    return <Navigate to="/ottapp/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
