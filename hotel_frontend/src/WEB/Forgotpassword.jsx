import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Forgotpassword() {
  const [email, setemail] = useState('');

  async function fp() {
    try {
      const res = await axios.post(`http://localhost:3007/Web/forgot`, {
        user_email: email,
      });
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Something went wrong');
    }
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-lg p-4 mx-auto"
        style={{
          maxWidth: '500px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
        }}
      >
        <h3 className="text-center text-danger fw-bold mb-3">
          <i className="bi bi-lock me-2"></i> Forgot Password
        </h3>

        <p className="text-muted text-center mb-3">
          Enter your email to receive the password reset link.
        </p>

        <label className="form-label text-secondary">📧 Email Address</label>
        <input
          type="email"
          className="form-control bg-light mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <button
          className="btn w-100 text-white fw-bold"
          onClick={fp}
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
          <i className="bi bi-send me-2"></i> Send Reset Link
        </button>

        <ToastContainer />
      </div>
    </div>
  );
}
