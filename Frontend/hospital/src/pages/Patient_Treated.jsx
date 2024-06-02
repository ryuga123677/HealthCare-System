import React, { useEffect } from 'react'
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//import CommentIcon from '@mui/icons-material/Comment';
import IconButton from "@mui/material/IconButton";
export const Patient_Treated = () => {
    const [names,setname] = useState([]);
    const doctorname=localStorage.getItem('doctorname',"****");
  
    const [loading, setLoading] = useState(true);
   
    const handlelist = async () => {
  
        const response = await axios.get(`http://localhost:3000/patienttreated?search=${doctorname}`).then((response) => {
          console.log(response.data);
          let arr=response.data;
          setLoading(false);

    
          setname(arr);
        
        
  
        }).catch((error) => { 
          setLoading(false);
        });
      }
      useEffect(() => {
        handlelist();
      },[]);
  return (
    <>
    <h1 className='head2'>Patient Treated</h1>
    {loading?(<SpinnerDotted className='loading'/>):(
      // <div className='cont'>
      //       <ol className='my-4 mx-10'>
      //   {names.map((item,index) => (
          
      //     <li key={index } className='inrow'>
      //       <h2>{index+1}-{item.username}</h2>
      //       </li>
      //   ))}
      // </ol>
      // </div>
      <div className="flex justify-center">
      <List
        className="flex flex-col m-5 "
        sx={{ width: "100%", maxWidth: 360, bgcolor: "", mb: 2 }}
      >
        {names.map((item, index) => (
          <ListItem
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "lightcyan", 
              borderRadius: '8px',
        
            }}
            key={index}
            disableGutters
           
          >
            <ListItemText
              primary={`${item.username}`}
          
            />
          </ListItem>
        ))}
      </List>
    </div>
    
    )

    }
  
  

  
 
    </>
  )
}
