import React, { useContext } from "react";
import { ADMIN_ROLE_ID, USER_ROLE_ID } from "../constants/Roles";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUser = () => {
  const { user } = useContext(AuthContext);

  return user && user.role_id == USER_ROLE_ID ? (
    <Outlet />
  ) : user && user.role_id == ADMIN_ROLE_ID ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedUser;
