import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export const Owner_Signup = (props) => {
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [hospitalname,sethospitalname] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/ownerregister', {
        name,
        email,
      
        
        password,
        hospitalname,
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
      <label>Name</label>
    <input type="text" className="name" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)}/>
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
    <button  onClick={()=>navigate('main')}>Submit2</button>
    </>
  )
}