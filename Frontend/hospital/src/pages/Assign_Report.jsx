import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Button } from '@mui/material';
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
    <div className='flex flex-col justify-center items-center h-[100vh]'>
    <div className='flex justify-center items-center bg-white p-1 rounded-md shadow-lg m-5 h-[50%] w-[30%]'>
    <div className="flex flex-col p-5 h-full w-full text-2xl gap-5 ">
    <div>Patient Name- {username}</div>
    <div>Disease Name-<input type='text' value={disease} onChange={(e) => setdisease(e.target.value)}></input></div>
    <div>Symptoms-<input type='text' value={symptoms} onChange={(e) => setsymptoms(e.target.value)}></input></div>
    <div>Medicines-<input type='text'  value={medicines} onChange={(e) => setmedicines(e.target.value)}></input></div>
    <div>Diet-<input type='text'  value={diet} onChange={(e) => setdiet(e.target.value)}></input></div>
   <div className='w-[40%] mx-auto flex justify-center'><Button  variant='contained' size='small' onClick={()=>assignreport(username)}>Assign Report</Button></div> 
    </div>
    </div>
    </div>

   
    </>
    

  )
}
