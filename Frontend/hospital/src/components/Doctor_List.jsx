import React from 'react'
import { useState } from 'react';
import axios from 'axios';
export const Doctor_List = () => {
    
    const [names,setname] = useState([]);
    let hospitalname=localStorage.getItem('hospitalname',"****");
    console.log(hospitalname);
    const handleSignup = async () => {
  
        const response = await axios.get(`http://localhost:3000/doctorlist?search=${hospitalname}`).then((response) => {
          console.log(response.data);
          const arr=response.data;
        
          setname(arr);
        
  
        });
      }
  return (<>
    <div>Doctor_List</div>
    <ul>
    {names.map((item) => (
      <li>{item.username}</li>
    ))}
  </ul>
  

  
  <div><button onClick={handleSignup}>click</button></div>
    </>
  
  )
}
