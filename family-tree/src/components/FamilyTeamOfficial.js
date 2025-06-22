import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";
import ImageSlider from "./ImageSlider";
import logoImage from "../assets/family-logo.jpg";

/** helper to pull {src,alt} objects from a bucket folder */
const fetchImages = async (folder) => {
  const { data, error } = await supabase
    .storage
    .from("homepage-media")
    .list(folder);

  if (error || !data) {
    console.error(`Error fetching ${folder}:`, error?.message);
    return [];
  }

  return Promise.all(
    data.map(async (file) => {
      const { data: pub } = supabase
        .storage
        .from("homepage-media")
        .getPublicUrl(`${folder}/${file.name}`);
      return { src: pub.publicUrl, alt: file.name };
    })
  );
};

const FamilyTreeOfficial = () => {
  // four independent slider groups
  const [spiritualFathers, setSpiritualFathers] = useState([]);
  const [guardians,        setGuardians]        = useState([]);
  const [youthWing,        setYouthWing]        = useState([]);
  const [committee,        setCommittee]        = useState([]);

  useEffect(() => {
    fetchImages("spiritual-fathers").then(setSpiritualFathers);
    fetchImages("guardians").then(setGuardians);
    fetchImages("youth-wing").then(setYouthWing);
    fetchImages("committee-members").then(setCommittee);
  }, []);

  /* reusable row renderer */
  const renderRow = (leftTitle, leftImgs, rightTitle, rightImgs) => (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* LEFT slider */}
      <div className="w-full lg:basis-5/12 text-center">
        <h3 className="text-lg font-bold mb-4 whitespace-pre-line">{leftTitle}</h3>
        <ImageSlider images={leftImgs} />
      </div>

      {/* CENTER logo */}
      <div className="w-full lg:basis-2/12 flex justify-center my-6 lg:my-0 pt-10 flex-col">
        <img
          src={logoImage}
          alt="Family Logo"
          className="w-58 h-58 object-cover rounded-full"
        />
        <h5 className="text-lg font-bold italic mt-3 text-center">Family Logo</h5>
      </div>

      {/* RIGHT slider */}
      <div className="w-full lg:basis-5/12 text-center">
        <h3 className="text-lg font-bold mb-4 whitespace-pre-line">{rightTitle}</h3>
        <ImageSlider images={rightImgs} />
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 py-8">
      {/* First row */}
      {renderRow(
        "Our Spiritual Fathers\nആത്മീയ പിതാക്കന്മാർ",
        spiritualFathers,
        "Our Guardians\nരക്ഷാധികാരികൾ",
        guardians
      )}

      {/* Spacer */}
      <div className="h-20" />

      {/* Second row */}
      {renderRow(
        "Youth Wing – Since 2025\nCommittee Members 2025-2026\nPresent Office Bearers",
        youthWing,
        "Therampu Kudumpa Yogam\nCommittee Members 2025-2026\nPresent Office Bearers",
        committee
      )}
    </div>
  );
};

export default FamilyTreeOfficial;
