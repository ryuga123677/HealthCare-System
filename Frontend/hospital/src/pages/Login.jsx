import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export const Login = () => {

  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
   
     await axios.post('http://localhost:3000/login', {email,password,
      }).then(result=>{
        console.log(result.data);
        if(result.data ==="success")
        {
            navigate('/main');
        }
        else
        {
            navigate('/login')
        }
      });
  }
  
  return (
    <>
    
    <form>
    
     
<div>
<label>Email</label>
<input type="email" className="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
</div>
    <div>
    <label>Password</label>
    <input type="password" className="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}/>
    </div>
   
   </form>
  
    <button id="btn" onClick={handleLogin}>Submit</button>
    
    
    </>
  )
}