import React from "react";
import familyVideo from "../assets/family-video.mp4";
import logoImage from "../assets/family-logo.jpeg";


const VideoSection = () => {
  return (
    <section className="md:py-14 bg-white">
      <div className="container mx-auto px-4">

        {/* <div className="text-center mb-10">
          <img
              src={logoImage}
              alt="Family Legacy Logo"
              className={`w-[400px] h-[290px] transition-opacity duration-300 mx-auto`}
            />
        </div> */}

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Family Moments
          </h2>
          <p className="text-lg text-dark/80 max-w-3xl mx-auto">
            Capturing the special moments that make our family unique.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <div className="aspect-w-16 aspect-h-9 relative">
            <video 
              className="w-full h-full object-cover" 
              controls 
              autoPlay 
              loop 
              muted
            >
              <source 
                src={familyVideo} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="bg-light p-6">
            <h3 className="text-xl font-heading font-semibold text-primary mb-2">
              Family Fun Day
            </h3>
            <p className="text-dark/80">
              Creating beautiful memories together as a family, building bonds that will last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;