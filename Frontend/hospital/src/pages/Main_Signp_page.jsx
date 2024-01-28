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
  <button className="btn" onClick={()=>navigate('/ownerregister')}>Owner Signup</button>
  <button className="btn" onClick={()=>navigate('/doctorregister')}>Doctor Signup</button>
  <button className="btn" onClick={()=>navigate('/patientregister')}>Patient Signup</button>

  </div>
  <div>
  <button className="btn" onClick={()=>navigate('/ownerlogin')}>Owner Login</button>
  <button className="btn" onClick={()=>navigate('/doctorlogin')}> Doctor Login</button>
  <button className="btn" onClick={()=>navigate('/patientlogin')}>Patient Login</button>
  </div>
  </div>

 
  </>
  )
}
