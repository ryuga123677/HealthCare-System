import React from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'

export const Main_Signp_page = () => {
    const navigate=useNavigate()
  return (
  <>
  <div className='info'>
    <div>
      <h1 className='head'> Welcome to Our Health Management app</h1>
     
    </div>
  <div>
  <button className="btn" onClick={()=>navigate('/ownerregister')}>Register your Hospital here</button>
  <button className="btn" onClick={()=>navigate('/doctorregister')}>Click for Hospital join</button>
  <button className="btn" onClick={()=>navigate('/patientregister')}>Click for Patient Signup</button>

  </div>
  <div>
  <button className="btn" onClick={()=>navigate('/ownerlogin')}>Click for Hospital owner Login</button>
  <button className="btn" onClick={()=>navigate('/doctorlogin')}>Click for Doctor Login</button>
  <button className="btn" onClick={()=>navigate('/patientlogin')}>Click for Patient Login</button>
  </div>
  </div>

 
  </>
  )
}
