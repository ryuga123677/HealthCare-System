import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import "./pages.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Owner_Login = (props) => {
  const [username, setname] = useState("");

  const [password, setpassword] = useState("");
  const auth = useAuth();
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  const handleSignup = async () => {
    if (!username || !password) {
      notify('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/ownerlogin", {
        username,
        password,
      });
      if (response.data === "success") {
        //auth.login(username);
        const ownername = localStorage.setItem("ownername", username);
        const field = localStorage.setItem("field", "owner");
        notify('Login Successful');
    
        setTimeout(() => navigate("/ownerpage"), 1200);
      } else {
        navigate("/ownerlogin");
      }

      console.log(response.data);
    } catch (error) {
      notify('Error during login user not found: ' + error.message);
    
      console.error("Error during login:", error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-center flex-grow gap-5">
        <div className="head2">
          <h1>Welcome, Login yourself here</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="p-5 ">
            <img src="../src/assets/doctor.jpg" />
          </div>
          <div >
          <div className="flex-col h-[100%] justify-center p-5 rounded-md bg-transparent shadow-lg">
            <form className="flex flex-col gap-4">
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
      </div>
      <ToastContainer />
    </>
  );
};
