import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../css/Login.css"; // Import your CSS file

export default function Login() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    email:'',
    password:''
  })

  const loginUser = async (e) => {
    e.preventDefault();

    const { email , password } = data

    try {
      const { data } = await axios.post('/login', {
        email,
        password
      })
      
      if(data.error){
        toast.error(data.error)
      }
      else {
        setData({ email: '', password: '' })
        toast.success('Logged in successfully!')
        navigate('/dashboard')
      }
    }
    catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginUser}>
        <label>Email:</label>
        <input type="email" placeholder="Enter email..." value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
        <label>Password:</label>
        <input type="password" placeholder="Enter password..." value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
