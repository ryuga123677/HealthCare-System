import { useState,useEffect } from 'react'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import { Patient } from './pages/Patient'
import {Owner} from './pages/Owner'
import {Doctor} from './pages/Doctor'
import { Main_Signp_page } from './pages/Main_Signp_page'
import {Owner_Signup} from './components/Owner_Signup'
import {Patient_signup} from './components/Patient_signup'
import {Doctor_signup} from './components/Doctor_signup'
import {Owner_Login} from './components/Owner_Login'
import { Doctor_Login } from './components/Doctor_Login'
import {Patient_Login} from './components/Patient_Login'
import { Navbar } from './components/Navbar'
import { Doctor_List } from './components/Doctor_List'
 

function App() {



  return (
    <>
    <Navbar />
        <Routes>
          <Route path='/' element={<Main_Signp_page/>} />
      <Route path='ownerregister' element ={<Owner_Signup/>}/>
      <Route path='patientregister' element ={<Patient_signup/>}/>
      <Route path='doctorregister' element ={<Doctor_signup/>}/>
      {/* <Route path='main'  element={<Main/>}/> */}
      <Route path='ownerlogin'  element={<Owner_Login/>}/>
      <Route path='doctorlogin'  element={<Doctor_Login/>}/>
      <Route path='patientlogin'  element={<Patient_Login/>}/>
      <Route path='doctorpage'  element={<Doctor/>}/>
      <Route path='patientpage'  element={<Patient/>}/>
      <Route path='ownerpage'  element={<Owner/>}/>
      <Route path='doctorlist'  element={<Doctor_List />}/>
   
    </Routes>
    </>
  )
}

export default App
