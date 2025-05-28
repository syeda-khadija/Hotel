import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Footer from '../WEB/Footer';

export default function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !feedback) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3007/feedback", {
        name,
        email,
        feedback,
      });
      toast.success(res.data.msg || "Feedback submitted successfully");
      setName('');
      setEmail('');
      setFeedback('');
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <div>
      <Navbar/>
    <div className="container py-5">
    
      <div
        className="card border-0 shadow p-4 mx-auto"
        style={{
          maxWidth: '600px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
        }}
      >
        <h3 className="text-center text-danger fw-bold mb-4">
          <i className="bi bi-chat-dots-fill me-2"></i> Feedback Form
        </h3>

        <label className="form-label text-secondary">👤 Your Name</label>
        <input
          type="text"
          className="form-control bg-light mb-3"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label text-secondary">📧 Your Email</label>
        <input
          type="email"
          className="form-control bg-light mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label text-secondary">📝 Your Feedback</label>
        <textarea
          className="form-control bg-light mb-4"
          placeholder="Share your thoughts..."
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <button
          className="btn w-100 text-white fw-bold"
          onClick={handleSubmit}
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
          <i className="bi bi-send-fill me-2"></i> Submit Feedback
        </button>

        <ToastContainer />
      </div>
    </div>
    <Footer/>
    </div>
  );
}
