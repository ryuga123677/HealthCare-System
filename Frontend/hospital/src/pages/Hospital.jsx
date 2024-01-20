import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';


export const Hospital = () => {
    
    
    const [names,setname] = useState([]);
   
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState();
   
    const handleSignup = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/hospitals`).then((response) => {
          console.log(response.data);
          let arr=response.data;
          setLoading(false);

        
          setname(arr);
          setImageUrl(response.data.image); 
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
   
      useEffect(()=>{
        handleSignup();
      },[])
  return (<>
    <h1 className='head2'>Hospitals</h1>
    {loading?(<SpinnerDotted className='loading'/>):(
      <div >
        <div >
        <ol className='content'>
        {names.map((item,index) => (
          
          <li key={index } className='card'>
            <div>
          
              

              
            
        
        <img className="imgs" src={`http://localhost:3000/images/uploads/${item.image}`} height={'200px'} width={'200px'} />
        <h2 >{item.hospitalname}
              
              </h2> 
             
           
            </div>
            
         
        
             
              </li>
              
        ))}
      </ol>
        </div>
      </div>
     
    )

    }
  
  

  
 
    </>
  )
}
