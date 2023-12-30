import React from 'react'

import { useNavigate } from 'react-router-dom'
export const Doctor = () => {
const navigate = useNavigate();
  return (
    <>
    <button className='btn' onClick={()=>navigate('/patientappoints')}>Appointments</button>
    <div>Patent treated</div>
      <div>
        <div>Currently treating</div>
      
        <div>reports</div>
        <div>medicine</div>

      </div>
      <div>kaun theek hua</div>
      <div>performance</div>

    </>
  )
}
