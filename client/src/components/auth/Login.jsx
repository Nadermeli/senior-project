import axios from "axios";
import React, { useContext, useState } from "react";
import { APIURL } from "../../utils/ApiURL";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ setAuth, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { saveToken } = useContext(AuthContext);

  const login = async () => {
    try {
      const response = await axios.post(`${APIURL}/auth/login`, {
        email: email,
        password: password,
      });
      saveToken(response.data.token);
      setError(false);
      close();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className="flex flex-col items-center gap-6">
      <input
        type="email"
        className="input-style md:w-[400px]"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input-style md:w-[400px]"
        placeholder="******"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button-primary" onClick={login}>
        Login
      </button>
      {error && <p className="text-red-600 text-small">Something went wrong</p>}

      <small className="text-grey">
        Don't have an account?{" "}
        <button className="text-primary" onClick={() => setAuth("SignUp")}>
          Sign Up
        </button>
      </small>
    </div>
  );
};

export default Login;
