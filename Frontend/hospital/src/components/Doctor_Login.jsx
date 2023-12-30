import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './pages.css'
export const Doctor_Login = (props) => {
  const [username,setname] = useState('');

  const [password,setpassword] = useState('');
  
 
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/doctorlogin', {
        username,
        password,
    
      });
        if(response.data==="success")
        {const doctorname=localStorage.setItem('doctorname',username);
          navigate('/doctorpage');

        }
        else
        {
          navigate('/doctorlogin');
        }
      
      console.log(response.data);
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };
  return (
    <><div className="head2"><h1>Welcome, Doctor Login yourself here</h1></div>
    <div className="card">
    <form>
      <div className="inp">
      <label>Name</label>
    <input type="text" className="name" placeholder="Name" value={username} onChange={(e) => setname(e.target.value)}/>
      </div>
     
    <div className="inp">
    <label>Password</label>
    <input type="password" className="password" placeholder="Password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>
    </div>

    
    </form>
    <button className="btn" onClick={handleSignup}>Submit</button>
    </div>
 
    
    </>
  )
}