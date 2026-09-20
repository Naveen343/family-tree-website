import { Link } from "react-router-dom";
import { Users, TreePine, HeartHandshake, Landmark } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useFamilyMembers } from "../hooks/useFamilyMembers";

const BRANCHES = [
  "Valiakalam",
  "Therampu",
  "Ariyappally",
  "Vaithara",
  "Vaitharamattom",
  "Iykkara",
  "Puramathara",
];

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "Love and Respect",
    text: "The foundation of every relationship across our generations.",
  },
  {
    icon: Landmark,
    title: "Service to Others",
    text: "Giving back to our community through charity and mutual support.",
  },
  {
    icon: TreePine,
    title: "Continuity",
    text: "Recording and passing down our lineage, so no story is lost.",
  },
];

export default function About() {
  const { data: people } = useFamilyMembers();

  const founder = people?.reduce(
    (earliest, p) => (p.birth_year && (!earliest || p.birth_year < earliest.birth_year) ? p : earliest),
    null
  );

  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16">
        <PageHero
          eyebrow="Who we are"
          title="About Therampu Kudumbam"
          subtitle="Preserving our family history and connecting generations through shared stories and memories, since 1701."
        />

        {/* Stats */}
        <section className="border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-heading font-bold text-secondary">1701</p>
              <p className="text-gray-400 text-sm mt-1">Founded</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-secondary">{BRANCHES.length}</p>
              <p className="text-gray-400 text-sm mt-1">Family Branches</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-secondary">
                {people?.length ?? "—"}
              </p>
              <p className="text-gray-400 text-sm mt-1">Members Recorded</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-secondary">
                {founder ? new Date().getFullYear() - founder.birth_year : "—"}
              </p>
              <p className="text-gray-400 text-sm mt-1">Years of Legacy</p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-heading font-semibold text-secondary mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            Therampu Kudumbam traces its roots to Kumarakom, Kerala, beginning with{" "}
            {founder ? founder.display_name : "Itty Cheriyan"} in {founder?.birth_year ?? 1701}.
            Over three centuries, the family has grown into seven distinct branches, each carrying
            forward its own traditions while remaining part of one shared lineage. Today, the
            Therampu Kudumba Yogam — our family association — keeps that lineage alive through an
            annual gathering, a recorded family tree, and committees dedicated to our elders, our
            youth, and our community.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/family-history"
              className="inline-block bg-secondary text-[#16202B] font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition text-sm"
            >
              Read our History
            </Link>
            <Link
              to="/family-tree"
              className="inline-block bg-white/10 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-white/20 transition text-sm"
            >
              Explore the Family Tree
            </Link>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#1E2A36] py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold text-secondary mb-8 text-center">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-[#16202B] border border-white/5 rounded-2xl p-6 text-center">
                  <Icon className="mx-auto mb-3 text-secondary" size={28} />
                  <h3 className="font-heading font-semibold text-white mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branches */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-heading font-semibold text-secondary mb-6 flex items-center gap-2">
            <Users size={22} /> Seven Branches, One Family
          </h2>
          <div className="flex flex-wrap gap-3">
            {BRANCHES.map((b) => (
              <span
                key={b}
                className="bg-white/5 border border-white/10 text-gray-200 text-sm px-4 py-2 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Read more about each branch on the{" "}
            <Link to="/family-branches" className="text-secondary hover:underline">
              Family Branches
            </Link>{" "}
            page.
          </p>
        </section>

        {/* Governance */}
        <section className="bg-[#1E2A36] py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-semibold text-secondary mb-4">
              Our Association
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Therampu Kudumba Yogam is guided by our Spiritual Fathers and Guardians, run day
              to day by an elected committee, and carried forward by an active Youth Wing. You can
              see the current office bearers on our{" "}
              <Link to="/" className="text-secondary hover:underline">
                home page
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-heading font-semibold text-secondary mb-3">Get in Touch</h2>
          <p className="text-gray-300 mb-2">Phone: +91 456-7890</p>
          <p className="text-gray-300">Email: therampu@gmail.com</p>
        </section>
      </div>
      <Footer />
    </>
  );
}
