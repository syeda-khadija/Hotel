import React, { useState } from 'react';
import Adminnavbar from './Adminnavbar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function AboutUs() {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    mission: '',
    vision: '',
  });

  const [picture, setPicture] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { heading, description, mission, vision } = formData;
    if (!heading || !description || !mission || !vision || !picture) {
      toast.error('All fields including picture are required!');
      return;
    }

    const form = new FormData();
    form.append('heading', heading);
    form.append('description', description);
    form.append('mission', mission);
    form.append('vision', vision);
    form.append('picture', picture);

    try {
      await axios.post('http://localhost:3007/about', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('About Us details submitted successfully!');
      setFormData({ heading: '', description: '', mission: '', vision: '' });
      setPicture(null);
    } catch (err) {
      console.error(err);
      toast.error('Submission failed. Please try again.');
    }
  };

  return (
    <div>
      <Adminnavbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', background: '#f8f9fa' }}
      >
        <div
          className="card border-0 shadow-lg p-4"
          style={{
            width: '100%',
            maxWidth: '900px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
          }}
        >
          <h3 className="text-center mb-4 fw-bold text-gradient">
            <i className="bi bi-building me-2"></i>About Us Form
          </h3>

          <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
            <div className="col-12">
              <label className="form-label text-secondary">📝 Heading</label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter heading"
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary">📃 Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🎯 Mission</label>
              <textarea
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Enter mission statement"
                required
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🌟 Vision</label>
              <textarea
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Enter vision statement"
                required
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label text-secondary">🖼️ Upload Picture</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn w-100 text-white fw-bold"
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
                <i className="bi bi-check-circle-fill me-2"></i>Submit About Info
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
