import React, { useState } from "react";
import Popup from "../Popup";
import Login from "./Login";
import Signup from "./Signup";

const Auth = ({ close }) => {
  const [auth, setAuth] = useState("Login");
  return (
    <Popup
      close={close}
      title={auth}
      content={
        auth == "Login" ? (
          <Login setAuth={setAuth} close={close} />
        ) : (
          <Signup setAuth={setAuth} close={close} />
        )
      }
    />
  );
};

export default Auth;
