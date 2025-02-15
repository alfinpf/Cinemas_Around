import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../globalcomponents/Header';

function AllTheaters() {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/theatres/getalltheatres`,{ withCredentials: true});
        setTheaters(response.data.data);
        console.log(response.data.data);
        
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <div className='bg-white h-screen'>
      <Header />
      <h1 className="text-black font-bold text-2xl text-center pt-20 underline">
        All Theaters
       </h1>
      <div className="overflow-x-auto pt-4">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>isActive</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((theater, index) => (
              <tr key={theater._id}>
                <th>{index + 1}</th>
                <td>{theater._id}</td>
                <td>{theater.name}</td>
                <td>{theater.address}</td>
                <td>{theater.isActive.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllTheaters;
