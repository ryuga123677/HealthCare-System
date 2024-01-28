import React, { useEffect } from 'react'
import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
export const Owner = () => {
  const [names, setname] = useState([]);
  const ownername = localStorage.getItem('ownername', "****");
  const [loading, setLoading] = useState(true);

  const handleSignup = async () => {

    const response = await axios.get(`http://localhost:3000/doctorlistowner?search=${ownername}`).then((response) => {
      console.log(response.data);
      let arr = response.data;
      setLoading(false);


      setname(arr);


    }).catch((error) => {
      setLoading(false);
    });
  };
  const removedoctor = async (doctorname) => {
    const response = await axios.delete(`http://localhost:3000/removedoctor?doctor=${doctorname}&owner=${ownername}`).then((response) => {

      if (response.data === "success") {
        setname(names.filter(user => user.username !== doctorname));
      }

    }).catch((error) => {
      setLoading(false);
    });
  }
  useEffect(() => {
    handleSignup();
  }, [])
  return (
    <>
      <h1 className='head2'>Doctors Avaliable</h1>
      {loading ? (<SpinnerDotted className='loading' />) : (
        <div >
          <div >
            <ol className='card'>
              {names.map((item, index) => (

                <li key={index}>
                  <div className='inrow'>
                    <button className="btn4">

                      <h2 >{item.username}</h2> patient cured-{item.patienttreated.length},Patient death-{item.died.length}</button>
                    <button className='btn4' onClick={() => removedoctor(item.username)}>Remove</button>
                  </div>


                </li>

              ))}
            </ol>
          </div>
        </div>

      )

      }





    </>
  )
}
