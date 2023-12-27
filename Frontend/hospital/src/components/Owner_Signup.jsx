import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
<label>Email</label>
<input type="email" className="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
</div>
    <div>
    <label>Password</label>
    <input type="password" className="password" placeholder="Password" value={password}
          onChange={(e) => setpassword(e.target.value)}/>
    </div>
    <div>
    <label>Hospitalname</label>
    <input type="text" className="hospitalname" placeholder="Hospitalname" value={hospitalname}
          onChange={(e) => sethospitalname(e.target.value)}/>
    </div>
    
    </form>
    <button id="btn" onClick={handleSignup}>Submit</button>
    
    </>
  )
}