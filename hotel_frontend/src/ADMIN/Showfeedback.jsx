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
    <div>
      <Adminnavbar />
      <ToastContainer position="top-right" />

      <div style={{ backgroundColor: '#f8f9fa', paddingTop: '30px', minHeight: '100vh' }}>
        <div className="w-100 px-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Heading */}
        
            
         

          <hr />

          {feedbacks.length === 0 ? (
            <div className="alert alert-danger text-center">No feedback available.</div>
          ) : (
            <div className="container" style={{ marginLeft: '120px' }}>
              <h1 > Show User Feedback</h1>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>👤 Name</th>
                      <th>📧 Email</th>
                      <th>📝 Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((f) => (
                      <tr key={f._id}>
                        <td>{f.name}</td>
                        <td className="text-primary">{f.email}</td>
                        <td>{f.feedback}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
