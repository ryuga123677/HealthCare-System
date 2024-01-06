import React from 'react'
import { Link} from 'react-router-dom';
import { useAuth } from './AuthProvider'


export const RequireAuth = ({children}) => {
    const auth =useAuth();
    if(!auth.user)
    {
        return <Link to='/'/>
    }
  return children
  
}
