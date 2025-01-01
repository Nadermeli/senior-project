import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../utils/ApiURL";
import { ADMIN_ROLE_ID } from "../utils/constants/Roles";
import { Navigate } from "react-router-dom";

// Create the context
export const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const fetchUser = async () => {
    if (token) {
      try {
        const response = await axios.get(`${APIURL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const saveToken = (tok) => {
    localStorage.setItem("token", tok);
    setToken(tok);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, logout, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};
