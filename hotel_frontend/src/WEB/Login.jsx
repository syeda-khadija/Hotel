import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Login() {
  const [Email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const nav = useNavigate();

  async function Login_form() {
    if (!Email || !pass) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3007/Web/login", {
        user_email: Email,
        password: pass
      });
      
      toast.success(res.data.msg);
      localStorage.setItem("User_Data", JSON.stringify(res.data.user));
      setEmail('');
      setPass('');
      setTimeout(() => nav("/s"), 1000);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Invalid login or server error");
      console.error(error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center text-danger mb-4">User Login</h3>
            <div className="mb-3">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
      
            <button className="btn btn-danger w-100" onClick={Login_form}>
              Login
            </button>
            <div className="mt-3 text-center">
              <Link to="/reg">Don't have an account? </Link>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/fp">Forget Password</Link>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
