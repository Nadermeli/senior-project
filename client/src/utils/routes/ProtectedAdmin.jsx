import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ADMIN_ROLE_ID } from "../constants/Roles";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdmin = () => {
  const { user } = useContext(AuthContext);

  return user && user.role_id == ADMIN_ROLE_ID ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedAdmin;
