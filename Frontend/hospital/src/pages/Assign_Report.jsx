import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
export const Assign_Report = () => {
    const doctorname=localStorage.getItem('doctorname',"****");
    const {username}=useParams();
    const [disease,setdisease]=useState('');
    const [symptoms,setsymptoms]=useState('');
    const [medicines,setmedicines]=useState('');
    const [diet,setdiet]=useState('');
    const assignreport = async (username) => {
  
     
       const response = await axios.post(`http://localhost:3000/assignreport`,{
        username,
        disease,
        symptoms,
        medicines,
        diet,
        doctorname,

       }).then(response=>{
        console.log(response.data);
       });
      
        
  
        };
  return (
    <>
    <div className='card'>
    <div className='content'>
    <div>Patient Name- {username}</div>
    <div>Disease Name-<input type='text' value={disease} onChange={(e) => setdisease(e.target.value)}></input></div>
    <div>Symptoms-<input type='text' value={symptoms} onChange={(e) => setsymptoms(e.target.value)}></input></div>
    <div>Medicines-<input type='text' value={medicines} onChange={(e) => setmedicines(e.target.value)}></input></div>
    <div>Diet-<input type='text'value={diet} onChange={(e) => setdiet(e.target.value)}></input></div>
    <button className='btn' onClick={()=>assignreport(username)}>Assign Report</button>
    </div>
    </div>

   
    </>
    

  )
}
