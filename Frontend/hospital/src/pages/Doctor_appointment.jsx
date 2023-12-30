import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';

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
   const Accept=async (patientname) => {
    const response=await axios.post('http://localhost:3000/appointmentfix',{
        username,
        patientname,
    }).then((response) => {
        if (response.data==="success")
        {
            setname(names.filter(user => user.username !==patientname));
        }
    })
   }
   const Decline=async (patientname) => {
    const response=await axios.get(`http://localhost:3000/appointmentdecline?doctorname=${username}&patientname=${patientname}`
  ).then((response) => {
    if(response.data==="success")
    {
        setname(names.filter(user => user.username !==patientname));
    }
  }).catch((error) => {
    console.log(error);
  });
   }
   useEffect(()=>{
    seeAppoint();
   },[]);
  return (
    <>
    <div>Doctor_appointment</div>

    {loading ? (
        <SpinnerDotted />
      ) : (
        <ol>
          {names.map((item, index) => (
            <li key={index}>
                <div>{item.username}</div>
                <button className='btn' onClick={()=>Accept(item.username)}>Accept</button>
                <button className='btn' onClick={()=>Decline(item.username)}>Decline</button>
            </li>
          ))}
        </ol>
      )}
    </>
    
  )
}
