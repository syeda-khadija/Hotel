import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:3007/all');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Bookings</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Guest ID</th>
            <th>Room ID</th>
            <th>Arrival</th>
            <th>Departure</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.guest}</td>
              <td>{booking.room}</td>
              <td>{booking.arrival}</td>
              <td>{booking.departure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
