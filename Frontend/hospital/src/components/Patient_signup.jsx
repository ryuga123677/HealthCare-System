import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./pages.css";
export const Patient_signup = (props) => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [age, setage] = useState(0);
  const [hospitalname, sethospitalname] = useState("");
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const handleSignup = async () => {
    if (!username || !password ||!email || !age || !hospitalname) {
      notify('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/patientregister",
        {
          username,
          email,
          age,
          hospitalname,
          password,
        }
      );
      if (response.data === "success"){
        notify('Register Successful');
    
        setTimeout(() => navigate("/patientlogin"), 1200);
      }
      else {
        navigate("/patientregister");
      }
      console.log(response.data);
    } catch (error) {
      notify("Error during register:" + error.message);
      console.error("Error during register:", error.message);
    }
  };
  return (
    <><div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
      <div className="head2">
        <h1>Welcome, Register yourself here</h1>
      </div>
      <div className="flex justify-center items-center">
      <div className="p-5 ">
            <img src="../src/assets/doctor.jpg" />
          </div>
      <div className="flex flex-col rounded-md bg-transparent shadow-md p-4">
        <form className="flex flex-col gap-3 p-2">
        
          <input
            type="text"
            className=""
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />

          
          <input
            type="email"
            className=""
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

        
          <input
            type="password"
            className=""
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

        
          <input
            type="number"
            className=""
            placeholder="age"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />

          
          <input
            type="text"
            className=""
            placeholder="Hospital-name"
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
      <ToastContainer/>
    </>
  );
};
