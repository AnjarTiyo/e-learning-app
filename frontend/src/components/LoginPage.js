import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/baseUrl";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token, role } = await response.json();
        localStorage.setItem("token", token); // Store the token in localStorage
        onLogin(role); // Notify parent component about successful login
      } else {
        const data = await response.json();
        setUsernameError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setUsernameError("An error occurred during login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={"mainContainer"}>
      <div className={"wrap-login"}>
        <div className={"titleContainer"}>
          <div>Login</div>
        </div>
        <br />
        <div className="wrap-input">
          <div className={"inputContainer"}>
            <input
              value={username}
              placeholder="Username"
              onChange={(ev) => setUsername(ev.target.value)}
              className={"inputBox"}
              data-qa-id="username"
              id="username-field"
            />
            <label className="errorLabel">{usernameError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={password}
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox"}
              data-qa-id="password"
              id="password-field"
            />
            {/* <i
              className={`eye-icon ${showPassword ? "visible" : ""}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🔓" : "🔒"}
            </i> */}
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <button
              className={"login-form-btn"}
              type="button"
              onClick={onButtonClick}
              data-qa-id="login-btn"
              id="login-btn"
            >Login</button>
          </div>
          <br />
          <div className={"sign-up-container"}>
            <div className={"sign-up-link"}>
              Don't have an account? <a href="/signup">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
