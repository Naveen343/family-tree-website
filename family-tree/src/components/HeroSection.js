import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import supabase from "../lib/supabaseClient";
import KeralaBackdrop from "./KeralaBackdrop";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const fetchHeroImages = async () => {
    const { data, error } = await supabase.storage.from("homepage-media").list("hero");

    if (error) {
      console.error("Error fetching hero images:", error.message);
      return;
    }

    const urls = await Promise.all(
      (data || []).map(async (file) => {
        const { data: publicData } = supabase.storage
          .from("homepage-media")
          .getPublicUrl(`hero/${file.name}`);
        return publicData.publicUrl;
      })
    );

    setImages(urls);
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(slideInterval.current);
  }, [images]);

  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="w-full bg-[#16202B] md:h-[92vh] md:min-h-[560px] grid grid-cols-1 md:grid-cols-2">
      {/* Left: headline + quote */}
      <div className="relative overflow-hidden order-1 bg-[#16202B]">
        <KeralaBackdrop />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 pt-28 pb-44 md:py-0">
          <p className="uppercase tracking-[0.3em] text-secondary text-xs md:text-sm font-semibold mb-4">
            Therampu Kudumbam &middot; Est. 1701
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Tradition, Lineage, Ancestors
          </h1>
          <div className="w-16 h-1 bg-secondary rounded-full mb-6" />
          <p className="text-white/80 text-lg md:text-xl italic leading-relaxed max-w-xl">
            The key to deep family bonds.
            <br />
            <span lang="ml">
              പാരമ്പര്യം, വംശം, പൂർവ്വികർ : ആഴത്തിലുള്ള കുടുംബബന്ധങ്ങളുടെ താക്കോൽ.
            </span>
          </p>
        </div>
      </div>

      {/* Right: image carousel (no dimming) */}
      <div className="relative order-2 h-[60vh] md:h-full bg-[#0e161e] overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Family moment ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              aria-label="Previous slide"
              className="absolute top-1/2 left-3 md:left-4 z-20 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 md:p-3 rounded-full transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next slide"
              className="absolute top-1/2 right-3 md:right-4 z-20 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 md:p-3 rounded-full transition-colors"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-secondary w-8" : "bg-white/50 w-4 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
