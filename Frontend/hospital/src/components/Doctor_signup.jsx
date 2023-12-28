import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './pages.css'
export const Doctor_signup = (props) => {
  const [username,setusername] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [speciality,setspeciality] = useState('');
  const [hospitalname,sethospitalname] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/doctorregister', {

        username,
        email,
        speciality,
        password,
        hospitalname,
      });
      if(response.data==="success")
      navigate('/doctorpage');
    else{
      navigate('/doctorregister')
    }
      console.log(response.data);
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };
  return (
    <><div className="head2"><h1>Welcome, Doctor Register yourself here</h1></div>
    <div className="card">
    <form>
      <div className="inp">
      <label>Name</label>
    <input type="text" className="username" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)}/>
      </div>
     
<div className="inp">
<label>Email</label>
<input type="email"  placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
</div>
    <div className="inp">
    <label>Password</label>
    <input type="password"  placeholder="Password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>
    </div>
    <div className="inp">
    <label>Speciality</label>
    <input type="text"  placeholder="Speciality" value={speciality}
          onChange={(e) => setspeciality(e.target.value)}/>
    </div>
    <div className="inp">
    <label> HospitalName</label>
    <input type="text" placeholder="Hospital-name" value={hospitalname}
          onChange={(e) => sethospitalname(e.target.value)}/>
    </div>
    
    </form>
    <button className="btn" onClick={handleSignup}>Submit</button>
    </div>
    
   
    
    </>
  )
}