import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adminnavbar from './Adminnavbar';

export default function ShowAbout() {
  const [aboutData, setAboutData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    mission: '',
    vision: '',
  });
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    fetchAboutDetails();
  }, []);

  const fetchAboutDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3007/about/all');
      setAboutData(res.data);
    } catch (err) {
      console.log(err.message)
      toast.error('⚠️ Failed to load About Us information.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      await axios.delete(`http://localhost:3007/about/${id}`);
      toast.success('Entry deleted successfully');
      fetchAboutDetails();
    } catch (err) {
      toast.error('Failed to delete entry');
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item._id);
    setFormData({
      heading: item.heading,
      description: item.description,
      mission: item.mission,
      vision: item.vision,
    });
    setPicture(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('heading', formData.heading);
      data.append('description', formData.description);
      data.append('mission', formData.mission);
      data.append('vision', formData.vision);
      if (picture) {
        data.append('picture', picture);
      }

      await axios.put(`http://localhost:3007/about/${editItem}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Updated successfully!');
      setEditItem(null);
      setFormData({ heading: '', description: '', mission: '', vision: '' });
      setPicture(null);
      fetchAboutDetails();
    } catch (err) {
      toast.error('Update failed!');
    }
  };

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Adminnavbar />
      <ToastContainer position="top-right" />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card shadow p-4"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '15px',
                border: '1px solid #ddd',
              }}
            >
              <h3 className="text-center text-danger fw-bold mb-4">
                <i className="bi bi-info-circle-fill me-2"></i> About Us Information
              </h3>

              {aboutData.length === 0 ? (
                <div className="alert alert-secondary text-center">
                  <i className="bi bi-exclamation-circle me-2"></i>No About Us details found.
                </div>
              ) : (
                aboutData.map((item) => (
                  <div key={item._id} className="mb-4 p-3 rounded bg-white shadow-sm">
                    {editItem === item._id ? (
                      <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <input className="form-control mb-2" name="heading" value={formData.heading} onChange={handleChange} />
                        <textarea className="form-control mb-2" name="description" value={formData.description} onChange={handleChange} />
                        <textarea className="form-control mb-2" name="mission" value={formData.mission} onChange={handleChange} />
                        <textarea className="form-control mb-2" name="vision" value={formData.vision} onChange={handleChange} />
                        <input className="form-control mb-2" type="file" accept="image/*" onChange={handleFileChange} />

                        <div className="text-center">
                          <button className="btn btn-success me-2" type="submit">
                            Save
                          </button>
                          <button className="btn btn-secondary" onClick={() => setEditItem(null)} type="button">
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        {item.picture && (
                          <div className="text-center mb-3">
                            <img
                              src={`http://localhost:3007/uploads/${item.picture}`}
                              alt="about"
                              className="img-fluid"
                              style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }}
                            />
                          </div>
                        )}
                        <h5 className="text-danger fw-bold">📝 {item.heading}</h5>
                        <p>{item.description}</p>
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="fw-bold">🎯 Mission</h6>
                            <p>{item.mission}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="fw-bold">🌟 Vision</h6>
                            <p>{item.vision}</p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(item)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>
                            🗑️ Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}