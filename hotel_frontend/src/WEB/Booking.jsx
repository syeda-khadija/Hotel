import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const roomData = location.state?.room;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState(roomData?._id || "");
  const [arrival, setArrival] = useState(formatDate(today));
  const [departure, setDeparture] = useState(formatDate(tomorrow));
  const [noOfPerson, setNoOfPerson] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUserId("user123"); // Replace with actual user logic
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
    setMessage("");
    setError("");

    try {
      await axios.post("http://localhost:3007/booking/create", {
        user: userId,
        room: roomId,
        arrival,
        departure,
        no_of_person: noOfPerson,
      });
      setMessage("🎉 Booking successful!");
    } catch (err) {
      const msg = err.response?.data?.msg || "Something went wrong.";
      setError(`⚠️ ${msg}`);
    }
  };

  return (
    <div className="container my-5">
      <div
        className="row shadow-lg rounded overflow-hidden"
        style={{ minHeight: "550px" }}
      >
        {/* Left: Room Details */}
        <div
          className="col-lg-6 d-flex flex-column justify-content-center"
          style={{
            backgroundImage:
              'url("https://assets.minorhotels.com/image/upload/q_auto,f_auto,c_limit,w_1045/media/minor/anantara/images/anantara-jewel-bagh-jaipur-hotel/mhg/01_hotel-teaser/anantara_jewel-bagh_jaipur_hotel_teaser_01_880x620.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            padding: "40px 30px",
            position: "relative",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              padding: "30px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h2 className="mb-4 fw-bold text-center">
              <i className="bi bi-door-open-fill me-2"></i>Room Information
            </h2>

            {roomData ? (
              <div className="fs-5" style={{ lineHeight: "2", fontWeight: "500" }}>
                <p>
                  <i className="bi bi-tag-fill me-2 text-warning"></i>
                  <strong>Type:</strong> {roomData.room_type}
                </p>
                <p>
                  <i className="bi bi-hash me-2 text-info"></i>
                  <strong>Room No:</strong> {roomData.room_number}
                </p>
                <p>
                  <i className="bi bi-cash-stack me-2 text-success"></i>
                  <strong>Price:</strong> ₹{roomData.price}
                </p>
                <p>
                  <i className="bi bi-check-circle-fill me-2 text-light"></i>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge px-3 py-2 fs-6 ${
                      roomData.is_available ? "bg-success" : "bg-danger"
                    }`}
                    style={{ borderRadius: "12px" }}
                  >
                    {roomData.is_available ? "Available" : "Not Available"}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-center">No room data available.</p>
            )}
          </div>
        </div>

        {/* Right: Booking Form */}
        <div
          className="col-lg-6 bg-white p-5 d-flex flex-column justify-content-center"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        >
          <h3
            className="text-center mb-4 fw-bold"
            style={{ color: "#d32f2f", letterSpacing: "1.1px" }}
          >
            <i className="bi bi-calendar-check-fill me-2"></i>Book Your Stay
          </h3>

          <form onSubmit={handleSubmit} noValidate>
            {[{ label: "👤 User ID", value: userId, id: "userId" },
              { label: "🏠 Room ID", value: roomId, id: "roomId" }
            ].map(({ label, value, id }) => (
              <div className="mb-4" key={id}>
                <label className="form-label text-secondary" htmlFor={id}>
                  {label}
                </label>
                <input
                  id={id}
                  type="text"
                  className="form-control bg-light"
                  value={value}
                  readOnly
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="form-label text-secondary" htmlFor="arrivalDate">
                📅 Arrival Date
              </label>
              <input
                id="arrivalDate"
                type="date"
                className="form-control"
                value={arrival}
                min={formatDate(today)}
                onChange={handleArrivalChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary" htmlFor="departureDate">
                📆 Departure Date
              </label>
              <input
                id="departureDate"
                type="date"
                className="form-control"
                value={departure}
                min={arrival}
                onChange={(e) => setDeparture(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary" htmlFor="noOfPerson">
                🧍 No. of Persons
              </label>
              <input
                id="noOfPerson"
                type="number"
                className="form-control"
                value={noOfPerson}
                min="1"
                onChange={(e) => setNoOfPerson(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white fw-bold"
              style={{
                background: "linear-gradient(to right, #d32f2f, #880e4f)",
                padding: "14px",
                fontSize: "1.15rem",
                borderRadius: "10px",
                border: "none",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 10px rgba(211, 47, 47, 0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(211, 47, 47, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(211, 47, 47, 0.6)";
              }}
            >
              <i className="bi bi-check2-circle me-2"></i>Confirm Booking
            </button>
          </form>

          {message && (
            <div
              className="alert alert-success mt-4 text-center shadow-sm fw-semibold"
              role="alert"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger mt-4 text-center shadow-sm fw-semibold"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
