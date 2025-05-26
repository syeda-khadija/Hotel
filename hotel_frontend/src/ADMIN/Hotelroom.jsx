import React, { useState } from 'react';
import Adminnavbar from './Adminnavbar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

// Helper function to get floor prefix
function getFloorPrefix(floorName) {
  switch (floorName) {
    case 'Ground': return 'G';
    case '1st': return 'F';
    case '2nd': return 'S';
    case '3rd': return 'T';
    case '4th': return 'FR';
    default: return '';
  }
}

export default function Hotelroom() {
  const [roomtype, setRtype] = useState('');
  const [description, setDes] = useState('');
  const [room_no, setRoom_no] = useState('');
  const [no_bed, setNo_bed] = useState(1);
  const [is_available, setIs_available] = useState('');
  const [floor, setFloor] = useState('');
  const [price, setPrice] = useState(10000);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // NEW
  

  function clearForm() {
    setRtype('');
    setDes('');
    setRoom_no('');
    setNo_bed(1);
    setIs_available('');
    setFloor('');
    setPrice(10000);
    setImage(null);
    setPreview(null);
  }

  async function addroom() {
    try {
      if (!roomtype || !description || !room_no || !floor || !is_available || !image) {
        toast.error('All fields are required');
        return;
      }

      if (no_bed < 1 || no_bed > 5) {
        toast.error('No. of beds must be between 1 and 5');
        return;
      }

      if (price < 10000) {
        toast.error('Price must be at least 10000');
        return;
      }

      const formData = new FormData();
      formData.append('room_type', roomtype);
      formData.append('description', description);
      formData.append('room_number', room_no);
      formData.append('no_of_bed', no_bed);
      formData.append('is_available', is_available);
      formData.append('floor_no', floor);
      formData.append('price', price);
      formData.append('image', image);

      await axios.post('http://localhost:3007/room/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      toast.success('Room added successfully!');
      clearForm();
    } catch (error) {
      toast.error('Network or server error');
      console.error(error.message);
    }
  }

  return (
    <div>
      <Adminnavbar />
      <div className="card shadow p-4">
        <h3 className="text-primary mb-3">Add Room</h3>
        <div className="row">

          {/* Room Type */}
          <div className="col-md-6 mb-3">
            <label>Room Type</label>
            <select
              className="form-control"
              value={roomtype}
              onChange={(e) => setRtype(e.target.value)}
            >
              <option value="">Select room type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              <option value="Deluxe">Deluxe</option>
            </select>
          </div>

          {/* Description */}
          <div className="col-md-6 mb-3">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDes(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          {/* Floor */}
          <div className="col-md-6 mb-3">
            <label>Floor</label>
            <select
              className="form-control"
              value={floor}
              onChange={(e) => {
                const selectedFloor = e.target.value;
                setFloor(selectedFloor);
                const prefix = getFloorPrefix(selectedFloor);
                if (!room_no || !room_no.startsWith(prefix)) {
                  setRoom_no(prefix);
                }
              }}
            >
              <option value="">Select floor</option>
              <option value="Ground">Ground</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>

          {/* Room Number */}
          <div className="col-md-6 mb-3">
            <label>Room Number</label>
            <input
              type="text"
              className="form-control"
              value={room_no}
              onChange={(e) => setRoom_no(e.target.value)}
              placeholder="Enter room number"
            />
          </div>

          {/* Number of Beds */}
          <div className="col-md-6 mb-3">
            <label>No. of Beds (1-5)</label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="5"
              value={no_bed}
              onChange={(e) => setNo_bed(Number(e.target.value))}
              placeholder="Enter number of beds"
            />
          </div>

          {/* Availability */}
          <div className="col-md-6 mb-3">
            <label>Is Available</label>
            <select
              className="form-control"
              value={is_available}
              onChange={(e) => setIs_available(e.target.value)}
            >
              <option value="">Select availability</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Price */}
          <div className="col-md-6 mb-3">
            <label>Price (min 10000)</label>
            <input
              type="number"
              className="form-control"
              min="10000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter price"
            />
          </div>

          {/* Room Image */}
          <div className="col-md-6 mb-4">
  <label>Room Image</label>
  <input
    type="file"
    className="form-control"
    onChange={(e) => {
      const file = e.target.files[0];
      setImage(file);
      setPreview(file ? URL.createObjectURL(file) : null);
    }}
  />
  {preview && (
    <div className="mt-3">
      <label>Image Preview:</label>
      <img
        src={preview}
        alt="Room Preview"
        className="img-fluid rounded"
        style={{ maxHeight: '200px' }}
      />
    </div>
  )}
</div>

          {/* Submit Button */}
          <div className="col-md-12">
            <button className="btn btn-primary w-100" onClick={addroom}>
              Add Room
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
