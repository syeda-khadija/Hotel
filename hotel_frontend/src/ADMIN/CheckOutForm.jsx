// CheckOutForm.js
import React from "react";

export default function CheckOutForm({ booking, onClose, onConfirm }) {
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Confirm Checkout</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to check out Room ID{" "}
              <strong>{booking.room}</strong> for User ID{" "}
              <strong>{booking.User}</strong>?
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={onConfirm}>
              Confirm Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
