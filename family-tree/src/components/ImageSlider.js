import { useEffect, useState } from "react";

const ImageSlider = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out

      setTimeout(() => {
        // Move to next pair or remaining one
        const nextIndex = startIndex + 2 < images.length ? startIndex + 2 : 0;
        setStartIndex(nextIndex);
        setFade(true); // Fade-in new images
      }, 200);
    }, 4000);

    return () => clearInterval(interval);
  }, [startIndex, images.length]);

  const getCurrentSlide = () => {
    // Handle last slide when odd number
    if (startIndex + 1 === images.length) {
      return [images[startIndex]];
    }

    return images.slice(startIndex, startIndex + 2);
  };

  const displayed = getCurrentSlide();

  return (
    <div
      className={`flex justify-center flex-wrap gap-3 transition-opacity duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayed.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          className="w-60 h-68 object-cover rounded"
        />
      ))}
    </div>
  );
};

export default ImageSlider;
