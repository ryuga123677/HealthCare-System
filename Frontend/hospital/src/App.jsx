import { useState,useEffect } from 'react'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import {Main} from './pages/Main'
import {Login} from './pages/Login'

function App() {



  return (
    <>
        <Routes>
      <Route path='/' element ={<Signup/>}/>
      <Route path='main'  element={<Main/>}/>
      <Route path='login'  element={<Login/>}/>
   
    </Routes>
    </>
  )
}

export default App
