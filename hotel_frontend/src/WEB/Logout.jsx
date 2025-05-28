import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session
    localStorage.removeItem("User_Data");
    
    // Show success toast
    toast.success("Logged out successfully");

    // Redirect to login after short delay
    setTimeout(() => {
      navigate("/login"); // Change this to your login route if different
    }, 1000);
  }, [navigate]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
