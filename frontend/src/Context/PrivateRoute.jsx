import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { isAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuth) {
    alert("Please Login first");
    navigate("/");
    return null;
  }

  return children;
};

export default PrivateRoute;
