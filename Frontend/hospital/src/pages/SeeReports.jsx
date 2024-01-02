import React, { useState } from 'react'
import axios from 'axios'
import { SpinnerDotted } from 'spinners-react';
import { useEffect } from 'react';

export const SeeReports = () => {
    const [names,setnames]=useState({});
    const [loading, setLoading] = useState(true);
    const patientname=localStorage.getItem('patientname',"****");
    const seereports=async()=>{
        const response=axios.get(`http://localhost:3000/seereports?name=${patientname}`).then((response)=>{
      setnames(response.data);
      setLoading(false);
        }).catch((error)=>{
            console.log(error);
            setLoading(false);
        });
    }
    useEffect(() =>{
        seereports();
    },[])
  return (
    <>
     <div className='head2'><h1>Report</h1></div>
     {loading?(<SpinnerDotted className='loading' />):(
        
          <div className='content'>
            <div className='card'>
            <div><h2>Patient Name-{names.username}</h2> </div>
            <div><h2>Disease -{names.disease}</h2></div>
            <div><h2>Symptoms-{names.symptoms}</h2></div>
            <div><h2>Medicines -{names.medicines}</h2></div>
            <div><h2>Diet-{names.diet}</h2></div>
            </div>


          </div>
           
         
    
          
        
    
    )
     }


    </>
   
  )
}
