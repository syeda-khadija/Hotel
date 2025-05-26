import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

export default function Staff() {
  const [staff_name, setS_name] = useState("");
  const [staff_email, setS_email] = useState("");
  const [staff_Age, setS_age] = useState(0);
  const [staff_Gender, setS_gender] = useState("");
  const [staff_phone_no, setS_ph_no] = useState(0);
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


  async function add_staff(){
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
          staff_name: staff_name,
          staff_email: staff_email,
          password:staff_Password,
          Age:staff_Age,
          Gender:staff_Gender,
          Phone_no:staff_phone_no,
          Address:staff_Address,
          Role:staff_Role,
          Shift_Timing:staff_Shift,
        });
        toast.success('Registration successful!');
        clearForm();
      }
    }catch (error) {
      if (error?.response?.status === 409) {
        toast.error('Email already exists');
      } else {
        toast.error('Network or server error');
        console.error(error);
      }
    }
  }
   
  return (
<div> <Adminnavbar/>
    <div className="container mt-4">
    <div className="card shadow p-4">
      <h3 className="text-danger mb-3">Add Staff Form</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Staff Name</label>
          <input
            type="text"
            className="form-control"
            value={staff_name}
            onChange={(e) => setS_name(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label>Staff Email</label>
          <input
            type="email"
            className="form-control"
            value={staff_email}
            onChange={(e) => setS_email(e.target.value)}/>
        </div>

        <div className="col-md-6 mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"   
            value={staff_Age}
            onChange={(e) => setS_age(e.target.value)}/>
        </div>

        <div className="col-md-6 mb-3">
          <label>Gender</label>
          <select
            className="form-select"  
            value={staff_Gender}
            onChange={(e) => setS_gender(e.target.value)} >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label>Phone no</label>
          <input
            type="number"
            className="form-control"   
            value={staff_phone_no}
            onChange={(e) => setS_ph_no(e.target.value)}/>
        </div>
        <div className="col-md-6 mb-3">
          <label>Address </label>
          <input
            type="text"
            className="form-control" 
            value={staff_Address}
            onChange={(e) => setS_address(e.target.value)} />
        </div>

           <label>Role</label>
          <select
            className="form-select" 
            value={staff_Role}
            onChange={(e) => setS_role(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Male">house keeping </option>
            <option value="Female">Receptionist</option>
            <option value="Other">Other</option>
          </select>
            
          <label>Staff_shift_Timing</label>
          <select
            className="form-select"  
            value={staff_Shift}
            onChange={(e) => setS_shift(e.target.value)}>
            <option value="">Select timming</option>
            <option value="Morrning">Morrning  9:00 to 5:00 </option>
            <option value="Evening">Evening 5:00 to 1:00</option>
            <option value="Night">Night 1:00 to 9:00</option>
          </select>
          <div className="col-md-12 mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={staff_Password}
              onChange={(e) => setS_password(e.target.value)}
            />
          </div>
          &nbsp; &nbsp;
       
        <div className="col-md-12">
          <button className="btn btn-danger w-100" onClick={add_staff}>
          Add staff
          </button>
        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
  </div>
  )
}
