import { ShieldCheck, Users, HeartHandshake } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import MatrimonyInterestForm from "../components/MatrimonyInterestForm";

const STEPS = [
  {
    icon: Users,
    title: "Share your details",
    text: "Fill in the form below with your background and what you're looking for.",
  },
  {
    icon: ShieldCheck,
    title: "Reviewed privately",
    text: "Your submission goes only to the family committee — it is never published or shared publicly.",
  },
  {
    icon: HeartHandshake,
    title: "A personal introduction",
    text: "If there's a good match within the Therampu family network, the committee will reach out directly.",
  },
];

export default function FamilyMatrimony() {
  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16">
        <PageHero
          eyebrow="Within the family"
          title="Family Matrimony"
          subtitle="A private, committee-run introduction service connecting eligible members of the Therampu Kudumbam network."
        />

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
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

          <MatrimonyInterestForm />
        </section>
      </div>
      <Footer />
    </>
  );
}
