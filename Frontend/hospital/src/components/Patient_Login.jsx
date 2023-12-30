import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './pages.css'
export const Patient_Login = (props) => {
  const [username,setname] = useState('');

  const [password,setpassword] = useState('');
  const [hospitalname,sethospitalname] = useState('');
 
  const navigate = useNavigate();
  const handleSignup = async () => {
   
    try {
      const response = await axios.post('http://localhost:3000/patientlogin', {
        username,
        password,
    hospitalname,
      });
        if(response.data==="success")
        {
          localStorage.setItem('hospitalname',hospitalname);
          localStorage.setItem('patientname',username);
          
          navigate('/patientpage');
          

        }
        else
        {
          navigate('/patientlogin');
        }
      
      console.log(response.data);
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };
  
  return (
    <><div className="head2"><h1>Welcome, Login yourself here</h1></div>
    <div className="card">
    <form>
      <div className="inp">
      <label>Name</label>
    <input type="text" placeholder="Name" value={username} onChange={(e) => setname(e.target.value)}/>
      </div>
     
    <div  className="inp">
    <label>Password</label>
    <input type="password" placeholder="Password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>
    </div>
    <div  className="inp">
    <label>Hospitalname</label>
    <input type="text" placeholder="Hospitalname" value={hospitalname}
          onChange={(e) => sethospitalname(e.target.value)}/>
    </div>

    
    </form>
    <button className="btn" onClick={handleSignup}>Submit</button>
    </div>
    
   
    
    </>
  )
}