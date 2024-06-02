import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { Box } from '@mui/material';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//import CommentIcon from '@mui/icons-material/Comment';
import IconButton from "@mui/material/IconButton";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ChatIcon from '@mui/icons-material/Chat';
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
      // <div className='box'>
      //       <ol className='cont'>
      //   {names.map((item,index) => (
          
      //     <li key={index } className='inrow'>
          
      //       <div>
      //       <button className="btn4" onClick={()=>assignreport(item.username)}><h2>{item.username}</h2> Tap to assign report</button>
      //       <button className='btn2' onClick={()=>Treated(item.username)}>Treated</button>
      //       <button className='btn2' onClick={()=>notTreated(item.username)}>Not-Treated</button>
      //       <button className='btn2' onClick={()=>navigate( `/chat/${item.username}`)}>Chat</button>
      //       </div>
           
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
                secondaryAction={
                  <Box>
                  <IconButton aria-label="comment">
                    <AssignmentIcon onClick={()=>assignreport(item.username)}/>
                  </IconButton>
                  <IconButton aria-label="comment">
                    <HowToRegIcon onClick={()=>Treated(item.username)}/>
                  </IconButton>
                  <IconButton aria-label="comment">
                    <DoNotDisturbIcon onClick={()=>notTreated(item.username)}/>
                  </IconButton>
                  <IconButton aria-label="comment">
                    <ChatIcon onClick={()=>navigate(item.username)}/>
                  </IconButton>
                  </Box>
                }
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
  
