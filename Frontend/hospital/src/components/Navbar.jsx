import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './Auth'
import { useNavigate } from 'react-router-dom'


export const Navbar = () => {
  const auth=useAuth();
const navigate=useNavigate();
  const handlelogout=()=>{
    // auth.logout();
    localStorage.setItem('field','null');
    navigate('/');


  }


  return (
    <nav className='nav'>

<Link to='/'>Home</Link> 
<Link to='/hospitals'>Hospitals</Link>     
<Link to='/about'>About</Link>
<Link to='/contact'>Contact us</Link>
{(<button onClick={handlelogout} className='btn3'>Logout</button>)
}
    </nav>
  )
}
