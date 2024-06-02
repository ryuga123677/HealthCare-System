import React from "react";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#64d8cb',
    },
  },
});

export const Doctor = () => {
  const navigate = useNavigate();
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
