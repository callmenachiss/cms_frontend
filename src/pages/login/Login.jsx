import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import mailIcon from '../../assets/mail.svg';
import passwordIcon from '../../assets/password.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    const customer = {
      email,
      password,
    };
    try {
      const response = await axios.post("http://localhost:8080/customer/login", customer);
      toast.success("Login successful ️ - " + response.data, { autoClose: 3000 });
      navigate("/home");
    } catch (error) {
      console.error("Error during login", error);
      toast.error("login failed - check your credentials");
    }
  };


  return (
    <div>
      <div className="special">

        <div className="container">
          <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
            <div className="smalltext">
            </div>
          </div>
          <div className="inputs">

            <div className="input">
              <img src={mailIcon} alt="" />
              <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="" />
              <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="submit-container">
            <div className="submit" onClick={handleSubmit}>Login</div>
          </div>
          <div className="already">Don't have account?
            <span className="login-link" onClick={() => navigate('/')}> Click Here!</span>
          </div>
        </div>
        <ToastContainer />

      </div>

    </div>
  )
}

export default Login