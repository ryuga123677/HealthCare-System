import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';

export const CurrentlyTreating = () => {
     const navigate = useNavigate();
    const [names,setname] = useState([]);
    const doctorname=localStorage.getItem('doctorname',"****");
  
    const [loading, setLoading] = useState(true);
   
    const handleSignup = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/doctorspatient?search=${doctorname}`).then((response) => {
          console.log(response.data);
          let arr=response.data;
          setLoading(false);

        
          setname(arr);
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
      const assignreport = async (username) => {
  
     
        navigate(`/assignreport/${username}`);
      
        
  
        };
        const Treated = async (patientname) => {
  
          const response = await axios.post('http://localhost:3000/treated',{
            doctorname,
            patientname,
          }).then((response) => {
          
            
            setLoading(false);
            if(response.data==="success")
            {
            setname(names.filter(user => user.username !==patientname));
            }
          
    
          }).catch((error) => { 
            setLoading(false);
          });
        }
        const notTreated = async (patientname) => {
  
          const response = await axios.post('http://localhost:3000/nottreated',{
            doctorname,
            patientname,
          }).then((response) => {
            console.log(response.data);
            let arr=response.data;
            setLoading(false);
  
            if(response.data==="success")
            {
            setname(names.filter(user => user.username !==patientname));
            }
          
          
    
          }).catch((error) => { 
            setLoading(false);
          });
        }
      useEffect(()=>{
        handleSignup();
      },[]);
  return (
  <>
    <h1 className='head2'>Currently Treating</h1>
    {loading?(<SpinnerDotted className='loading'/>):(
      <div className='box'>
            <ol className='content'>
        {names.map((item,index) => (
          
          <li key={index } className='inrow'>
          
            <div>
            <button className="btn" onClick={()=>assignreport(item.username)}><h2>{item.username}</h2> Tap to assign report</button>
            <button className='btn2' onClick={()=>Treated(item.username)}>Treated</button>
            <button className='btn2' onClick={()=>notTreated(item.username)}>Not Treated</button>
            <button className='btn' onClick={()=>navigate( `/chat/${item.username}`)}>Chat with Patient</button>
            </div>
           
            </li>
        ))}
      </ol>
      </div>
    
    )

    }
  
  

  
 
    </>
  
  )
  }
  
