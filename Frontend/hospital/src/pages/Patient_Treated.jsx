import React, { useEffect } from 'react'
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';

export const Patient_Treated = () => {
    const [names,setname] = useState([]);
    const doctorname=localStorage.getItem('doctorname',"****");
  
    const [loading, setLoading] = useState(true);
   
    const handlelist = async () => {
  
        const response = await axios.get(`http://localhost:3000/patienttreated?search=${doctorname}`).then((response) => {
          console.log(response.data);
          let arr=response.data;
          setLoading(false);

    
          setname(arr);
        
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
      useEffect(() => {
        handlelist();
      },[]);
  return (
    <>
    <h1 className='head2'>Patient Treated</h1>
    {loading?(<SpinnerDotted className='loading'/>):(
      <div className='cont'>
            <ol className='content'>
        {names.map((item,index) => (
          
          <li key={index } className='inrow'>
            <h2>{index+1}-{item.username}</h2>
            </li>
        ))}
      </ol>
      </div>
    
    )

    }
  
  

  
 
    </>
  )
}
