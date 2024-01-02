import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './pages.css'
export const Patient_signup = (props) => {
  const [username,setusername] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [age,setage] = useState(0);
  const [hospitalname,sethospitalname] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/patientregister', {
        username,
        email,
      age,
        hospitalname,
        password,
      });
      if(response.data==="success")
      navigate('/patientlogin');
    else{
      navigate('/patientregister');
    }
      console.log(response.data);
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };
  return (
    <><div className="head2"><h1>Welcome, Register yourself here</h1></div>
    <div className="card">
    <form>
      <div className="inp">
      <label>Name-</label>
    <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)}/>
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
    <label>Age-</label>
    <input type="number"  placeholder="age" value={age}
          onChange={(e) => setage(e.target.value)}/>
    </div>
    <div className="inp">
    <label>HospitalName-</label>
    <input type="text"  placeholder="Hospital-name" value={hospitalname}
          onChange={(e) => sethospitalname(e.target.value)}/>
    </div>
    
    </form>
    <button className="btn" onClick={handleSignup}>Submit</button>

    </div>
 
    
    </>
  )
}