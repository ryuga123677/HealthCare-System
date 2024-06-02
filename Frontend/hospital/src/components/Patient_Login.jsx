import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import "./pages.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Patient_Login = (props) => {
  const [username, setname] = useState("");
  const auth = useAuth();
  const notify = (message) => toast(message);
  const [password, setpassword] = useState("");
  const [hospitalname, sethospitalname] = useState("");

  const navigate = useNavigate();
  const handleSignup = async () => {
    if (!username || !password ||!hospitalname) {
      notify('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/patientlogin", {
        username,
        password,
        hospitalname,
      });
      if (response.data === "success") {
        //auth.login(username);
        localStorage.setItem("hospitalname", hospitalname);
        localStorage.setItem("patientname", username);
        const field = localStorage.setItem("field", "patient");
        notify('Login Successful');
    
        setTimeout(() => navigate("/patientpage"), 1200);
      } else {
        navigate("/patientlogin");
      }

      console.log(response.data);
    } catch (error) {
      notify('Error during login, User not found: ' + error.message);
      console.error("Error during register:", error.message);
    }
  };

  return (
    <><div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
      <div className="head2">
        <h1>Welcome, Login yourself here</h1>
      </div>
      <div className="flex justify-center items-center ">
      <div className="p-5">
            
            <img src="../src/assets/doctor.jpg" />
          </div>
      <div className="flex flex-col rounded-md bg-transparent shadow-lg p-4">
        
        <form className="flex flex-col gap-3 p-3">
          
          <input
            type="text"
            className=""
            placeholder="Name"
            value={username}
            onChange={(e) => setname(e.target.value)}
          />

        
          <input
            type="password"
            className=""
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

    
          <input
            type="text"
            className=""
            placeholder="Hospitalname"
            value={hospitalname}
            onChange={(e) => sethospitalname(e.target.value)}
          />
        </form>
        <button className="btn" onClick={handleSignup}>
          Submit
        </button>
      </div>
      </div>
      
      </div>
      <ToastContainer />
    </>
  );
};
