import { useState } from "react";
import { Users, Grid3x3, ShieldCheck, X, Plus } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import MatrimonyInterestForm from "../components/MatrimonyInterestForm";
import MatrimonyGrid from "../components/MatrimonyGrid";

const STEPS = [
  {
    icon: Users,
    title: "Share your details",
    text: "Add your background, what you're looking for, and up to 4 photos.",
  },
  {
    icon: Grid3x3,
    title: "Listed for the family",
    text: "Your profile appears in the grid below for the Therampu family network to browse.",
  },
  {
    icon: ShieldCheck,
    title: "Your contact stays private",
    text: "Your phone and email are never shown publicly — reach out via the family committee.",
  },
];

export default function FamilyMatrimony() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16">
        <PageHero
          eyebrow="Within the family"
          title="Family Matrimony"
          subtitle="A community introduction board connecting eligible members of the Therampu Kudumbam network."
        />

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="bg-[#1E2A36] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <Icon size={18} className="text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-semibold text-secondary">Profiles</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-full hover:opacity-90 transition text-sm"
            >
              <Plus size={16} /> Add Your Profile
            </button>
          </div>

          <MatrimonyGrid />
        </section>
      </div>
      <Footer />

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] px-4">
          <div className="bg-[#1E2A36] border border-white/10 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between p-5 border-b border-white/10">
              <h3 className="text-lg font-heading font-semibold text-secondary">Add Your Profile</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5">
              <MatrimonyInterestForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
