import React from 'react'

import { useNavigate } from 'react-router-dom';


export const Patient = () => {
  const navigate = useNavigate()

  return (
    <>
    <div>
        <button onClick={()=>{navigate('/doctorlist')}}>Doctors Avaliable</button>
    </div>
    <div>success rate</div>
    <div>time</div>
    <div>present reports</div>
 
    </>
  )
}
