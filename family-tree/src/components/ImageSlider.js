import { useEffect, useState } from "react";

const ImageSlider = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (images.length <= 2) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const nextIndex = startIndex + 2 < images.length ? startIndex + 2 : 0;
        setStartIndex(nextIndex);
        setFade(true);
      }, 200);
    }, 4000);

    return () => clearInterval(interval);
  }, [startIndex, images.length]);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-40 rounded-xl border border-dashed border-white/15 text-white/40 text-sm">
        No photos yet
      </div>
    );
  }

  const getCurrentSlide = () => {
    if (startIndex + 1 === images.length) return [images[startIndex]];
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
          className="w-56 h-64 object-cover rounded-xl shadow-lg shadow-black/30 border border-white/10"
        />
      ))}
    </div>
  );
};

export default ImageSlider;
