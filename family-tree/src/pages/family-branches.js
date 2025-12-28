import commonImage from "../assets/common-logo.png";
import Header from "../components/Header";


const branches = [
  {
    name: "Valiakalam",
    description:
      "The Valiakalam branch is known for its legacy of leadership, deeply rooted traditions, and contributions to community growth.",
  },
  {
    name: "Therampu",
    description:
      "Therampu has a long history of resilience, with generations focusing on education and cultural preservation.",
  },
  {
    name: "Ariyappally",
    description:
      "The Ariyappally branch carries forward values of faith and craftsmanship, building strong family ties across generations.",
  },
  {
    name: "Vaithara",
    description:
      "Known for its hospitality, Vaithara has nurtured countless gatherings and celebrations over the years.",
  },
  {
    name: "Vaitharamattom",
    description:
      "The Vaitharamattom branch emphasizes charity and compassion, leaving a legacy of service to society.",
  },
  {
    name: "Iykkara",
    description:
      "Iykkara is remembered for its traditions in farming and land stewardship, sustaining the family for decades.",
  },
  {
    name: "Puramathara",
    description:
      "The Puramathara branch has excelled in education, business, and leadership, playing key roles in shaping the future.",
  },
];

export default function FamilyBranches() {
  return (
    <>
    <Header />
    <div className="bg-[#16202B] min-h-screen text-white mt-16">
      {/* Hero */}
      <section className="bg-[#1E2A36] text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">
          Our Family Branches
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          The family tree spreads across seven distinct branches — each carrying
          forward its own traditions, values, and stories.
        </p>
      </section>

      {/* Branch Sections */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {branches.map((branch, idx) => (
          <section
            key={branch.name}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Text */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-secondary mb-4">
                {branch.name}
              </h2>
              <p className="leading-relaxed">{branch.description}</p>
            </div>

            {/* Images */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={commonImage}
                  alt={`${branch.name} ${i}`}
                  className="rounded-xl shadow-md object-cover"
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Therampu Kudumbam. All Rights Reserved.
      </footer>
    </div>
    </>
  );
}
