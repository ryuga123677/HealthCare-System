import React from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'
import { useEffect } from 'react'
import {motion} from 'framer-motion'

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
  <motion.div className='flex gap-5' initial={{x:"-100vw"}} animate={{x:"0wv"}} transition={{delay:.3,duration:2}}>
    <div className='flex flex-col rounded-md bg-transparent shadow-lg'>
    <motion.button whileHover={{scale:1.2}} className="btn h-20" onClick={()=>navigate('/ownerregister')}>Owner Signup</motion.button>
  <motion.button className="btn h-20" whileHover={{scale:1.2}} onClick={()=>navigate('/ownerlogin')}>Owner Login</motion.button>
    </div>
 
<div className='flex flex-col rounded-md bg-transparent shadow-lg'>
<motion.button className="btn h-20" whileHover={{scale:1.2}} onClick={()=>navigate('/doctorregister')}>Doctor Signup</motion.button>
  <motion.button className="btn h-20" whileHover={{scale:1.2}} onClick={()=>navigate('/doctorlogin')}> Doctor Login</motion.button>
</div>

 <div className='flex flex-col rounded-md  bg-transparent shadow-lg'>
 <motion.button className="btn h-20" whileHover={{scale:1.2}} onClick={()=>navigate('/patientregister')}>Patient Signup</motion.button>
  <motion.button className="btn h-20" whileHover={{scale:1.2}} onClick={()=>navigate('/patientlogin')}>Patient Login</motion.button>
 </div>


  </motion.div>
  <div>

 
  </div>
  </div>

 
  </>
  )
}
