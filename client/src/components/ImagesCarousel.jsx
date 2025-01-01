import React, { useState } from "react";
import { SOTRAGE_URL } from "../utils/ApiURL";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ImagesCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full max-w-full h-[250px]] md:h-[450px] lg:h-[550px] overflow-hidden rounded-md shadow-md ">
      <div className="carousel-images relative w-full h-full">
        <img
          src={`${SOTRAGE_URL}${images[currentIndex].image_url}`}
          alt="carousel-slide"
          className="w-[300px] md:w-[500px] lg:w-[700px] xl:w-[800px] lg:h-full h-[250px] md:h-[550px] object-fill transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Left arrow */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 text-lg  rounded-full p-2"
        onClick={prevSlide}
      >
        <MdKeyboardArrowLeft />
      </button>

      {/* Right arrow */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 text-lg rounded-full p-2"
        onClick={nextSlide}
      >
        <MdKeyboardArrowRight />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImagesCarousel;
