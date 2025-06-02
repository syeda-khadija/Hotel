import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "./Adminnavbar";

export default function Checkout() {
  const [todayBookings, setTodayBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTodayBookings();
  }, []);

  const fetchTodayBookings = async () => {
    try {
      // Make sure your backend populates 'User' and 'room' fields
      const res = await axios.get("http://localhost:3007/booking/all");

      const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

      // Filter for bookings with departure date = today and status = Accepted
      const filtered = res.data.filter((booking) => {
        const departureDate = booking.departure?.slice(0, 10);
        return departureDate === today && booking.status === "Accepted";
      });

      setTodayBookings(filtered);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleCheckout = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3007/booking/booking/checkout/${bookingId}`, {
        status: "Checked Out",
      });

      setMessage("Guest checked out successfully.");
      fetchTodayBookings(); // Refresh the list after checkout
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(
        "Error during checkout:",
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="container my-5">
      <Adminnavbar />

      {message && (
        <div className="alert alert-success text-center fw-semibold">
          {message}
        </div>
      )}

      <div className="container" style={{ marginLeft: "120px" }}>
        <h1>Today's Checkouts</h1>
        <div className="table-responsive shadow-sm">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Room Type</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>No. of Persons</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {todayBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No checkouts for today.
                  </td>
                </tr>
              )}

              {todayBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.User?.user_name || "N/A"}</td>
                  <td>{booking.room?.room_type || "N/A"}</td>
                  <td>{booking.arrival?.slice(0, 10)}</td>
                  <td>{booking.departure?.slice(0, 10)}</td>
                  <td>{booking.no_of_person}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleCheckout(booking._id)}
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
