import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Forgotpassword() {
    let [email ,setemail] =useState("")

    async function fp(){
        try {
            await axios.post(``,{
                email :email
            }).then((a)=>{
                toast.success(a.data.msg)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='container'> <h2>Forget Password</h2> <hr/>
    <ToastContainer/>
    <p>Enter your Email</p>
    <input type='email' placeholder='Enter Email' className='form-control my-2' value={email}
    onChange={(e)=> setemail(e.target.value)}/>
    <button className='btn btn-primary my-2' onClick={fp}>Sent link</button>
    </div>
  )
}
