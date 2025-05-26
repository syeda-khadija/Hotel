import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Modal } from 'bootstrap';
import Adminnavbar from './Adminnavbar';

export default function ShowRooms() {
  const [rooms, setRooms] = useState([]);
  const [id, setId] = useState("");
  const [room_type, setRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [room_number, setRoomNumber] = useState("");
  const [no_of_bed, setBeds] = useState(1);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [is_available, setAvailable] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      const response = await axios.get("http://localhost:3007/room/all");
      setRooms(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function remove(id) {
    try {
      if (window.confirm("Are you sure you want to delete this room?")) {
        await axios.delete(`http://localhost:3007/room/delete/${id}`);
        fetchRooms();
        toast.info("Room deleted successfully");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  }

  function loadRoomData(room) {
    setId(room._id);
    setRoomType(room.room_type);
    setDescription(room.description);
    setRoomNumber(room.room_number);
    setBeds(room.no_of_bed);
    setPrice(room.price);
    setImage(room.image || "");
    setAvailable(room.is_available);
  }

  async function updateRoom() {
    try {
      const res = await axios.put(`http://localhost:3007/room/update/${id}`, {
        room_type,
        description,
        room_number,
        no_of_bed,
        price,
        image,
        is_available
      });
  
      fetchRooms();
      toast.success(res.data.msg);
  
      const modalElement = document.getElementById('roomModal');
      const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
      modalInstance.hide();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Update failed");
    }
  }
  
  return (
    <div className='container'>
      <Adminnavbar />
      <ToastContainer />
      <h1>Room Data</h1>
      <hr />

      {rooms.length === 0 ? (
        <div className="alert alert-danger">No room data found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Room Type</th>
                <th>Description</th>
                <th>Room Number</th>
                <th>Beds</th>
                <th>Price</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.room_type}</td>
                  <td>{room.description}</td>
                  <td>{room.room_number}</td>
                  <td>{room.no_of_bed}</td>
                  <td>{room.price}</td>
                  <td>{room.is_available ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => remove(room._id)}>
                      <i className="bi bi-trash3"></i> Delete
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#roomModal"
                      onClick={() => loadRoomData(room)}
                    >
                      <i className="bi bi-pen"></i> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <div className="modal fade" id="roomModal" tabIndex="-1" aria-labelledby="roomModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="roomModalLabel">Edit Room</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <label>Room Type</label>
              <input type="text" className="form-control mt-2" placeholder="Room Type" value={room_type} onChange={(e) => setRoomType(e.target.value)} />
              <label>Description</label>
              <textarea className="form-control mt-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <label>Room No:</label>
              <input type="text" className="form-control mt-2" placeholder="Room Number" value={room_number} onChange={(e) => setRoomNumber(e.target.value)} />
              <label>No_of_Bed</label>
              <input type="number" className="form-control mt-2" placeholder="No. of Beds" value={no_of_bed} onChange={(e) => setBeds(Number(e.target.value))} />
              <label>Price</label>
              <input type="number" className="form-control mt-2" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
              <label>Image</label>
              <input type="text" className="form-control mt-2" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
              <label>Is_Avaliable</label>
              <select className="form-control mt-2" value={is_available} onChange={(e) => setAvailable(e.target.value === "true")}>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updateRoom}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
