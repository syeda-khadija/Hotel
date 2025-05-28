import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [Age, setAge] = useState('');
  const [Gender, setGender] = useState('');
  const [Address, setAddress] = useState('');

  function clearForm() {
    setName('');
    setEmail('');
    setPass('');
    setAge('');
    setGender('');
    setAddress('');
  }

  async function save_data() {
    try {
      const pswd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      const username_regex = /^[A-Za-z0-9_]{3,20}$/;

      if (!Name || !Email || !Pass || !Age || !Gender || !Address) {
        toast.error('All fields are required');
      } else if (!pswd_regex.test(Pass)) {
        toast.error('Password must be 8+ characters, include upper/lowercase, number & special char');
      } else if (!username_regex.test(Name)) {
        toast.error('Username must be 3–20 chars, no spaces or special symbols');
      } else if (parseInt(Age) < 18) {
        toast.error('Age must be 18 or older');
      } else {
        await axios.post('http://localhost:3007/Web/reg', {
          user_name: Name,
          user_email: Email,
          password: Pass,
          Age,
          Gender,
          Address,
        });
        toast.success('🎉 Registration successful!');
        clearForm();
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error('Email already exists');
      } else {
        toast.error('Network or server error');
        console.error(error);
      }
    }
  }

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-lg p-4 mx-auto"
        style={{
          maxWidth: '700px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
        }}
      >
        <h3 className="text-center mb-4 text-danger fw-bold">
          <i className="bi bi-pencil-square me-2"></i> User Registration
        </h3>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-secondary">👤 Full Name</label>
            <input
              type="text"
              className="form-control bg-light"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary">📧 Email</label>
            <input
              type="email"
              className="form-control bg-light"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary">🎂 Age</label>
            <input
              type="number"
              className="form-control bg-light"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-secondary">⚧️ Gender</label>
            <select
              className="form-select bg-light"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label text-secondary">🏠 Address</label>
            <input
              type="text"
              className="form-control bg-light"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>

          <div className="col-12">
            <label className="form-label text-secondary">🔒 Password</label>
            <input
              type="password"
              className="form-control bg-light"
              value={Pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="col-12">
            <button
              className="btn w-100 text-white fw-bold"
              onClick={save_data}
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
              <i className="bi bi-check2-circle me-2"></i> Register Me
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-decoration-none">
            Already have an account? Login
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
