import { useState,useEffect } from 'react'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import {Main} from './pages/Main'
import {Login} from './pages/Login'
import { Main_Signp_page } from './pages/Main_Signp_page'
import {Owner_Signup} from './components/Owner_Signup'
import {Patient_signup} from './components/Patient_signup'
import {Doctor_signup} from './components/Doctor_signup'


function App() {



  return (
    <>
    
        <Routes>
          <Route path='/' element={<Main_Signp_page/>} />
      <Route path='owner' element ={<Owner_Signup/>}/>
      <Route path='patient' element ={<Patient_signup/>}/>
      <Route path='doctor' element ={<Doctor_signup/>}/>
      <Route path='main'  element={<Main/>}/>
      <Route path='login'  element={<Login/>}/>
   
    </Routes>
    </>
  )
}

export default App
