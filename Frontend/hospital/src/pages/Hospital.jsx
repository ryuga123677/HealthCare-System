import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';


export const Hospital = () => {


  const [names, setname] = useState([]);

  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState();

  const handleSignup = async (username) => {

    const response = await axios.get(`http://localhost:3000/hospitals`).then((response) => {
      console.log(response.data);
      let arr = response.data;
      setLoading(false);
      setname(arr);
      setImageUrl(response.data.image);
    }).catch((error) => {
      setLoading(false);
    });
  }

  useEffect(() => {
    handleSignup();
  }, [])
  return (<>
    <h1 className='head2'>Hospitals</h1>
    {loading ? (<SpinnerDotted className='loading' />) : (
      <div className=''>

        <ol className="flex mx-20 my-20 flex-wrap gap-10 ">
          {names.map((item, index) => (

            <li key={index} className='flex mx-5 my-5 flex-wrap h-200px w-250px bg-yellow-50 rounded px-8 py-8 justify-center'>
              <div>
                <img className="imgs" src={item.image} height={'200px'} width={'200px'} />
                <div>
                  <h2>{item.hospitalname}</h2>
                </div>
                <div>Total Doctors-{item.doctors.length}</div>
                <div>
                  <h4>  Total Patient Register-{item.patients.length}</h4>


                </div>


              </div>
            </li>
          ))
          }
        </ol>

      </div>

    )

    }





  </>
  )
}
