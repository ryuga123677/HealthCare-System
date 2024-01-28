import React, { useEffect, useState } from 'react'
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const DoctorTreating = () => {
    const navigate =useNavigate();
    const [names,setname]=useState([]);
    const [loading,setLoading]=useState(true);
    const handleSignup = async () => {
  const patientname = localStorage.getItem('patientname',"****");
        const response = await axios.get(`http://localhost:3000/doctortreating?search=${patientname}`).then((response) => {

          let arr=response.data;
          setLoading(false);

        
          setname(arr);
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
      useEffect(()=>{
        handleSignup();
      },[])
    
  return (
    <>
    <h1 className='head2'>My Doctors</h1>
    <div className='card'>
     
    {loading?(<SpinnerDotted className='loading'/>):(
      
            <ol className='cont'>
        {names.map((item,index) => (
          
          <li key={index } className='inrow'>
            <div className='inrow mx-10'>
           <h2>{index+1}- {item.username}-({item.speciality})</h2> 
          <button className='btn2' onClick={()=>navigate(`/chat/${item.username}`)}>Chat with doctor</button>
            </div>
      
            </li>
        ))}
      </ol>
    
    
    )

    }
        
        </div>
  
  
    
    </>
  )
}
