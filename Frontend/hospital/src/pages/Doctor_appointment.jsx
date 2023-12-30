import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';

export const Doctor_appointment =() => {
     const username=localStorage.getItem('doctorname',"****");
    const [names,setname] = useState([]);
    const [loading, setLoading] = useState(true);
     const seeAppoint = async () => {
    
const response=await axios.get(`http://localhost:3000/patientappoints?param=${username}`).then((response) => {
    let arr=response.data;
        
          setname(arr);
          setLoading(false);
}).catch((error) => {
    setLoading(false);
});
   }
   const Accept=async () => {
    const response=await axios.post('http://localhost:3000/appontmentsfix',{
        doctorname,
        patientname
    })
   }
   useEffect(()=>{
    seeAppoint();
   },[]);
  return (
    <>
    <div>Doctor_appointment</div>

    {loading ? (
        <p>Loading...</p>
      ) : (
        <ol>
          {names.map((item, index) => (
            <li key={index}>
                <div>{item.username}</div>
                <button className='btn'>Accept</button>
                <button className='btn'>Decline</button>
            </li>
          ))}
        </ol>
      )}
    </>
    
  )
}
