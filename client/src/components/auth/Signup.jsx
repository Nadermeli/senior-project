import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { APIURL } from "../../utils/ApiURL";

const Signup = ({ setAuth, close }) => {
  const { saveToken } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const signUp = async () => {
    try {
      const response = await axios.post(`${APIURL}/auth/signup`, {
        username: userName,
        full_name: fullName,
        email: email,
        password: password,
        password_confirmation: passwordConfirm,
        address: address,
        phone_number: phone,
      });
      saveToken(response.data.token);
      setError(false);
      close();
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  console.log({
    username: userName,
    full_name: fullName,
    email: email,
    password: password,
    password_confirmation: passwordConfirm,
    address: address,
    phone_number: phone,
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <input
        type="text"
        className="input-style md:w-[400px]"
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        className="input-style md:w-[400px]"
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        type="email"
        className="input-style md:w-[400px]"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input-style md:w-[400px]"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className="input-style md:w-[400px]"
        placeholder="Confirm Password"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <input
        type="text"
        className="input-style md:w-[400px]"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        className="input-style md:w-[400px]"
        placeholder="Phone number"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="button-primary" onClick={signUp}>
        SignUp
      </button>
      {error && <p className="text-red-600 text-small">Something went wrong</p>}
      <small className="text-grey">
        Already have an account?{" "}
        <button className="text-primary" onClick={() => setAuth("Login")}>
          Login
        </button>
      </small>
    </div>
  );
};

export default Signup;
