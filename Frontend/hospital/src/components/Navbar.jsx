import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './Auth'
import { useNavigate } from 'react-router-dom'


export const Navbar = () => {
  const auth=useAuth();
const navigate=useNavigate();
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};


const handleLogout = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  navigate('/'); 
};


  return (
    <nav className='nav text-xl'>

<Link to='/'>Home</Link> 
<Link to='/hospitals'>Hospitals</Link>     
<Link to='/about'>About</Link>
<Link to='/contact'>Contact us</Link>
{(<button onClick={handleLogout} className='btn3'>Logout</button>)
}
    </nav>
  )
}
