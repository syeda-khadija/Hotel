import axios from 'axios';
import Footer from './Footer';
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 Login status

  useEffect(() => {
    fetchRooms();

    // 🔐 Check login status
    const storedUser = JSON.parse(localStorage.getItem('User_Data'));
    if (storedUser && storedUser._id) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:3007/room/all');
      setRooms(res.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>All Rooms</h2>
        <div className="row">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div className="col-md-4 mb-4" key={room._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:3007/uploads/${room.image}`}
                    onError={(e) => { e.target.src = "/default-room.jpg"; }}
                    className="card-img-top"
                    alt="Room"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{room.room_type}</h5>
                    <p className="card-text">{room.description}</p>
                    <p><strong>Beds:</strong> {room.no_of_bed}</p>
                    <p><strong>Room No:</strong> {room.room_number}</p>
                    <p><strong>Price:</strong> Rs. {room.price}</p>
                    <p><strong>Status:</strong> {room.is_available ? 'Available' : 'Not Available'}</p>

                    {room.is_available && isLoggedIn ? (
                      <Link to="/book" state={{ room }} className="mt-auto">
                        <button className="btn btn-danger w-100">Book Now</button>
                      </Link>
                    ) : (
                      <button className="btn btn-secondary w-100 mt-auto" disabled>
                        {room.is_available
                          ? isLoggedIn
                            ? 'Book Now'
                            : 'Login to Book'
                          : 'Not Available'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning">No room data found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
