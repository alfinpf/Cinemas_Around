import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../globalcomponents/Header';

function Request() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/requests/getall`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = (id) => {
    console.log(`Accepted request ${id}`);
    // Implement API call or state update logic
  };

  const handleDecline = (id) => {
    console.log(`Declined request ${id}`);
    // Implement API call or state update logic
  };

  return (
    <div className='bg-white h-screen'>
      <Header />
      <h1 className="text-black font-bold text-2xl text-center pt-20 underline">
        All Requests
       </h1>
      <div className="overflow-x-auto pt-4">
        {requests.length === 0 ? (
          <div className="card shadow-lg p-5 text-center">No Requests...</div>
        ) : (
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request.id}>
                  <th>{index + 1}</th>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>
                    <button onClick={() => handleAccept(request.id)} className="btn btn-success btn-xs mr-2">Accept</button>
                    <button onClick={() => handleDecline(request.id)} className="btn btn-error btn-xs">Decline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Request;
