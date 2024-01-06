import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './AuthProvider'

export const Navbar = () => {
  const auth=useAuth();
  const handlelogout=()=>{
    auth.logout();
    return <Link to='/'/>
  }


  return (
    <nav className='nav'>

<Link to='/'>Home</Link>    
<Link to='/about'>About</Link>
<Link to='/contact'>Contact us</Link>
<button onClick={handlelogout} className='btn3'>Logout</button>

    </nav>
  )
}
