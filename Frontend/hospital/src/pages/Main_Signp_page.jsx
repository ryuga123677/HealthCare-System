import React from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'
import { useEffect } from 'react'

export const Main_Signp_page = () => {
    const navigate=useNavigate();
    var field='null';
    useEffect(() =>{
      field=localStorage.getItem('field','null');
      if(field=='owner')
      {
        navigate('/ownerpage');
      }
      if(field=='doctor')
      {
        navigate('/doctorpage');
      }
      if(field=='patient')
      {
        navigate('/patientpage');
      }
    },[]);
 
    

   
  return (
  <>
  <div className='info'>
    <div>
      <h1 className='head'> Welcome to Our Health Management app</h1>
     
    </div>
  <div>
  <button className="btn h-20" onClick={()=>navigate('/ownerregister')}>Owner Signup</button>
  <button className="btn h-20" onClick={()=>navigate('/doctorregister')}>Doctor Signup</button>
  <button className="btn h-20" onClick={()=>navigate('/patientregister')}>Patient Signup</button>

  </div>
  <div>
  <button className="btn h-20" onClick={()=>navigate('/ownerlogin')}>Owner Login</button>
  <button className="btn h-20" onClick={()=>navigate('/doctorlogin')}> Doctor Login</button>
  <button className="btn h-20" onClick={()=>navigate('/patientlogin')}>Patient Login</button>
  </div>
  </div>

 
  </>
  )
}
