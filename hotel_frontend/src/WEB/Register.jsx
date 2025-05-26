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
        toast.success('Registration successful!');
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
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-danger mb-3">User Registration</h3>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Gender</label>
            <select
              className="form-select"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-12 mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
          <div className="col-md-12 mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={Pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="col-md-12">
            <button className="btn btn-danger w-100" onClick={save_data}>
              Register Me
            </button>
          </div>
        </div>
        <div className="mt-3 text-center">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
