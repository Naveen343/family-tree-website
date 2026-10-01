import { useEffect, useState } from "react";

const ImageSlider = ({ images, perPage = 2 }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (images.length <= perPage) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const nextIndex = startIndex + perPage < images.length ? startIndex + perPage : 0;
        setStartIndex(nextIndex);
        setFade(true);
      }, 200);
    }, 4000);

    return () => clearInterval(interval);
  }, [startIndex, images.length, perPage]);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-40 rounded-xl border border-dashed border-white/15 text-white/40 text-sm">
        No photos yet
      </div>
    );
  }

  const displayed = images.slice(startIndex, startIndex + perPage);

  return (
    <div
      className={`flex justify-center flex-wrap gap-3 transition-opacity duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayed.map((img, index) => (
        <div
          key={`${startIndex}-${index}`}
          className="w-56 rounded-xl shadow-lg shadow-black/30 border border-white/10 overflow-hidden bg-[#0e1620]"
        >
          <img src={img.src} alt={img.alt} className="block w-full h-auto" />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
