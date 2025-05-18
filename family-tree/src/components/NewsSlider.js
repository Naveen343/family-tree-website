export default function NewsSlider() {
  return (
    <div
      id="running-slider"
      className="fixed bottom-0 left-0 w-full z-50 overflow-hidden bg-primary text-white py-2 px-4 text-sm"
    >
      <div
        id="running-slider-floating-content"
        className="flex gap-8 animate-marquee whitespace-nowrap"
      >
        <div className="running-slider-single-news">
          <a
            href="https://pulikunnelkudumbayogam.com/..."
            target="_blank"
            rel="noopener noreferrer"
          >
            sample contents, therampu family
          </a>
        </div>
        <div className="running-slider-single-news">
          <a
            href="https://pulikunnelkudumbayogam.com/..."
            target="_blank"
            rel="noopener noreferrer"
          >
            എന്‍റെ കുടുംബം എത്ര മനോഹരം
          </a>
        </div>
        {/* Add more items here */}
      </div>
    </div>
  );
}
