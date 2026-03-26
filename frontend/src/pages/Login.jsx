import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "1234") {
      localStorage.setItem("token", "true");
      navigate("/dashboard");
    } else {
      alert("Wrong password ❌");
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>🔐 Admin Access</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}