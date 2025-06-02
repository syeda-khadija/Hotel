import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear admin session
    localStorage.removeItem("User_Data");

    // Show toast
    toast.success("Admin logged out successfully!");

    // Redirect to admin login
    setTimeout(() => {
      navigate("/admin"); // Change path if your admin login route is different
    }, 1000);
  }, [navigate]);

  return <ToastContainer />;
}
