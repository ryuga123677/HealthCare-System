import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { SpinnerDotted } from 'spinners-react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
export const Died = () => {
    const [names,setname] = useState([]);
    const doctorname=localStorage.getItem('doctorname',"****");
    const [loading, setLoading] = useState(true);
    const handlelist = async (username) => {
  
        const response = await axios.get(`http://localhost:3000/died?search=${doctorname}`).then((response) => {
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
    <h1 className='head2'>Patient Died</h1>
    {loading?(<SpinnerDotted className='loading'/>):(
      // <div >
      //   <div className='cont'>
      //   <ol className='content'>
      //   {names.map((item,index) => (
          
      //     <li key={index }>
      //         <h2>{item.username}</h2> </li>
      //   ))}
      // </ol>
      //   </div>
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
              primary={` ${item.username}`}
          
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
