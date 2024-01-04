import React from 'react'

import { useNavigate } from 'react-router-dom';


export const Patient = () => {
  const navigate = useNavigate()



  return (
    <>
    <h1 className='head2'>Patient Page</h1>
    <div className='content'>
    <div className='card'>
    <div>
        <button className="btn" onClick={()=>{navigate('/doctorlist')}}>Doctors Avaliable</button>
    </div>
    <div>
        <button className="btn" onClick={()=>{navigate('/doctortreating')}}>Doctor Treating me</button>
    </div>
   
    <div><button className='btn' onClick={()=>navigate('/seereports')}>Present Reports</button></div>
    </div>
    </div>
 
  
 
    </>
  )
}
