import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function Resetpassword() {
    const [pswd, setPswd] = useState("");
    const [cpswd, setCpswd] = useState("");
    const { token } = useParams();
let nav = useNavigate();
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
            const response = await axios.post(`http://localhost:3007/${token}`, { password: pswd });
            toast.success(response.data.msg || "Password reset successful");
            setPswd("");
            setCpswd("");
            nav("/log_exb");
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Something went wrong";
            toast.error(errorMsg);
        }
    }
  return (
    <div>
          <div className='container my-5' style={{ maxWidth: '500px' }}>
                <h2 className='mb-4'>Reset Your Password</h2>
                
                <label>New Password</label>
                <input
                    type="password"
                    placeholder="Enter new password"
                    className='form-control my-2'
                    value={pswd}
                    onChange={(e) => setPswd(e.target.value)}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm password"
                    className='form-control my-2'
                    value={cpswd}
                    onChange={(e) => setCpswd(e.target.value)}
                />

                <button className='btn btn-primary my-2' onClick={handleResetPassword}>
                    Reset Password
                </button>

                <ToastContainer />
            </div>
            {/* <Footer /> */}
    </div>
  )
}
