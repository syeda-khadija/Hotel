import React, { useEffect, useState } from 'react'
import Adminnavbar from './Adminnavbar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Modal } from 'bootstrap';

export default function Showstaff() {
  const [staff_data, setstaffdata] = useState([]);
  const [na, setNa] = useState("");
  const [em, setEm] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState(0);
  const [gen,setGen] =useState("");
  const [phn,setphn] =useState(0);
  const[add,setAdd]=useState("")
  const [Role,setrole] =useState("");
  const [Shift_t,setshft_t] =useState("");

  useEffect(() => {
    datalao();
  }, []);

  async function datalao() {
    try {
      const response = await axios.get("http://localhost:3007/staff/staff");
      setstaffdata(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  async function remove(id) {
    try {
      if (window.confirm("Are you sure you want to delete this record")) {
        await axios.delete(`http://localhost:3007/staff/staff/${id}`);
        datalao();
        toast.info("Record deleted successfully");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }
  function fetchdata(staff_name, staff_email, ageValue, staffId ,Gender,Phone_no,Address,Role,Shift_Timing) {
    setNa(staff_name);
    setEm(staff_email);
    setId(staffId);
    setAge(ageValue);
    setId(staffId);
    setGen(Gender);
    setphn(Phone_no);
    setAdd(Address);
    setrole(Role);
    setshft_t(Shift_Timing);
  }
  
  async function Edit() {
    try {
      const res = await axios.put(`http://localhost:3007/staff/staff/${id}`, {
        staff_name: na,
        staff_email: em,
        Age: age,
        Gender:gen,
        Phone_no:phn,
        Address: add,
        Role: Role,
        Shift_Timing:Shift_t
      });
      datalao();
      toast.success(res.data.msg);

       // Programmatically close modal using Bootstrap's Modal API
       const modalElement= document.getElementById('exampleModal');
       const modalInstance =Modal.getInstance(modalElement) || new Modal(modalElement);
       modalInstance.hide();
     } catch (error) {
       toast.error(error.response?.data?.msg || "Update failed");
     }
   }
  return (
    <div className='container'>
    <Adminnavbar/>
  <ToastContainer/>
  <h1>Staff Data</h1>
<hr />
{staff_data.length === 0 ? (
<div className="alert alert-danger">No staff data found.</div>
) : (
<div className="table-responsive">
<table className="table table-bordered table-striped">
  <thead className="table-dark">
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Phone_no</th>
      <th>Address</th>
      <th>Role</th>
      <th>Shift_Timing</th>
       <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {staff_data.map((staff) => (
      <tr key={staff._id}>
        <td>{staff.staff_name}</td>
        <td>{staff.staff_email}</td>
        <td>{staff.Age}</td>
        <td>{staff.Gender}</td>
        <td>{staff.Phone_no}</td>
        <td>{staff.Address}</td>
        <td>{staff.Role}</td>
        <td>{staff.Shift_Timing}</td>

        <td>
          <button
            className="btn btn-danger btn-sm me-2"
            onClick={() => remove(staff._id)}
          >
            <i className="bi bi-trash3"></i> Delete
          </button>
          <button
            className="btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              fetchdata(staff.staff_name, 
                staff.staff_email, 
                staff.Age, 
                staff._id,
                staff.Gender,
                staff.Phone_no,
                staff.Address,
                staff.Role,
                staff.Shift_Timing
            )
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
                type='number'
                className='form-control mt-2'
                placeholder='Age'
                value={phn}
                onChange={(e) => setphn(Number(e.target.value))}
              />
                <input
                type='text'
                className='form-control mt-2'
                placeholder='Address'
                value={add}
                onChange={(e) => setAdd(e.target.value)}
              />
                <input
                type='text'
                className='form-control mt-2'
                placeholder='Address'
                value={Role}
                onChange={(e) => setrole(e.target.value)}
              />
                <input
                type='text'
                className='form-control mt-2'
                placeholder='Address'
                value={Shift_t}
                onChange={(e) => setshft_t(e.target.value)}
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
  