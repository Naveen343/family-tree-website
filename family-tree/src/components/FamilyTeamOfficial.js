import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";
import ImageSlider from "./ImageSlider";
import logoImage from "../assets/family-logo.jpg";

/** helper to pull {src,alt} objects from a bucket folder */
const fetchImages = async (folder) => {
  const { data, error } = await supabase.storage.from("homepage-media").list(folder);

  if (error || !data) {
    console.error(`Error fetching ${folder}:`, error?.message);
    return [];
  }

  return Promise.all(
    data.map(async (file) => {
      const { data: pub } = supabase.storage.from("homepage-media").getPublicUrl(`${folder}/${file.name}`);
      return { src: pub.publicUrl, alt: file.name };
    })
  );
};

const FamilyTeamOfficial = () => {
  const [spiritualFathers, setSpiritualFathers] = useState([]);
  const [guardians, setGuardians] = useState([]);
  const [youthWing, setYouthWing] = useState([]);
  const [committee, setCommittee] = useState([]);

  useEffect(() => {
    fetchImages("spiritual-fathers").then(setSpiritualFathers);
    fetchImages("guardians").then(setGuardians);
    fetchImages("youth-wing").then(setYouthWing);
    fetchImages("committee-members").then(setCommittee);
  }, []);

  const renderRow = (leftTitle, leftImgs, rightTitle, rightImgs) => (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-6">
      <div className="w-full lg:basis-5/12 text-center">
        <h3 className="text-base md:text-lg font-semibold mb-5 whitespace-pre-line text-white">
          {leftTitle}
        </h3>
        <ImageSlider images={leftImgs} />
      </div>

      <div className="w-full lg:basis-2/12 flex justify-center flex-col items-center">
        <img
          src={logoImage}
          alt="Family Logo"
          className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full ring-2 ring-secondary/50"
        />
        <h5 className="text-sm font-semibold italic mt-3 text-center text-secondary">
          Family Logo
        </h5>
      </div>

      <div className="w-full lg:basis-5/12 text-center">
        <h3 className="text-base md:text-lg font-semibold mb-5 whitespace-pre-line text-white">
          {rightTitle}
        </h3>
        <ImageSlider images={rightImgs} />
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#16202B] px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {renderRow(
          "Our Spiritual Fathers\nആത്മീയ പിതാക്കന്മാർ",
          spiritualFathers,
          "Our Guardians\nരക്ഷാധികാരികൾ",
          guardians
        )}

        <div className="border-t border-white/10" />

        {renderRow(
          "Youth Wing – Since 2025\nCommittee Members 2025-2026\nPresent Office Bearers",
          youthWing,
          "Therampu Kudumpa Yogam\nCommittee Members 2025-2026\nPresent Office Bearers",
          committee
        )}
      </div>
    </section>
  );
};

export default FamilyTeamOfficial;
