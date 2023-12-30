import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

export const Doctor_List = () => {
    
    const [names,setname] = useState([]);
    const patientname=localStorage.getItem('patientname',"****");
    const hospitalname=localStorage.getItem('hospitalname',"****");
    const [loading, setLoading] = useState(true);
   
    const handleSignup = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/doctorlist?search=${hospitalname}`).then((response) => {
          console.log(response.data);
          let arr=response.data;
          setLoading(false);
        
          setname(arr);
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
      const assignappoint = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/appointment?param1=${username}&param2=${patientname}`).then((response) => {
          console.log(response.data);
          let arr=response.data;
        
          setname(arr);
        
  
        });
      }
      useEffect(()=>{
        handleSignup();
      },[])
  return (<>
    <div>Doctor_List</div>
    {loading?(<p>Loading...</p>):(
        <ol>
        {names.map((item,index) => (
          
          <li key={index }>
            <button className="btn" onClick={()=>assignappoint(item.username)}>{item.username} click to fix appointment</button></li>
        ))}
      </ol>
    )

    }
  
  

  
 
    </>
  
  )
}
