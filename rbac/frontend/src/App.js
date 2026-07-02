// App.js

import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

import {
User,
Lock,
Eye,
EyeOff,
ShieldCheck,
RefreshCw,
} from "lucide-react";

export default function App() {
const [showPassword, setShowPassword] = useState(false);
const [captcha, setCaptcha] = useState("");
const [captchaInput, setCaptchaInput] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const [message, setMessage] = useState("");
const [error, setError] = useState("");

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [menus, setMenus] = useState([]);

const generateCaptcha = () => {
const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let result = "";

for (let i = 0; i < 6; i++) {
result += chars.charAt(Math.floor(Math.random() * chars.length));
}

setCaptcha(result);

};

useEffect(() => {
generateCaptcha();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("LOGIN CLICKED");
  console.log("Username:", username);
  console.log("Password:", password);

  if (captchaInput !== captcha) {
    setError("Invalid Captcha");
    return;
  }

  try {
  const response = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  console.log("API RESPONSE:", data);

  if (!response.ok) {
    setError(data.detail || "Login failed");
    setMessage("");
    return;
  }

  setMessage(data.message);
  setError("");

  const menuResponse = await fetch(
  "http://127.0.0.1:8000/user-menu/1"
  );

  const menuData = await menuResponse.json();

  setMenus(menuData);

  setIsLoggedIn(true);

} catch (error) {
  console.log("FULL ERROR:", error);

  setError(error.message || "Server Error");
  setMessage("");
}
};

if (isLoggedIn) {
  return <Dashboard menus={menus} />;
}

return (

<div className="main-container">  
<div className="background-overlay"></div>  <div className="login-card">    
    {/* LOGO */}    
    <div className="logo-section">    
      <img    
        src="/nic-logo.png"    
        alt="NIC Logo"    
        className="logo"    
      />    
    </div>    {/* TITLE */}    
<div className="title-section">    
  <h2>Login</h2>    
  <div className="title-dot"></div>    
</div>    

{/* FORM */}    
<form onSubmit={handleSubmit}>    
  {/* Username */}    
  <div className="form-group">    
    <label>Username</label>    

    <div className="input-box">    
      <User size={20} className="input-icon" />    

      <input
       type="text"
       placeholder="Enter your username"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       required
      />   
    </div>    
  </div>    

  {/* Password */}    
  <div className="form-group">    
    <label>Password</label>    

    <div className="input-box">    
      <Lock size={20} className="input-icon" />    

      <input
       type={showPassword ? "text" : "password"}
       placeholder="Enter your password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
        required
      />  

      <div    
        className="eye-icon"    
        onClick={() => setShowPassword(!showPassword)}    
      >    
        {showPassword ? (    
          <EyeOff size={20} />    
        ) : (    
          <Eye size={20} />    
        )}    
      </div>    
    </div>    
  </div>    

  {/* CAPTCHA */}    
  <div className="captcha-section">    
    <div className="captcha-box">{captcha}</div>    

    <button    
      type="button"    
      className="refresh-btn"    
      onClick={generateCaptcha}    
    >    
      <RefreshCw size={18} />    
      Refresh    
    </button>    
  </div>    

  {/* Captcha Input */}    
  <div className="form-group">    
    <label>Enter Captcha</label>    

    <div className="input-box">    
      <ShieldCheck size={20} className="input-icon" />    

      <input    
        type="text"    
        placeholder="Enter captcha"    
        value={captchaInput}    
        onChange={(e) => setCaptchaInput(e.target.value)}    
        required    
      />    
    </div>    
  </div>    

  {/* LOGIN BUTTON */}    
  <button type="submit" className="login-btn">    
    Login    
  </button>    
</form>    
{message && (
  <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
    {message}
  </p>
)}

{error && (
  <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
    {error}
  </p>
)}

{/* FOOTER */}    
<p className="footer-text">    
  © 2024 National Informatics Centre. All rights reserved.    
</p>

  </div>    {/* CSS */}

  <style>{`    
    * {    
      margin: 0;    
      padding: 0;    
      box-sizing: border-box;    
      font-family: 'Segoe UI', sans-serif;    
    }    
  
    body {    
      overflow: hidden;    
    }    
  
    .main-container {    
      width: 100%;    
      height: 100vh;    
      background: linear-gradient(    
        180deg,    
        #f6f7f9 0%,    
        #dff1ff 55%,    
        #b9e3ff 100%    
      );    
      display: flex;    
      justify-content: center;    
      align-items: center;    
      position: relative;    
      overflow: hidden;    
    }    
  
    /* BACKGROUND DESIGN */    
    .background-overlay::before,    
    .background-overlay::after {    
      content: "";    
      position: absolute;    
      width: 650px;    
      height: 650px;    
      border-radius: 50%;    
      background: radial-gradient(    
        circle,    
        rgba(0, 153, 255, 0.28),    
        rgba(0, 153, 255, 0)    
      );    
      z-index: 0;    
    }    
  
    .background-overlay::before {    
      left: -220px;    
      bottom: -220px;    
    }    
  
    .background-overlay::after {    
      right: -220px;    
      bottom: -220px;    
    }    
  
    .login-card {    
      width: 520px;    
      background: rgba(255, 255, 255, 0.96);    
      border-radius: 22px;    
      padding: 40px 48px;    
      box-shadow:    
        0 10px 40px rgba(0, 0, 0, 0.12),    
        0 2px 10px rgba(0, 0, 0, 0.05);    
      backdrop-filter: blur(8px);    
      position: relative;    
      z-index: 10;    
    }    
  
    .logo-section {    
      display: flex;    
      justify-content: center;    
      margin-bottom: 20px;    
    }    
  
    .logo {    
      width: 320px;    
      object-fit: contain;    
    }    
  
    .title-section {    
      text-align: center;    
      margin-bottom: 28px;    
      position: relative;    
    }    
  
    .title-section h2 {    
      font-size: 40px;    
      color: #003f8a;    
      font-weight: 700;    
      margin-bottom: 10px;    
    }    
  
    .title-section::after {    
      content: "";    
      width: 100%;    
      height: 1px;    
      background: #d9d9d9;    
      position: absolute;    
      left: 0;    
      bottom: 0;    
    }    
  
    .title-dot {    
      width: 12px;    
      height: 12px;    
      border-radius: 50%;    
      background: #0077d8;    
      margin: auto;    
      position: relative;    
      top: 7px;    
      z-index: 2;    
    }    
  
    .form-group {    
      margin-bottom: 22px;    
    }    
  
    .form-group label {    
      display: block;    
      margin-bottom: 10px;    
      font-size: 18px;    
      font-weight: 600;    
      color: #222;    
    }    
  
    .input-box {    
      width: 100%;    
      height: 58px;    
      border: 1px solid #d7d7d7;    
      border-radius: 12px;    
      display: flex;    
      align-items: center;    
      padding: 0 18px;    
      background: #fff;    
      transition: 0.3s;    
    }    
  
    .input-box:focus-within {    
      border-color: #0077d8;    
      box-shadow: 0 0 0 3px rgba(0, 119, 216, 0.1);    
    }    
  
    .input-icon {    
      color: #7f8894;    
      margin-right: 12px;    
    }    
  
    .input-box input {    
      width: 100%;    
      border: none;    
      outline: none;    
      font-size: 16px;    
      color: #333;    
      background: transparent;    
    }    
  
    .input-box input::placeholder {    
      color: #9da5ae;    
    }    
  
    .eye-icon {    
      cursor: pointer;    
      color: #7f8894;    
      display: flex;    
      align-items: center;    
    }    
  
    .captcha-section {    
      display: flex;    
      align-items: center;    
      gap: 18px;    
      margin-bottom: 22px;    
    }    
  
    .captcha-box {    
      width: 220px;    
      height: 58px;    
      background: #dff3ff;    
      border-radius: 10px;    
      display: flex;    
      justify-content: center;    
      align-items: center;    
      font-size: 38px;    
      letter-spacing: 8px;    
      color: #005fb8;    
      font-weight: 800;    
      user-select: none;    
    }    
  
    .refresh-btn {    
      border: none;    
      background: transparent;    
      color: #0077d8;    
      font-size: 18px;    
      cursor: pointer;    
      display: flex;    
      align-items: center;    
      gap: 8px;    
      font-weight: 500;    
    }    
  
    .login-btn {    
      width: 100%;    
      height: 58px;    
      border: none;    
      border-radius: 12px;    
      background: linear-gradient(    
        90deg,    
        #0066d6 0%,    
        #0052b8 100%    
      );    
      color: white;    
      font-size: 22px;    
      font-weight: 700;    
      cursor: pointer;    
      transition: 0.3s;    
      margin-top: 8px;    
    }    
  
    .login-btn:hover {    
      transform: translateY(-2px);    
      box-shadow: 0 10px 20px rgba(0, 102, 214, 0.25);    
    }    
  
    .footer-text {    
      text-align: center;    
      margin-top: 28px;    
      color: #6d7580;    
      font-size: 15px;    
    }    
  
    /* MOBILE RESPONSIVE */    
    @media (max-width: 600px) {    
      .login-card {    
        width: 92%;    
        padding: 30px 22px;    
      }    
  
      .logo {    
        width: 240px;    
      }    
  
      .title-section h2 {    
        font-size: 32px;    
      }    
  
      .captcha-section {    
        flex-direction: column;    
        align-items: flex-start;    
      }    
  
      .captcha-box {    
        width: 100%;    
      }    
  
      .refresh-btn {    
        padding-left: 5px;    
      }    
    }    
  `}</style>    </div>  );
}