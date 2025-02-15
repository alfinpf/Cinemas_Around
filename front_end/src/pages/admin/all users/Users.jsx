import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../globalcomponents/Header';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/getallusers` ,{withCredentials:true});
        console.log(response.data.data);
        
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='h-screen bg-white'>
      <Header />
      <h1 className="text-black font-bold text-2xl text-center pt-20 underline">
        All Users
       </h1>
      <div className="overflow-x-auto pt-4">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <th>{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
