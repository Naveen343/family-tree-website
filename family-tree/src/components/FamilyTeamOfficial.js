import logoImage from "../assets/family-logo.jpg";
import guardian1 from "../assets/family-logo.jpg";
import guardian2 from "../assets/family-logo.jpg";
import guardian3 from "../assets/family-logo.jpg";
import guardian4 from "../assets/family-logo.jpg";
import spiritualFather1 from "../assets/spone.jpeg";
import spiritualFather2 from "../assets/sptwo.jpeg";
import spiritualFather3 from "../assets/spthree.jpeg";
import spiritualFather4 from "../assets/spfour.jpeg";

const FamilyTreeOfficial = () => {
    return (
      <div className="w-full px-4 py-8">
        {/* first row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Left Section - Our Spiritual Fathers */}
          <div className="w-full lg:basis-5/12 text-center">
            <h3 className="text-lg font-bold mb-4">
              Our Spiritual Fathers <br /> ആത്മീയ പിതാക്കന്മാർ
            </h3>
            <div className="flex justify-center flex-wrap gap-3">
              <img
                src={spiritualFather1}
                alt="Spiritual Father 1"
                className="w-60 h-68 object-cover rounded"
              />
              <img
                src={spiritualFather2}
                alt="Spiritual Father 2"
                className="w-60 h-68 object-cover rounded"
              />
            </div>
          </div>
  
          {/* Center Section - Logo */}
          <div className="w-full lg:basis-2/12 flex justify-center my-6 lg:my-0 pt-10 flex-col">
            <img
              src={logoImage}
              alt="Family Logo"
              className="w-58 h-58 object-cover rounded-full"
            />
            <h5 className="text-lg font-bold italic mt-3 text-center mr-3">Family Logo</h5>
          </div>
  
          {/* Right Section - Our Guardians */}
          <div className="w-full lg:basis-5/12 text-center">
            <h3 className="text-lg font-bold mb-4">
              Our Guardians <br /> രക്ഷാധികാരികൾ
            </h3>
            <div className="flex justify-center flex-wrap gap-3">
              <img
                src={guardian1}
                alt="Guardian 1"
                className="w-60 h-68 object-cover rounded"
              />
              <img
                src={guardian2}
                alt="Guardian 2"
                className="w-60 h-68 object-cover rounded"
              />
            </div>
          </div>
  
        </div>

        {/* second row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-20">
          
          {/* Left Section - Our Spiritual Fathers */}
          <div className="w-full lg:basis-5/12 text-center">
            <h3 className="text-lg font-bold mb-4">
              Youth Wing - Since 2025<br />
              Commity Members : 2025 - 2026 <br />
              Present Office Bearers
            </h3>
            <div className="flex justify-center flex-wrap gap-3">
              <img
                src={spiritualFather1}
                alt="Spiritual Father 1"
                className="w-60 h-68 object-cover rounded"
              />
              <img
                src={spiritualFather2}
                alt="Spiritual Father 2"
                className="w-60 h-68 object-cover rounded"
              />
            </div>
          </div>
  
          {/* Center Section - Logo */}
          <div className="w-full lg:basis-2/12 flex justify-center my-6 lg:my-0 pt-10 flex-col">
            <img
              src={logoImage}
              alt="Family Logo"
              className="w-58 h-58 object-cover rounded-full"
            />
            <h5 className="text-lg font-bold italic mt-3 text-center mr-3">Family Logo</h5>
          </div>
  
          {/* Right Section - Our Guardians */}
          <div className="w-full lg:basis-5/12 text-center">
            <h3 className="text-lg font-bold mb-4">
              Therampu Kudumpa Yogam <br /> 
              Commity Members : 2025 - 2026 <br />
              Present Office Bearers
            </h3>
            <div className="flex justify-center flex-wrap gap-3">
              <img
                src={guardian1}
                alt="Guardian 1"
                className="w-60 h-68 object-cover rounded"
              />
              <img
                src={guardian2}
                alt="Guardian 2"
                className="w-60 h-68 object-cover rounded"
              />
            </div>
          </div>
  
        </div>
      </div>
    //   second row
    );
  };
  
  export default FamilyTreeOfficial;
  
