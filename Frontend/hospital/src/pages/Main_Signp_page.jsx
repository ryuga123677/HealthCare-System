import React from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'
import { useEffect } from 'react'
import {motion} from 'framer-motion'
import axios from 'axios'
axios.defaults.withCredentials=true;

export const Main_Signp_page = () => {
    const navigate=useNavigate();
    var field='null';

    const islogindoctor = async () => {
      try {
        const response = await axios.get("http://localhost:3000/isdoctorlogin");
        console.log(response.data);
        if (response.data === "no refreshtoken") {
          
          navigate('/');
        }
        else if(response.data==="invalid access token")
          {
            return;
          }
        else{
          navigate('/doctorpage');
        }
      } catch (error) {
        console.error('Error fetching login status:', error);
        // Handle error (e.g., show error message to the user)
      }
    }
    const isloginowner = async () => {
      try {
        const response = await axios.get("http://localhost:3000/isownerlogin");
        console.log(response.data);
        if (response.data === "no refreshtoken") {
          
          navigate('/');
        }
        else if(response.data==="invalid access token")
          {
            return;
          }
        else{
          navigate('/ownerpage');
        }
      } catch (error) {
        console.error('Error fetching login status:', error);
        // Handle error (e.g., show error message to the user)
      }
    }
  
    const isloginpatient = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ispatientlogin");
        console.log(response.data);
        if (response.data === "no refreshtoken") {
          
          navigate('/');
        }
        else if(response.data==="invalid access token")
          {
            return;
          }
        else{
          navigate('/patientpage');
        }
      } catch (error) {
        console.error('Error fetching login status:', error);
        // Handle error (e.g., show error message to the user)
      }
    }
    useEffect(() =>{
   
      islogindoctor();
      isloginowner();
      isloginpatient();
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
