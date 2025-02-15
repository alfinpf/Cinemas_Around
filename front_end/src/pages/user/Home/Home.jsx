import React from "react";
import Carousel from "./components/Carousel";
import Header from "../../../globalComponents/Header";
import Footer from "../../../globalComponents/Footer";
import Cards from "./components/Cards";

function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <h1 className="text-secondary font-bold text-3xl text-center pt-4 md:pt-8">
        Latest cinemas
      </h1>
      <Cards />
      <Footer />
    </div>
  );
}

export default Home;
