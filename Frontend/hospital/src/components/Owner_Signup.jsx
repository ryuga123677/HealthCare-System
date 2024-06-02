import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Owner_Signup = (props) => {
  const [username, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hospitalname, sethospitalname] = useState("");
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const [file, setSelectedFile] = useState(null);
  const handleSignup = async () => {
    if (!username || !password ||!email || !hospitalname) {
      notify('Please fill in all fields');
      return;
    }
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("hospitalname", hospitalname);
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:3000/ownerregister",
        formData
      );
      if (response.data.message === "success") {
        notify('Register Successful');
    
        setTimeout(() => navigate("/ownerlogin"), 1200);
      } else {
        navigate("/ownerregister");
      }

      console.log(response.data);
    } catch (error) {
      notify("Error during register:" + error.message)
      console.error("Error during register:", error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center h-[100vh] gap-5">
        <div className="head2">
          <h1>Welcome, Register yourself with your Hospital</h1>
        </div>
        <div className="flex justify-center items-center flex-wrap ">
          <div className="p-5">
            
            <img src="../src/assets/doctor.jpg" />
          </div>

          <div className="flex flex-col justify-center items-center bg-transparent p-1 rounded-md shadow-lg">
            <form className="flex flex-col justify-center gap-3">
              
              <input
                type="text"
                className="rounded-md m-1"
                placeholder="Name"
                value={username}
                onChange={(e) => setname(e.target.value)}
              />

          
              <input
                type="email"
                className="rounded-md m-1"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />

              
              <input
                type="password"
                className="rounded-md m-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />

              
              <input
                type="text"
                className="rounded-md m-1"
                placeholder="Hospital-Name"
                value={hospitalname}
                onChange={(e) => sethospitalname(e.target.value)}
              />
              <div>
              
                <input
                  className="rounded-md m-3"
                  type="file"
                  name="upload"
                  filename={file}
                  onChange={(event) => setSelectedFile(event.target.files[0])}
                />
              </div>
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
