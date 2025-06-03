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
      setTimeout(() => nav("/adminnav"), 1000);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Invalid login or server error");
      console.error(error);
    }
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-lg p-4 mx-auto"
        style={{
          maxWidth: '600px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
        }}
      >
        <h3 className="text-center mb-4 text-danger fw-bold">
          <i className="bi bi-person-circle me-2"></i> Admin Login
        </h3>

        <div className="mb-3">
          <label className="form-label text-secondary">📧 Email Address</label>
          <input
            type="email"
            className="form-control bg-light"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-secondary">🔒 Password</label>
          <input
            type="password"
            className="form-control bg-light"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          className="btn w-100 text-white fw-bold"
          onClick={Login_form}
          style={{
            background: 'linear-gradient(to right, #ff0000, #000000)',
            padding: '12px',
            fontSize: '1.1rem',
            border: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i>Login
        </button>

       
      </div>

      <ToastContainer />
    </div>
  );
}