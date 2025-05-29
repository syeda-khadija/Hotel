import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Booking() {
  const location = useLocation();
  const roomData = location.state?.room;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  const [roomId, setRoomId] = useState(roomData?._id || '');
  const [arrival, setArrival] = useState(formatDate(today));
  const [departure, setDeparture] = useState(formatDate(tomorrow));
  const [noOfPerson, setNoOfPerson] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('User_Data')); // Assuming user object is stored
  if (storedUser?.i) {
    setUserId(storedUser.i);
    setUsername(storedUser.n) // This should be a valid ObjectId like '66573f96b987d1ef73ae43c1'
  }
}, []);


  const handleArrivalChange = (e) => {
    const newArrival = e.target.value;
    setArrival(newArrival);

    if (new Date(departure) <= new Date(newArrival)) {
      const newDeparture = new Date(newArrival);
      newDeparture.setDate(newDeparture.getDate() + 1);
      setDeparture(formatDate(newDeparture));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post('http://localhost:3007/booking/create', {
        guest: userId,
        room: roomId,
        arrival,
        departure,
        no_of_person: noOfPerson,
      });
      setMessage('🎉 Booking successful!');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Something went wrong.';
      setError(`⚠️ ${msg}`);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-lg p-4 mx-auto"
        style={{
          maxWidth: '800px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blue(10px)',
          borderRadius: '15px',
        }}
      >
        <h3 className="text-center mb-4 text-gradient fw-bold">
          <i className="bi bi-calendar-check-fill me-2"></i>
          Book Your Dream Stay
        </h3>

        {roomData && (
          <div className="mb-4 p-3 bg-gradient border-start border-4 border-info rounded shadow-sm">
            <h5 className="text-info"><i className="bi bi-house-door-fill me-2"></i>Room Details</h5>
            <ul className="list-unstyled mb-0">
              <li><strong>Type:</strong> {roomData.room_type}</li>
              <li><strong>Number:</strong> {roomData.room_number}</li>
              <li><strong>Price:</strong> ₹{roomData.price}</li>
              <li>
                <strong>Status:</strong>{' '}
                <span className={`badge ${roomData.is_available ? 'bg-success' : 'bg-danger'}`}>
                  {roomData.is_available ? 'Available' : 'Not Available'}
                </span>
              </li>
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-secondary">👤 User ID</label>
              <input type="text" className="form-control bg-light" value={username} readOnly />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">🏠 Room ID</label>
              <input type="text" className="form-control bg-light" value={roomId} readOnly />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">📅 Arrival Date</label>
              <input
                type="date"
                className="form-control"
                value={arrival}
                min={formatDate(today)}
                onChange={handleArrivalChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">📆 Departure Date</label>
              <input
                type="date"
                className="form-control"
                value={departure}
                min={arrival}
                onChange={(e) => setDeparture(e.target.value)}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label text-secondary">🧍 No. of Persons</label>
              <input
                type="number"
                className="form-control"
                value={noOfPerson}
                min="1"
                onChange={(e) => setNoOfPerson(e.target.value)}
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
  <i className="bi bi-check2-circle me-2"></i>Confirm Booking
</button>

            </div>
          </div>
        </form>

        {message && (
          <div className="alert alert-success mt-4 text-center shadow-sm fw-semibold">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4 text-center shadow-sm fw-semibold">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
