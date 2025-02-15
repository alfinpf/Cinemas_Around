import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Seats from "./components/seats/Seats";
import Review from "./components/reviews/Review"

function Details() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URI}/movies/getmoviebyid`, { id })
      .then((response) => {
        setDetails(response.data.data);
        localStorage.setItem(
          "current movie",
          JSON.stringify(response.data.data)
        );
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
      });
  }, []);

  const handleBooking = () => {
    console.log("Booking clicked");
  };

  return (
    <>
      {details ? (
        <div className="flex flex-col md:flex-row p-6 md:p-8 lg:p-12 font-bold text-secondary">
          <div className="flex-1 md:w-1/2 mt-20 md:mt-10">
            <img
              src={details.imglink}
              alt="Detail"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1 md:w-1/2 md:pl-8 lg:pl-12 mt-4 md:mt-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">
              {details.title}
            </h1>
            <p className="text-sm md:text-base lg:text-lg mb-1">
              Genre: {details.genre}
            </p>
            <p className="text-sm md:text-base lg:text-lg mb-2">Kottayam</p>
            <p className="text-sm md:text-base lg:text-lg mb-2">
              Language : {details.language}
            </p>

            <p className="text-xl mb-4">Description</p>
            <p className="text-sm md:text-sm lg:text-sm mb-4 line-clamp-3">
              {details.description}
            </p>

            <p className="text-xl mb-4">Contact details</p>
            <p className="text-sm md:text-sm lg:text-sm mb-4 line-clamp-3">
              Theater name: {details.name} , Phone : {details.phone}
            </p>

            <button
              className="w-full px-4 py-2 border border-secondary rounded font-bold cursor-pointer"
              onClick={() => handleBooking()}
            >
              Book Now
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
       <h1 className="text-secondary font-bold text-2xl text-center">
        shows
       </h1>
      <Seats />
      <h1 className="text-secondary font-bold text-2xl text-center">
        reviews
       </h1>
      <Review/>
    </>
  );
}

export default Details;
