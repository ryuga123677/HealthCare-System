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
import { Doctor_appointment } from './pages/Doctor_appointment'
import { Assign_Report } from './pages/Assign_Report'
import { CurrentlyTreating } from './pages/CurrentlyTreating'
import { SeeReports } from './pages/SeeReports'
import { Patient_Treated } from './pages/Patient_Treated'
 import { Performance } from './pages/Performance'
import { Died } from './pages/Died'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import ChatView from './pages/ChatView'
import { DoctorTreating } from './pages/DoctorTreating'
import { Hospital } from './pages/Hospital'
// import { RequireAuth } from './components/RequireAuth'
// import {AuthProvider} from './components/AuthProvider'
function App() {



  return (
    <>
    {/* <AuthProvider> */}
    <Navbar />
        <Routes>
          <Route path='/' element={<Main_Signp_page/>} />
      <Route path='ownerregister' element ={<Owner_Signup/>}/>
      <Route path='patientregister' element ={<Patient_signup/>}/>
      <Route path='doctorregister' element ={<Doctor_signup/>}/>
      { <Route path='about'  element={<About/>}/> }
      <Route path='ownerlogin'  element={<Owner_Login/>}/>
      <Route path='doctorlogin'  element={<Doctor_Login/>}/>
      <Route path='patientlogin'  element={<Patient_Login/>}/>
      <Route path='doctorpage'  element={<Doctor/>}/>
      <Route path='patientpage'  element={<Patient/>}/>
      <Route path='ownerpage'  element={<Owner/>}/>
      <Route path='doctorlist'  element={<Doctor_List />}/>
      <Route path='patientappoints'  element={<Doctor_appointment />}/>
      <Route path='currentlytreating'  element={<CurrentlyTreating />}/>
      <Route path='assignreport/:username'  element={<Assign_Report />}/>
      <Route path='seereports'  element={<SeeReports/>}/>
      <Route path='patienttreated'  element={<Patient_Treated />}/>
      <Route path='performance'  element={<Performance />}/>
      <Route path='died'  element={<Died />}/>
      <Route path='hospitals'  element={<Hospital/>}/>
      <Route path='contact'  element={<Contact />}/>
      <Route path='chat/:name'  element={<ChatView />}/>
      <Route path='doctortreating'  element={<DoctorTreating />}/>
   
    </Routes>
    {/* </AuthProvider> */}
    </>
  )
}

export default App
