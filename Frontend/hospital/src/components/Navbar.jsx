import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='nav'>
    
<Link to='/about'>About</Link>
<Link to='/contact'>Contact us</Link>


    </nav>
  )
}
