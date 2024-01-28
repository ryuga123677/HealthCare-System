import React from 'react'

import { useNavigate } from 'react-router-dom'
export const Doctor = () => {
const navigate = useNavigate();
  return (
    <>
    <h1 className='head2'>Doctors Page</h1>
    
      <div className='card'>

      <button className='btn' onClick={()=>navigate('/patientappoints')}>Appointments</button>
    <div>
    <button className='btn' onClick={()=>navigate('/patienttreated')}>Patient Treated</button>
    </div>
   
      <div>
        <button className='btn' onClick={()=>navigate('/currentlytreating')}>Currently Treating</button>
      
       

      </div>
      <div>
        <button className='btn' onClick={()=>navigate('/died')}>Patient Died</button>
      
       

      </div>
      
      <div> <button className='btn' onClick={()=>navigate('/performance')}>Performance</button></div>
      </div>

  
   

    </>
  )
}
