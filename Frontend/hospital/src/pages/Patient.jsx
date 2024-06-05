import React from 'react'
import {Button,createTheme, ThemeProvider} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
axios.defaults.withCredentials=true;
export const Patient = () => {
  const navigate = useNavigate()
  const theme = createTheme({
    palette: {
      primary: {
        main: '#64d8cb',
      },
    },
  });
  const islogin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/ispatientlogin");
      console.log(response.data);
      if (response.data === "no refreshtoken") {
        
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching login status:', error);
      // Handle error (e.g., show error message to the user)
    }
  }
  
  useEffect(() => {
    islogin();
  }, []);


  return (
    <> <ThemeProvider theme={theme}>
    <div className='flex flex-col justify-center items-center gap-5 h-[100vh]'>
    <h1 className='head2'>Patient Page</h1>
    <div >
    <div className='flex flex-col gap-5 rounded-md bg-transparent shadow-lg p-5 w-full max-w-md'>
    <div>
        <Button variant='contained' color="primary" className="w-full" onClick={()=>{navigate('/doctorlist')}}>Doctors Avaliable</Button>
    </div>
    <div>
        <Button variant='contained' color="primary" className="w-full" onClick={()=>{navigate('/doctortreating')}}>Doctor Treating me</Button>
    </div>
   
    <div><Button variant='contained' color="primary" className="w-full" onClick={()=>navigate('/seereports')}>Present Reports</Button></div>
    </div>
    </div>
    </div>
    </ThemeProvider>
 
    </>
  )
}
