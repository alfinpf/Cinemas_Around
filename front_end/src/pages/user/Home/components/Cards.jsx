import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cards() {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/movies/getallmovies`
        );
        setCardsData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (id) => {
    navigate(`/details/${id}`);
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-10 p-6 ">
      {cardsData.map((card) => (
        <div
          key={card._id}
          className="card card-compact border w-[280px] shadow-xl text-secondary border-secondary "
        >
          <figure>
            <img src={card.imglink} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{card.title}</h2>
            <p>{card.description}</p>
            <div className="card-actions justify-center">
              <button
                onClick={() => {
                  handleButtonClick(card._id);
                }}
                className="bg-blue-700 text-white w-full p-2 rounded-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
