import logoImage from "../assets/family-logo.jpeg";


const FamilyIntroSection = () => {
  const families = Array.from({ length: 8 }, (_, i) => `Family ${i + 1}`);

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Our Families</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {families.map((family, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center"
          >
            <h3 className="text-lg font-semibold mb-2">{family}</h3>
            <img
              src={logoImage}
              alt={family}
              className="w-[120px] h-[120px] object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default FamilyIntroSection;