import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "./Adminnavbar";

export default function ShowBooking() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3007/booking/all");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3007/booking/update/${id}`, { status }); // <-- Here
      setMessage(`Booking ${status} successfully!`);
      fetchBookings(); // <-- Refresh booking list
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  return (

    <div className="container my-5">
      <Adminnavbar/>

      {message && (
        <div className="alert alert-success text-center fw-semibold">{message}</div>
      )}
<div className="container " style={{ marginLeft: '120px' }}>
  <h1>Show Bookings</h1>
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Room ID</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>No. of Persons</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.User}</td>
                <td>{booking.room}</td>
                <td>{booking.arrival?.slice(0, 10)}</td>
                <td>{booking.departure?.slice(0, 10)}</td>
                <td>{booking.no_of_person}</td>
                <td>
                  <span
                    className={`badge px-3 py-2 rounded-pill text-white fw-semibold ${
                      booking.status === "Accepted"
                        ? "bg-success"
                        : booking.status === "Rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateStatus(booking._id, "Accepted")}
                      disabled={booking.status === "Accepted"}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(booking._id, "Rejected")}
                      disabled={booking.status === "Rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
