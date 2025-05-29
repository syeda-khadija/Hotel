import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminnavbar from './Adminnavbar';

export default function ShowFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    try {
      const res = await axios.get("http://localhost:3007/feedback/all");
      setFeedbacks(res.data);
    } catch (err) {
      toast.error("⚠️ Failed to load feedback");
    }
  }

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Adminnavbar />
      <ToastContainer position="top-right" />

      <div className="container py-5 d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{
            maxWidth: '900px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '15px',
            border: '1px solid #ddd',
          }}
        >
          <h3 className="text-center text-danger fw-bold mb-4">
            <i className="bi bi-chat-left-text-fill me-2"></i> User Feedback
          </h3>

          {feedbacks.length === 0 ? (
            <div className="alert alert-secondary text-center">
              <i className="bi bi-info-circle-fill me-2"></i>No feedback available yet.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle" style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(to right, #ff0000, #000000)', color: '#fff', borderRadius: '10px' }}>
                    <th className="text-center py-3" style={{ borderTopLeftRadius: '10px' }}>👤 Name</th>
                    <th className="text-center py-3">📧 Email</th>
                    <th className="text-center py-3" style={{ borderTopRightRadius: '10px' }}>📝 Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((f) => (
                    <tr
                      key={f._id}
                      style={{
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        borderRadius: '10px',
                        marginBottom: '12px',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <td className="text-center py-3">{f.name}</td>
                      <td className="text-center py-3 text-primary">{f.email}</td>
                      <td className="py-3">{f.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}