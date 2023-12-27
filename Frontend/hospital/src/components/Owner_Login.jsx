import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export const Owner_Login = (props) => {
  const [username,setname] = useState('');

  const [password,setpassword] = useState('');
 
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/ownerlogin', {
        username,
        password,
    
      });
        if(response.data==="success")
        {
          navigate('/main');

        }
        else
        {
          navigate('/owner');
        }
      
      console.log(response.data);
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };
  return (
    <>
    
    <form>
      <div>
      <label>userName</label>
    <input type="text" className="name" placeholder="Name" value={username} onChange={(e) => setname(e.target.value)}/>
      </div>
     
    <div>
    <label>Password</label>
    <input type="password" className="password" placeholder="Password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>
    </div>

    
    </form>
    <button id="btn" onClick={handleSignup}>Submit</button>
    
    </>
  )
}