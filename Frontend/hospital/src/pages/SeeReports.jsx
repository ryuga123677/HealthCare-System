import React, { useState } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useEffect } from "react";

export const SeeReports = () => {
  const [names, setnames] = useState({});
  const [loading, setLoading] = useState(true);
  const patientname = localStorage.getItem("patientname", "****");
  const seereports = async () => {
    const response = axios
      .get(`http://localhost:3000/seereports?name=${patientname}`)
      .then((response) => {
        setnames(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    seereports();
  }, []);
  return (
    <>
        <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="head2">
        <h1>Report</h1>
      </div>
      {loading ? (
        <SpinnerDotted className="loading" />
      ) : (
        <div className="flex justify-center items-center bg-white p-1 rounded-md shadow-lg m-5 h-[50%] w-[30%]">
          <div className="flex flex-col p-5 h-full w-full text-3xl ">
            <div className="">
              <h2 className="">Patient Name-{names.username}</h2>{" "}
            </div>
            <div>
              <h2>Disease -{names.disease}</h2>
            </div>
            <div>
              <h2>Symptoms-{names.symptoms}</h2>
            </div>
            <div>
              <h2>Medicines -{names.medicines}</h2>
            </div>
            <div>
              <h2>Diet-{names.diet}</h2>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};
