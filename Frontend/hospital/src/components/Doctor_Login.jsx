import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import { useAuth } from "./Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Doctor_Login = (props) => {
  const [username, setname] = useState("");
  const [password, setpassword] = useState("");
  const auth = useAuth();
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleSignup = async () => {
    if (!username || !password) {
      notify('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/doctorlogin", {
        username,
        password,
      });
      if (response.data === "success") {
        localStorage.setItem("doctorname", username);
        localStorage.setItem("field", "doctor");
        // auth.login(username);
        notify('Login Successful');
    
        setTimeout(() => navigate("/doctorpage"), 1200);
      } else {
        notify('Login failed. Please try again.');
        navigate("/doctorlogin");
      }
      console.log(response.data);
    } catch (error) {
      notify('Error during login user not found: ' + error.message);
    
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
        <div className="head2">
          <h1>Welcome, Doctor Login yourself here</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="p-5">
            <img src="../src/assets/doctor.jpg" alt="Doctor" />
          </div>
          <div className="flex flex-col rounded-md bg-transparent shadow-lg gap-3 p-3">
            <form className="flex flex-col gap-3 p-1">
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
