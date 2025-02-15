import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Details() {
  const [details, setDetails] = useState(null);
  const { id } = useParams()


  useEffect(() => {
    // Replace with your actual API endpoint
    axios.post(`${import.meta.env.VITE_API_URI}/movies/getmoviebyid`, { id })
      .then(response => {
        console.log(response.data.data);
        
        setDetails(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching details:', error);
      });
  }, []);

  const handleBooking = () => {
    console.log('Booking clicked');
    // Add booking functionality here
  };

  return (
    <>
      {details ? (
        <div className="flex flex-col md:flex-row p-6 md:p-8 lg:p-12 text-accent font-bold">
          <div className="flex-1 md:w-1/2">
            <img src={details.imgLink} alt="Detail" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
          <div className="flex-1 md:w-1/2 md:pl-8 lg:pl-12 mt-4 md:mt-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-accent">{details.title}</h1>
            <p className="text-sm md:text-base lg:text-lg mb-1">Size: {details.genre}</p>
            <p className="text-sm md:text-base lg:text-lg mb-2">Kottayam</p>
            <p className="text-sm md:text-base lg:text-lg mb-2">₹ {details.language}/hour</p>

            <p className="text-xl mb-4">Description</p>
            <p className="text-sm md:text-sm lg:text-sm mb-4 line-clamp-3">{details.description}</p>

            <button
              className="w-full px-4 py-2 rounded font-bold bg-accent text-secondary cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Details;
