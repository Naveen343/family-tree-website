import logoImage from "../assets/family-logo.jpg";
import guardian1 from "../assets/family-logo.jpg";
import guardian2 from "../assets/family-logo.jpg";
import guardian3 from "../assets/family-logo.jpg";
import guardian4 from "../assets/family-logo.jpg";
import spiritualFather1 from "../assets/spone.jpeg";
import spiritualFather2 from "../assets/sptwo.jpeg";
import spiritualFather3 from "../assets/spthree.jpeg";
import spiritualFather4 from "../assets/spfour.jpeg";
import ImageSlider from "./ImageSlider";


const FamilyTreeOfficial = () => {
  const spiritualFathers = [
    { src: spiritualFather1, alt: "Spiritual Father 1" },
    { src: spiritualFather2, alt: "Spiritual Father 2" },
    { src: spiritualFather3, alt: "Spiritual Father 3" },
    { src: spiritualFather4, alt: "Spiritual Father 4" },
    { src: spiritualFather4, alt: "Spiritual Father 4" },
    
  ];

  const guardians = [
    { src: guardian1, alt: "Guardian 1" },
    { src: guardian2, alt: "Guardian 2" },
    { src: guardian3, alt: "Guardian 3" },
    { src: guardian4, alt: "Guardian 4" },
  ];

  return (
    <div className="w-full px-4 py-8">
      {/* First Row */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Left Section */}
        <div className="w-full lg:basis-5/12 text-center">
          <h3 className="text-lg font-bold mb-4">
            Our Spiritual Fathers <br /> ആത്മീയ പിതാക്കന്മാർ
          </h3>
          <ImageSlider images={spiritualFathers} />
        </div>

        {/* Center Section */}
        <div className="w-full lg:basis-2/12 flex justify-center my-6 lg:my-0 pt-10 flex-col">
          <img
            src={logoImage}
            alt="Family Logo"
            className="w-58 h-58 object-cover rounded-full"
          />
          <h5 className="text-lg font-bold italic mt-3 text-center mr-3">Family Logo</h5>
        </div>

        {/* Right Section */}
        <div className="w-full lg:basis-5/12 text-center">
          <h3 className="text-lg font-bold mb-4">
            Our Guardians <br /> രക്ഷാധികാരികൾ
          </h3>
          <ImageSlider images={guardians} />
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-20">
        {/* Left Section */}
        <div className="w-full lg:basis-5/12 text-center">
          <h3 className="text-lg font-bold mb-4">
            Youth Wing - Since 2025 <br />
            Committee Members : 2025 - 2026 <br />
            Present Office Bearers
          </h3>
          <ImageSlider images={spiritualFathers} />
        </div>

        {/* Center Section */}
        <div className="w-full lg:basis-2/12 flex justify-center my-6 lg:my-0 pt-10 flex-col">
          <img
            src={logoImage}
            alt="Family Logo"
            className="w-58 h-58 object-cover rounded-full"
          />
          <h5 className="text-lg font-bold italic mt-3 text-center mr-3">Family Logo</h5>
        </div>

        {/* Right Section */}
        <div className="w-full lg:basis-5/12 text-center">
          <h3 className="text-lg font-bold mb-4">
            Therampu Kudumpa Yogam <br />
            Committee Members : 2025 - 2026 <br />
            Present Office Bearers
          </h3>
          <ImageSlider images={guardians} />
        </div>
      </div>
    </div>
  );
};
  
export default FamilyTreeOfficial;
  
