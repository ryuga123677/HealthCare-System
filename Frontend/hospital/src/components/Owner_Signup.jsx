import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './pages.css'
export const Owner_Signup = (props) => {
  const [username,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [hospitalname,sethospitalname] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/ownerregister', {
        username,
        email,
        password,
        hospitalname,
      });
        if(response.data==="success")
        {
          navigate('/ownerpage');

        }
        else
        {
          navigate('/ownerregister');
        }
      
      console.log(response.data);
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };
  return (
    <>
    <div className="head2"><h1>Welcome, Register yourself with your Hospital</h1></div>
    <div className="card">
    <form>

      <div className="inp">
      <label>Name-</label>
    <input type="text"  placeholder="Name" value={username} onChange={(e) => setname(e.target.value)}/>
      </div>
     
<div className="inp">
<label>Email-</label>
<input type="email"  placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
</div>
    <div className="inp">
    <label>Password-</label>
    <input type="password"  placeholder="Password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>
    </div>
    <div className="inp">
    <label>HospitalName-</label>
    <input type="text"  placeholder="Hospital-Name" value={hospitalname}
          onChange={(e) => sethospitalname(e.target.value)}/>
    </div>
    
    </form>
    <button className="btn2" onClick={handleSignup}>Submit</button>
    </div>

    
    </>
  )
}