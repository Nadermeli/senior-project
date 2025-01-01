import React from "react";
import background from "../assets/background.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex h-[94vh]">
      <div className="relative h-full w-full max-h-[320px] md:max-h-full">
        <img
          src={background}
          className="h-full w-full object-cover"
          alt="Background Image"
        />
        <div className="absolute top-0 left-0 bg-black/50 h-full w-full"></div>
        <div className="flex flex-col items-center gap-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-special text-white text-center  ">
            Welcome to our Furniture Shop
          </h1>
          <Link
            className="button-primary text-center text-white lg:text-xl lg:min-w-32"
            to={"products"}
          >
            Explore!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
