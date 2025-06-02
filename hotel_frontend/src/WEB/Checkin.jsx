import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CheckIn() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    if (userData?.i) {
      setUserId(userData.i);
      fetchBookings(userData.i);
    }
  }, []);

  const fetchBookings = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3007/booking/user/${id}`);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-danger">
        <i className="bi bi-door-open-fill me-2"></i>Your Check-In Details
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center fs-5 text-muted">No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((booking, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div
                className="card shadow-sm border-0"
                style={{
                  borderRadius: "15px",
                  background: "#f8f9fa",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">
                    🏨 Room: {booking.room?.room_number}
                  </h5>
                  <p className="card-text mb-2">
                    <strong>Type:</strong> {booking.room?.room_type}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Arrival:</strong> {booking.arrival.slice(0, 10)}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Departure:</strong> {booking.departure.slice(0, 10)}
                  </p>
                  <p className="card-text mb-2">
                    <strong>No. of Persons:</strong> {booking.no_of_person}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge px-3 py-2 fs-6 ${
                        booking.status === "accepted"
                          ? "bg-success"
                          : booking.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                      style={{
                        borderRadius: "12px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
