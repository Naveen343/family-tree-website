import logoImage from "../assets/family-logo.jpeg";
import guardian1 from "../assets/family-logo.jpeg";
import guardian2 from "../assets/family-logo.jpeg";
import guardian3 from "../assets/family-logo.jpeg";
import guardian4 from "../assets/family-logo.jpeg";
import spiritualFather1 from "../assets/family-logo.jpeg";
import spiritualFather2 from "../assets/family-logo.jpeg";
import spiritualFather3 from "../assets/family-logo.jpeg";

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
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={spiritualFather2}
                alt="Spiritual Father 2"
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={spiritualFather3}
                alt="Spiritual Father 3"
                className="w-28 h-36 object-cover rounded"
              />
            </div>
          </div>
  
          {/* Center Section - Logo */}
          <div className="w-full lg:basis-2/12 flex justify-center my-6 lg:my-0 pt-10">
            <img
              src={logoImage}
              alt="Family Logo"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
  
          {/* Right Section - Our Guardians */}
          <div className="w-full lg:basis-5/12 text-center">
            <h3 className="text-lg font-bold mb-4">
              Our Guardians <br /> രക്ഷിതാക്കൾ
            </h3>
            <div className="flex justify-center flex-wrap gap-3">
              <img
                src={guardian1}
                alt="Guardian 1"
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={guardian2}
                alt="Guardian 2"
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={guardian3}
                alt="Guardian 3"
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={guardian4}
                alt="Guardian 4"
                className="w-28 h-36 object-cover rounded"
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
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={spiritualFather2}
                alt="Spiritual Father 2"
                className="w-28 h-36 object-cover rounded"
              />
            </div>
          </div>
  
          {/* Center Section - Logo */}
          <div className="w-full lg:basis-2/12 flex justify-center my-6 lg:my-0 pt-10">
            <img
              src={logoImage}
              alt="Family Logo"
              className="w-32 h-32 object-cover rounded-full"
            />
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
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={guardian2}
                alt="Guardian 2"
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={guardian3}
                alt="Guardian 3"
                className="w-28 h-36 object-cover rounded"
              />
              <img
                src={guardian4}
                alt="Guardian 4"
                className="w-28 h-36 object-cover rounded"
              />
            </div>
          </div>
  
        </div>
      </div>
    //   second row
    );
  };
  
  export default FamilyTreeOfficial;
  
