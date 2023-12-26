import { useState,useEffect } from 'react'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Main } from './pages/Main'
import {Login} from './pages/Login'

let x='';
function App() {
  const [count, setCount] = useState('');



  return (
    <>
        <Routes>
      <Route path='/' element ={<Signup/>}></Route>
      <Route path='main' element={<Main/>}></Route> 
      <Route path='login' element={<Login/>}></Route>
   
    </Routes>
    </>
  )
}

export default App
