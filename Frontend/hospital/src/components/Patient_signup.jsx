import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
      navigate('/main');
    else{
      navigate('/patientregister');
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
    <label>age</label>
    <input type="number" className="password" placeholder="age" value={age}
          onChange={(e) => setage(e.target.value)}/>
    </div>
    <div>
    <label>hospitalname</label>
    <input type="text" className="fullname" placeholder="hospital name" value={hospitalname}
          onChange={(e) => sethospitalname(e.target.value)}/>
    </div>
    
    </form>
    <button id="btn" onClick={handleSignup}>Submit</button>
    <button  onClick={()=>navigate('main')}>Submit2</button>
    </>
  )
}