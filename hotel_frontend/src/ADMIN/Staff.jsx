import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

export default function Staff() {
  const [staff_name, setS_name] = useState("");
  const [staff_email, setS_email] = useState("");
  const [staff_Age, setS_age] = useState('');
  const [staff_Gender, setS_gender] = useState("");
  const [staff_phone_no, setS_ph_no] = useState('');
  const [staff_Address, setS_address] = useState("");
  const [staff_Role, setS_role] = useState("");
  const [staff_Shift, setS_shift] = useState("");
  const [staff_Password, setS_password] = useState("");

  function clearForm() {
    setS_name('');
    setS_email('');
    setS_age('');
    setS_gender('');
    setS_ph_no('');
    setS_address('');
    setS_role('');
    setS_shift('');
    setS_password('');
  }

  async function add_staff() {
    try {
      const pswd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      const username_regex = /^[A-Za-z0-9_]{3,20}$/;

      if (!staff_name || !staff_email || !staff_Age || !staff_Gender || !staff_phone_no || !staff_Address || !staff_Role || !staff_Shift || !staff_Password) {
        toast.error('All fields are required');
      } else if (!pswd_regex.test(staff_Password)) {
        toast.error('Password must be 8+ characters, include upper/lowercase, number & special char');
      } else if (!username_regex.test(staff_name)) {
        toast.error('Username must be 3–20 chars, no spaces or special symbols');
      } else if (parseInt(staff_Age) < 18) {
        toast.error('Age must be 18 or older');
      } else {
        await axios.post('http://localhost:3007/staff/staff_reg', {
          staff_name,
          staff_email,
          password: staff_Password,
          Age: staff_Age,
          Gender: staff_Gender,
          Phone_no: staff_phone_no,
          Address: staff_Address,
          Role: staff_Role,
          Shift_Timing: staff_Shift,
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
    <div>
      <Adminnavbar />
      <div className="container py-5">
        <div
          className="card border-0 shadow-lg p-4 mx-auto"
          style={{
            maxWidth: '900px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
          }}
        >
          <h3 className="text-center mb-4 fw-bold text-gradient">
            <i className="bi bi-person-badge-fill me-2"></i>Add Staff Member
          </h3>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary">👤 Name</label>
              <input type="text" className="form-control" value={staff_name} onChange={(e) => setS_name(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">📧 Email</label>
              <input type="email" className="form-control" value={staff_email} onChange={(e) => setS_email(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🎂 Age</label>
              <input type="number" className="form-control" value={staff_Age} onChange={(e) => setS_age(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🚻 Gender</label>
              <select className="form-select" value={staff_Gender} onChange={(e) => setS_gender(e.target.value)}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">📱 Phone Number</label>
              <input type="number" className="form-control" value={staff_phone_no} onChange={(e) => setS_ph_no(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🏠 Address</label>
              <input type="text" className="form-control" value={staff_Address} onChange={(e) => setS_address(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🎯 Role</label>
              <select className="form-select" value={staff_Role} onChange={(e) => setS_role(e.target.value)}>
              <option value="">Select Role</option>
              <option value="housekeeping">Housekeeping</option>
              <option value="receptionist">Receptionist</option>
              <option value="concierge">Concierge</option>
              <option value="bellboy">Bellboy / Porter</option>
              <option value="waiter">Waiter</option>
              <option value="waitress">Waitress</option>
              <option value="chef">Chef / Cook</option>
              <option value="maintenance">Maintenance Staff</option>
              <option value="security">Security</option>
              <option value="manager">Manager</option>
              <option value="other">Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🕒 Shift Timing</label>
              <select className="form-select" value={staff_Shift} onChange={(e) => setS_shift(e.target.value)}>
                <option value="">Select Shift</option>
                <option value="Morning">Morning (9:00–5:00)</option>
                <option value="Evening">Evening (5:00–1:00)</option>
                <option value="Night">Night (1:00–9:00)</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label text-secondary">🔐 Password</label>
              <input type="password" className="form-control" value={staff_Password} onChange={(e) => setS_password(e.target.value)} />
            </div>

            <div className="col-md-12">
              <button
                className="btn w-100 text-white fw-bold"
                onClick={add_staff}
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
                <i className="bi bi-person-plus-fill me-2"></i>Add Staff
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
