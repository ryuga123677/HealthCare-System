import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './pages.css'
import { useAuth } from "./Auth";
export const Doctor_Login = (props) => {
  const [username,setname] = useState('');

  const [password,setpassword] = useState('');
  const auth=useAuth();
  
 
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/doctorlogin', {
        username,
        password,
    
      });
        if(response.data==="success")
        {const doctorname=localStorage.setItem('doctorname',username);
        const field=localStorage.setItem('field','doctor');
        //  auth.login(username);
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
    
      <label>Name</label>
    <input type="text" className="inp" placeholder="Name" value={username} onChange={(e) => setname(e.target.value)}/>
      
     

    <label>Password</label>
    <input type="password" className="inp" placeholder="Password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>


    
    </form>
    <button className="btn" onClick={handleSignup}>Submit</button>
    </div>
 
    
    </>
  )
}