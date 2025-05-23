import React, { useState, useEffect, useRef } from "react";
import img1 from "../assets/slide1.jpg";
import img2 from "../assets/slide2.jpg";
import img3 from "../assets/slide3.jpg";
import img4 from "../assets/slide4.jpg";

const images = [img1, img2, img3, img4];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideInterval.current = setInterval(goToNext, 4000);
    return () => clearInterval(slideInterval.current);
  }, []);

  return (
    <section className="relative w-full" style={{ height: "calc(96vh)" }}>
      <div className="absolute inset-0 bg-black opacity-65 z-10"></div>

      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Arrow Buttons */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-30 px-3 pb-[8px] rounded-full hover:bg-opacity-60"
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-30 px-3 pb-[8px] rounded-full hover:bg-opacity-60"
      >
        &#8594;
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      {/* QUOTE BOX */}
      <div className="absolute bottom-16 italic font-serif left-6 md:left-12 w-[340px] md:w-[400px] h-auto bg-opacity-100 p-4 text-base md:text-2xl font-bold z-20 text-white">
        <div>
          Tradition, Lineage, Ancestors :<br />
          Key to deep family bonds.<br />
          പാരമ്പര്യം, വംശം, പൂർവ്വികർ :<br />
          ആഴത്തിലുള്ള കുടുംബബന്ധങ്ങളുടെ താക്കോൽ.<br />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
