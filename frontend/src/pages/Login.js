import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  RefreshCw
} from "lucide-react";



function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [captcha, setCaptcha] = useState("");

  const [captchaInput, setCaptchaInput] = useState("");



  const generateCaptcha = () => {

    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let result = "";

    for (let i = 0; i < 6; i++) {

      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );

    }

    setCaptcha(result);

  };



  useEffect(() => {

    generateCaptcha();

  }, []);



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (captchaInput !== captcha) {

      setError("Invalid Captcha");

      return;

    }

    try {

      const endpoint = isLogin
        ? "http://127.0.0.1:8000/login"
        : "http://127.0.0.1:8000/signup";

      const response = await axios.post(
        endpoint,
        {
          username,
          password
        }
      );

      setMessage(response.data.message);

      setError("");

      setUsername("");

      setPassword("");

      setCaptchaInput("");

      generateCaptcha();

      if (isLogin) {

        setTimeout(() => {

          navigate("/dashboard");

        }, 1000);

      }

    }

    catch (error) {

      setError(
        error.response?.data?.detail
        || "Server Error"
      );

      setMessage("");

    }

  };



  return (

    <div className="main-container">

      <div className="login-card">

        <div className="logo-section">

          <img
            src="/nic-logo.png"
            alt="NIC"
            className="logo"
          />

        </div>



        <div className="title-section">

          <h2>
            {
              isLogin
                ? "Login"
                : "Signup"
            }
          </h2>

        </div>



        <form onSubmit={handleSubmit}>


          {/* USERNAME */}

          <div className="form-group">

            <label>Username</label>

            <div className="input-box">

              <User
                size={20}
                className="input-icon"
              />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>

          </div>



          {/* PASSWORD */}

          <div className="form-group">

            <label>Password</label>

            <div className="input-box">

              <Lock
                size={20}
                className="input-icon"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <div
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {
                  showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                }

              </div>

            </div>

          </div>



          {/* CAPTCHA */}

          <div className="captcha-section">

            <div className="captcha-box">
              {captcha}
            </div>

            <button
              type="button"
              className="refresh-btn"
              onClick={generateCaptcha}
            >

              <RefreshCw size={18} />

            </button>

          </div>



          {/* CAPTCHA INPUT */}

          <div className="form-group">

            <label>Enter Captcha</label>

            <div className="input-box">

              <ShieldCheck
                size={20}
                className="input-icon"
              />

              <input
                type="text"
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) =>
                  setCaptchaInput(e.target.value)
                }
                required
              />

            </div>

          </div>



          {/* BUTTON */}

          <button
            type="submit"
            className="login-btn"
          >

            {
              isLogin
                ? "Login"
                : "Signup"
            }

          </button>

        </form>



        {/* MESSAGE */}

        {
          message && (

            <p className="success">
              {message}
            </p>

          )
        }

        {
          error && (

            <p className="error">
              {error}
            </p>

          )
        }



        {/* SWITCH */}

        <p
          className="switch-text"
          onClick={() => {

            setIsLogin(!isLogin);

            setMessage("");

            setError("");

          }}
        >

          {
            isLogin
              ? "Create New Account"
              : "Already Have Account?"
          }

        </p>

      </div>



      <style>{`

        body {
          margin: 0;
          font-family: Arial;
        }

        .main-container {

          min-height: 100vh;

          display: flex;

          justify-content: center;

          align-items: center;

          background: #eaf4ff;

          padding: 30px;

        }

        .login-card {

          width: 450px;

          background: white;

          padding: 35px;

          border-radius: 20px;

          box-shadow: 0 5px 20px rgba(0,0,0,0.1);

        }

        .logo-section {

          text-align: center;

          margin-bottom: 20px;

        }

        .logo {

          width: 220px;

        }

        .title-section {

          text-align: center;

          margin-bottom: 30px;

        }

        .title-section h2 {

          color: #003f8a;

          font-size: 36px;

        }

        .form-group {

          margin-bottom: 20px;

        }

        .form-group label {

          display: block;

          margin-bottom: 8px;

          font-weight: bold;

        }

        .input-box {

          height: 55px;

          border: 1px solid #ccc;

          border-radius: 10px;

          display: flex;

          align-items: center;

          padding: 0 15px;

        }

        .input-icon {

          color: gray;

          margin-right: 10px;

        }

        .input-box input {

          flex: 1;

          border: none;

          outline: none;

          font-size: 15px;

        }

        .eye-icon {

          cursor: pointer;

        }

        .captcha-section {

          display: flex;

          gap: 15px;

          align-items: center;

          margin-bottom: 20px;

        }

        .captcha-box {

          flex: 1;

          height: 55px;

          background: #dff3ff;

          display: flex;

          justify-content: center;

          align-items: center;

          font-size: 28px;

          font-weight: bold;

          letter-spacing: 5px;

          border-radius: 10px;

        }

        .refresh-btn {

          border: none;

          background: transparent;

          cursor: pointer;

        }

        .login-btn {

          width: 100%;

          height: 55px;

          border: none;

          border-radius: 10px;

          background: #0066d6;

          color: white;

          font-size: 18px;

          cursor: pointer;

        }

        .switch-text {

          margin-top: 20px;

          text-align: center;

          color: blue;

          cursor: pointer;

        }

        .success {

          color: green;

          text-align: center;

          margin-top: 15px;

        }

        .error {

          color: red;

          text-align: center;

          margin-top: 15px;

        }

      `}</style>

    </div>

  );

}

export default Login;