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

  const [userId, setuserId] = useState('');
  const [roomId, setRoomId] = useState(roomData?._id || '');
  const [arrival, setArrival] = useState(formatDate(today));
  const [departure, setDeparture] = useState(formatDate(tomorrow));
  const [noOfPerson, setNoOfPerson] = useState(1);
  const [message, setMessage] = useState('');

  const handleArrivalChange = (e) => {
    const newArrival = e.target.value;
    setArrival(newArrival);

    if (new Date(departure) <= new Date(newArrival)) {
      const newDep = new Date(newArrival);
      newDep.setDate(newDep.getDate() + 1);
      setDeparture(formatDate(newDep));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3007/booking/create', {
        user: userId,
        room: roomId,
        arrival,
        departure,
        no_of_person: noOfPerson,
      });
      setMessage('✅ Booking successful!');
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-danger mb-4 text-center">Booking Form</h3>

        {roomData && (
          <div className="mb-4 p-3 bg-light border rounded">
            <h5>Room Details</h5>
            <p><strong>Type:</strong> {roomData.room_type}</p>
            <p><strong>Number:</strong> {roomData.room_number}</p>
            <p><strong>Price:</strong> ₹{roomData.price}</p>
            <p><strong>Status:</strong> {roomData.is_available ? 'Available' : 'Not Available'}</p>
          </div>
        )}
    <form onSubmit={handleSubmit}>
  <div className="row">
    <div className="col-md-6 mb-3">
      <label>User ID</label>
      <input
        type="text"
        className="form-control"
        value={userId}
        readOnly
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Room ID</label>
      <input
        type="text"
        className="form-control"
        value={roomId}
        readOnly
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Arrival Date</label>
      <input
        type="date"
        className="form-control"
        value={arrival}
        min={formatDate(today)}
        onChange={handleArrivalChange}
        required
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Departure Date</label>
      <input
        type="date"
        className="form-control"
        value={departure}
        min={arrival}
        onChange={(e) => setDeparture(e.target.value)}
        required
      />
    </div>

    <div className="col-md-12 mb-3">
      <label>No. of Persons</label>
      <input
        type="number"
        className="form-control"
        value={noOfPerson}
        min="1"
        onChange={(e) => setNoOfPerson(e.target.value)}
        required
      />
    </div>

    <div className="col-md-12">
      <button className="btn btn-danger w-100" type="submit">
        Book Now
      </button>
    </div>
  </div>
</form>

        {message && (
          <div className="mt-3 alert alert-info text-center">{message}</div>
        )}
      </div>
    </div>
  );
}