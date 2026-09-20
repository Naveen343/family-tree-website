import commonImage from "../assets/common-logo.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

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
        <PageHero
          eyebrow="Seven roots, one family"
          title="Our Family Branches"
          subtitle="The family tree spreads across seven distinct branches — each carrying forward its own traditions, values, and stories."
        />

        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          {branches.map((branch, idx) => (
            <section
              key={branch.name}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex-1">
                <span className="text-secondary/60 font-heading text-5xl font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-secondary mt-2 mb-4">
                  {branch.name}
                </h2>
                <p className="leading-relaxed text-gray-300">{branch.description}</p>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={commonImage}
                    alt={`${branch.name} ${i}`}
                    className="rounded-xl shadow-lg shadow-black/30 border border-white/5 object-cover aspect-square"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
