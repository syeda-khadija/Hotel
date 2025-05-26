import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import Adminnavbar from './Adminnavbar';

export default function Showdata() {
  const [user_data, setUserdata] = useState([]);
  const [na, setNa] = useState("");
  const [em, setEm] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState(0);
  const [gen,setGen] =useState("");
  const[add,setAdd]=useState("")

  useEffect(() => {
    datalao();
  }, []);

  async function datalao() {
    try {
      const response = await axios.get("http://localhost:3007/Web/user");
      setUserdata(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function remove(id) {
    try {
      if (window.confirm("Are you sure you want to delete this record")) {
        await axios.delete(`http://localhost:3007/Web/user/${id}`);
        datalao();
        toast.info("Record deleted successfully");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  function fetchdata(name, email, ageValue, userId ,gender,address) {
    setNa(name);
    setEm(email);
    setAge(ageValue);
    setId(userId);
    setGen(gender);
    setAdd(address)
  }

  async function Edit() {
    try {
      const res = await axios.put(`http://localhost:3007/Web/user/${id}`, {
        user_name: na,
        user_email: em,
        Age: age,
        Gender:gen,
        Address: add
      });

      datalao();
      toast.success(res.data.msg);

      // Programmatically close modal using Bootstrap's Modal API
      const modalElement = document.getElementById('exampleModal');
      const modalInstance =Modal.getInstance(modalElement) || new Modal(modalElement);
      modalInstance.hide();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Update failed");
    }
  }

  return (
    <div className='container'>
        <Adminnavbar/>
      <ToastContainer />
      <h1>User Data</h1>
<hr />
{user_data.length === 0 ? (
  <div className="alert alert-danger">No user data found.</div>
) : (
  <div className="table-responsive">
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {user_data.map((user) => (
          <tr key={user._id}>
            <td>{user.user_name}</td>
            <td>{user.user_email}</td>
            <td>{user.Age}</td>
            <td>{user.Gender}</td>
            <td>{user.Address}</td>
            <td>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => remove(user._id)}
              >
                <i className="bi bi-trash3"></i> Delete
              </button>
              <button
                className="btn btn-success btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() =>
                  fetchdata(user.user_name, user.user_email, user.Age, user._id,user.Gender,user.Address)
                }
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
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Record</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <input
                type='text'
                className='form-control mt-2'
                placeholder='Name'
                value={na}
                onChange={(e) => setNa(e.target.value)}
              />
              <input
                type='email'
                className='form-control mt-2'
                placeholder='Email'
                value={em}
                onChange={(e) => setEm(e.target.value)}
              />
              <input
                type='number'
                className='form-control mt-2'
                placeholder='Age'
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
                <input
                type='text'
                className='form-control mt-2'
                placeholder='Gender'
                value={gen}
                onChange={(e) => setGen(e.target.value)}
              />
                <input
                type='text'
                className='form-control mt-2'
                placeholder='Address'
                value={add}
                onChange={(e) => setAdd(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={Edit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}