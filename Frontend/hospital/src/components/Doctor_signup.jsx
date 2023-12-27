import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export const Doctor_signup = (props) => {
  const [username,setusername] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [fullname,setfullname] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        email,
        fullname,
        password,
      });

      navigate('/main');
      console.log(response.data);
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };
  return (
    <>
    
    <form>
      <div>
      <label>Username</label>
    <input type="text" className="username" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)}/>
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
    <label>fullname</label>
    <input type="text" className="fullname" placeholder="Full name" value={fullname}
          onChange={(e) => setfullname(e.target.value)}/>
    </div>
    
    </form>
    <button id="btn" onClick={handleSignup}>Submit</button>
    <button  onClick={()=>navigate('main')}>Submit2</button>
    </>
  )
}