import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import userIcon from '../../assets/usericon.svg';
import mailIcon from '../../assets/mail.svg';
import passwordIcon from '../../assets/password.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const customer = {
      username,
      email,
      password,
      confirmPassword,
    };
    try {
      const response = await axios.post("http://localhost:8080/customer/createCustomer", customer);
      toast.success("Signup successful ❤️️ - " + response.data, { autoClose: 3000 });
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error during signup", error);
      toast.error("Signup failed");
    }
  };


  return (
    <div>
      <div className="authcontent">
        <div className="container">
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
            <div className="smalltext">
              <span>Register for free to start the exicting journey!</span>
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={userIcon} alt="" />
              <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input">
              <img src={mailIcon} alt="" />
              <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="" />
              <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="" />
              <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <div className="submitcontainer">
            <div className="submit" onClick={handleSubmit}>
              Sign Up
            </div>
            <div className="already">
              Already having account?
              <span className="login-link" onClick={() => navigate('/login')}> Click Here!</span>
            </div>
          </div>
        </div>
        <ToastContainer />

      </div>



    </div>
  )
}

export default Signup