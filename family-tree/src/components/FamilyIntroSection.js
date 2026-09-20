import commonImage from "../assets/common-logo.png";

const FamilyIntroSection = () => {
  const families = [
    "Valiakalam",
    "Therampu",
    "Ariyappally",
    "Vaithara",
    "Vaitharamattom",
    "Iykkara",
    "Puramathara",
  ];

  return (
    <section className="bg-[#16202B] px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.25em] text-secondary text-xs font-semibold mb-3">
            Seven branches, one family
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Our Families</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {families.map((family) => (
            <div
              key={family}
              className="group bg-[#1E2A36] border border-white/5 rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg hover:shadow-black/30"
            >
              <img
                src={commonImage}
                alt={family}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full ring-2 ring-secondary/30 group-hover:ring-secondary transition-all mb-3"
              />
              <h3 className="text-sm md:text-base font-semibold text-white">{family}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyIntroSection;
