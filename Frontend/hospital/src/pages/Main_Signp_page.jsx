import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Main_Signp_page = () => {
    const navigate=useNavigate()
  return (
  <><button onClick={()=>navigate('/owner')}>Click for Hospital owner Signup</button>
  <button onClick={()=>navigate('/doctor')}>Click for Doctor Signup</button>
  <button onClick={()=>navigate('/patient')}>Click for Patient Signup</button>
  </>
  )
}
