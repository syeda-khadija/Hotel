import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function Resetpassword() {
  const [pswd, setPswd] = useState("");
  const [cpswd, setCpswd] = useState("");
  const { token } = useParams();
  const nav = useNavigate();

  async function handleResetPassword() {
    if (!pswd || !cpswd) {
      toast.error("Both fields are required");
      return;
    }

    if (pswd !== cpswd) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3007/Web/reset/${token}`, { password: pswd });
      toast.success(response.data.msg || "Password reset successful");
      setPswd("");
      setCpswd("");
      nav("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow p-4 mx-auto"
        style={{
          maxWidth: '500px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
        }}
      >
        <h3 className="text-center text-danger fw-bold mb-4">
          <i className="bi bi-shield-lock-fill me-2"></i> Reset Password
        </h3>

        <label className="form-label text-secondary">🔑 New Password</label>
        <input
          type="password"
          className="form-control bg-light mb-3"
          placeholder="Enter new password"
          value={pswd}
          onChange={(e) => setPswd(e.target.value)}
        />

        <label className="form-label text-secondary">🔁 Confirm Password</label>
        <input
          type="password"
          className="form-control bg-light mb-4"
          placeholder="Confirm password"
          value={cpswd}
          onChange={(e) => setCpswd(e.target.value)}
        />

        <button
          className="btn w-100 text-white fw-bold"
          onClick={handleResetPassword}
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
          <i className="bi bi-arrow-repeat me-2"></i> Reset Password
        </button>

        <ToastContainer />
      </div>
    </div>
  );
}
