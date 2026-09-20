import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Avatar from "../components/Avatar";

const GENERATIONS = [
  {
    title: "1st Generation",
    text: "The pioneers who migrated and established the family roots.",
  },
  {
    title: "2nd Generation",
    text: "Expanded the family lands and passed down traditions of hospitality and faith.",
  },
  {
    title: "3rd Generation",
    text: "Pursued education and community leadership, setting the stage for modern growth.",
  },
];

const TIMELINE = [
  { year: "1701", text: "Our earliest known ancestor settles in the homeland." },
  { year: "1900", text: "Family expands across neighboring towns." },
  { year: "1950", text: "Modern education and careers bring new opportunities." },
  { year: "2000", text: "Family reunions become a yearly tradition, uniting generations." },
];

const KEY_FIGURES = [
  {
    name: "Itty Cheriyan",
    gender: "M",
    note: "Founder of the Therampu family, known for wisdom and leadership in the community.",
  },
  {
    name: "Mappottu Mappilaveedu",
    gender: "F",
    note: "Remembered as the root of the family, carrying forward its earliest traditions.",
  },
];

export default function FamilyHistory() {
  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16">
        <PageHero
          eyebrow="Our story"
          title="Our Family History"
          subtitle="Tracing the roots of our family through generations — stories of resilience, tradition, and unity that connect us across time."
        />

        {/* Origins */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-heading font-semibold text-secondary mb-4">The Origins</h2>
          <p className="leading-relaxed text-gray-300">
            Our story begins in the early 1700s, when our ancestors settled in Kumarakom and the
            surrounding villages of Kerala. They were farmers and craftsmen, building a foundation
            of hard work and faith that shaped the generations to come.
          </p>
        </section>

        {/* Generations */}
        <section className="bg-[#1E2A36] py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold text-secondary mb-8">Generations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {GENERATIONS.map((gen) => (
                <div
                  key={gen.title}
                  className="p-6 bg-[#16202B] border border-white/5 rounded-2xl shadow-md hover:border-secondary/30 transition-colors"
                >
                  <h3 className="text-xl font-heading font-semibold text-secondary">{gen.title}</h3>
                  <p className="mt-3 text-gray-300 leading-relaxed">{gen.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-heading font-semibold text-secondary mb-8">Timeline</h2>
          <ul className="space-y-8 border-l-2 border-secondary/40 pl-6">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-secondary" />
                <div className="text-secondary font-heading font-semibold text-lg">{item.year}</div>
                <p className="text-gray-300 mt-1">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Key Figures */}
        <section className="bg-[#1E2A36] py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold text-secondary mb-8">Key Figures</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {KEY_FIGURES.map((figure) => (
                <div
                  key={figure.name}
                  className="flex items-center gap-4 bg-[#16202B] border border-white/5 p-6 rounded-2xl shadow-md hover:border-secondary/30 transition-colors"
                >
                  <Avatar name={figure.name} gender={figure.gender} size={64} />
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-secondary">
                      {figure.name}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">{figure.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
