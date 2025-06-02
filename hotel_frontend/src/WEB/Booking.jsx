import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("User_Data");
    if (userString) {
      const data = JSON.parse(userString);
      setUserId(data.i || "");
      setUserName(data.n || "");
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
    setMessage("");
    setError("");

    try {
      await axios.post("http://localhost:3007/booking/create", {
        User: userId,
        room: roomId,
        arrival,
        departure,
        no_of_person: noOfPerson,
      });

      setMessage("🎉 Booking successful!");
      setTimeout(() => navigate("/checkin"), 1500);
    } catch (err) {
      const msg = err.response?.data?.msg || "Something went wrong.";
      setError(`⚠️ ${msg}`);
    }
  };

  return (
    <div
      className="container my-5"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e1e5f2 100%)",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      }}
    >
      <div className="row g-0 rounded overflow-hidden shadow-sm">
        {/* Left Panel */}
        <aside
          className="col-lg-6 d-flex flex-column justify-content-center px-5"
          style={{
            backgroundImage: `url("https://assets.minorhotels.com/image/upload/q_auto,f_auto,c_limit,w_1045/media/minor/anantara/images/anantara-jewel-bagh-jaipur-hotel/mhg/01_hotel-teaser/anantara_jewel_bagh_jaipur_hotel_teaser_01_880x620.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "560px",
            color: "white",
            position: "relative",
            borderRadius: "12px 0 0 12px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
              borderRadius: "12px 0 0 12px",
            }}
          />
          <div style={{ position: "relative", zIndex: 2, paddingTop: "40px" }}>
            <h2
              className="mb-4 fw-bold"
              style={{ letterSpacing: "1.5px", fontSize: "2.3rem", color: "white" }}
            >
              Room Details
            </h2>
            {roomData ? (
              <ul className="list-unstyled fs-5" style={{ lineHeight: "2.4", fontWeight: "600" }}>
                <li>
                  <strong>Type:</strong> {roomData.room_type}
                </li>
                <li>
                  <strong>Room Number:</strong> {roomData.room_number}
                </li>
                <li>
                  <strong>Price:</strong>{" "}
                  <span style={{ color: "#ff6b6b", fontWeight: "700" }}>
                    Pkr {roomData.price}
                  </span>
                </li>
                <li>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge px-3 py-2 fs-6 ${
                      roomData.is_available ? "bg-success" : "bg-danger"
                    }`}
                    style={{
                      borderRadius: "14px",
                      fontWeight: "600",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {roomData.is_available ? "Available" : "Not Available"}
                  </span>
                </li>
              </ul>
            ) : (
              <p>No room data available.</p>
            )}
          </div>
        </aside>

        {/* Right Panel */}
        <section
          className="col-lg-6 bg-white p-5 d-flex flex-column justify-content-center"
          style={{ borderRadius: "0 12px 12px 0" }}
        >
          <h3
            className="text-center mb-5 fw-bold"
            style={{
              color: "#d32f2f",
              letterSpacing: "1.2px",
              fontSize: "2rem",
            }}
          >
            <i className="bi bi-calendar-check-fill me-2"></i>Book Your Stay
          </h3>

          <form onSubmit={handleSubmit} noValidate style={{ maxWidth: "450px", margin: "0 auto" }}>
            {[{
              label: "👤 User Name",
              value: userName,
              readOnly: true,
              type: "text",
              id: "userName",
            }, {
              label: "🏠 Room ID",
              value: roomId,
              readOnly: true,
              type: "text",
              id: "roomId",
            }].map(({ label, value, readOnly, type, id }) => (
              <div className="mb-4" key={id}>
                <label className="form-label text-secondary fw-semibold" htmlFor={id}>
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  className="form-control bg-light"
                  value={value}
                  readOnly={readOnly}
                  style={{
                    borderRadius: "10px",
                    border: "1.8px solid #ddd",
                    padding: "12px 14px",
                    fontSize: "1rem",
                  }}
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="form-label text-secondary fw-semibold" htmlFor="arrivalDate">
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
                style={{
                  borderRadius: "10px",
                  border: "1.8px solid #ddd",
                  padding: "12px 14px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary fw-semibold" htmlFor="departureDate">
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
                style={{
                  borderRadius: "10px",
                  border: "1.8px solid #ddd",
                  padding: "12px 14px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div className="mb-5">
              <label className="form-label text-secondary fw-semibold" htmlFor="noOfPerson">
                🧍 No. of Persons
              </label>
              <input
                id="noOfPerson"
                type="number"
                className="form-control"
                value={noOfPerson}
                min="1"
                onChange={(e) => setNoOfPerson(Number(e.target.value))}
                required
                style={{
                  borderRadius: "10px",
                  border: "1.8px solid #ddd",
                  padding: "12px 14px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white fw-bold"
              style={{
                background: "linear-gradient(90deg, #d32f2f 0%, #880e4f 100%)",
                padding: "15px",
                fontSize: "1.2rem",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 6px 18px rgba(211, 47, 47, 0.7)",
              }}
              disabled={!roomData?.is_available}
              title={roomData?.is_available ? "Confirm Booking" : "Room Not Available"}
            >
              <i className="bi bi-check2-circle me-2"></i>Confirm Booking
            </button>
          </form>

          {message && (
            <div
              className="alert alert-success mt-5 text-center shadow-sm fw-semibold"
              role="alert"
              style={{ fontSize: "1.1rem" }}
            >
              {message}
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger mt-5 text-center shadow-sm fw-semibold"
              role="alert"
              style={{ fontSize: "1.1rem" }}
            >
              {error}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
