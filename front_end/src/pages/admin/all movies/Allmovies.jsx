import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../globalcomponents/Header';

function AllMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/movies/getallmovies`);
        setMovies(response.data.data);
        console.log(response.data.data);
        
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='h-screen bg-white'>
      <Header />
      <h1 className="text-black font-bold text-2xl text-center pt-20 underline">
        All Movies
       </h1>
      <div className="overflow-x-auto pt-4">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Movie id</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Theatre</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={movie._id}>
                <th>{index + 1}</th>
                <td>{movie._id}</td>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.theatre}</td>
                <td>{movie.duration} mins</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllMovies;
