import React, { useEffect } from "react";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const theme = createTheme({
  palette: {
    primary: {
      main: '#64d8cb',
    },
  },
});
axios.defaults.withCredentials=true;
export const Doctor = () => {
  const navigate = useNavigate();
  const islogin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/isdoctorlogin");
      console.log(response.data);
      if (response.data === "no refreshtoken") {
        
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching login status:', error);
      // Handle error (e.g., show error message to the user)
    }
  }
  
  useEffect(() => {
    islogin();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col justify-center items-center gap-5 h-[100vh]">
        <h1 className="head2">Doctors Page</h1>

        <div className="flex flex-col gap-3 rounded-md bg-transparent shadow-lg p-5 w-full max-w-md">
          <div>
            <Button variant="contained" color="primary" className="w-full" onClick={() => navigate("/patientappoints")}>
              Appointments
            </Button>
          </div>

          <div>
            <Button variant="contained" color="primary" className="w-full" onClick={() => navigate("/patienttreated")}>
              Patient Treated
            </Button>
          </div>

          <div>
            <Button variant="contained" color="primary" className="w-full" onClick={() => navigate("/currentlytreating")}>
              Currently Treating
            </Button>
          </div>

          <div>
            <Button variant="contained" color="primary" className="w-full" onClick={() => navigate("/died")}>
              Patient Died
            </Button>
          </div>

          <div >
            <Button variant="contained" color="primary" className="w-full" onClick={() => navigate("/performance")}>
              Performance
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
