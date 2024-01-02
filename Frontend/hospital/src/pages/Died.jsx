import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { SpinnerDotted } from 'spinners-react';
export const Died = () => {
    const [names,setname] = useState([]);
    const doctorname=localStorage.getItem('doctorname',"****");
    const [loading, setLoading] = useState(true);
    const handlelist = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/died?search=${doctorname}`).then((response) => {
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
    <h1 className='head2'>Patient Died</h1>
    {loading?(<SpinnerDotted className='loading'/>):(
      <div >
        <div className='card'>
        <ol className='content'>
        {names.map((item,index) => (
          
          <li key={index }>
              <h2>{item.username}</h2> </li>
        ))}
      </ol>
        </div>
      </div>
     
    )

    }
  
  

  
 
    </>
  
  )
}
