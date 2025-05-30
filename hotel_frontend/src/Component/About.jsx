import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../WEB/Footer';
import Navbar from './Navbar'

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get('http://localhost:3007/about/all');
        if (res.data && res.data.length > 0) {
          setAbout(res.data[0]);
        }
      } catch (error) {
        console.error('Error fetching About Us:', error);
      }
    };

    fetchAbout();
  }, []);

  return (
    <div>
      <Navbar/>
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="text-center mb-3">
          <h2
            style={{
              fontWeight: '800',
              fontSize: '2.2rem',
              color: '#222',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.3rem',
            }}
          >
            <i className="bi bi-star-fill text-warning me-2"></i>
            {about?.heading || 'About Us'}
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}
          >
            {about?.description || 'Loading company story...'}
          </p>
        </div>

        {about?.picture && (
          <div className="text-center mb-4">
            <img
              src={`http://localhost:3007/uploads/${about.picture}`}
              alt="About Us"
              style={{
                width: '100%',
                maxWidth: '700px',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
              }}
              className="hover-zoom"
            />
          </div>
        )}

        <div
          className="card shadow-sm mx-auto p-4"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '900px',
            border: 'none',
          }}
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <div
                className="h-100 p-3 bg-light border-start border-4 border-danger rounded"
              >
                <h5 className="text-danger fw-bold mb-2">
                  🎯 Our Mission
                </h5>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {about?.mission}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div
                className="h-100 p-3 bg-light border-start border-4 border-success rounded"
              >
                <h5 className="text-success fw-bold mb-2">
                  🌟 Our Vision
                </h5>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {about?.vision}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!about && (
          <div className="alert alert-warning text-center mt-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>No About Us information available.
          </div>
        )}
      </div>

      <Footer />
    </div></div>
  );
}
