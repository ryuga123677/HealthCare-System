import React from 'react'
import { useState,useContext,createContext } from 'react'
const AuthContext=createContext(null)
export const AuthProvider = ({children}) => {
const [user,setuser]=useState(null);
const login=(username)=>{
    setuser(username);
}
const logout=()=>{
    setuser(null);
}
  return (
    <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
  )
}
export const useAuth=()=>{
    return useContext(AuthContext);
}
