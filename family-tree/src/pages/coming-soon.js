import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export default function ComingSoon({ title = "Coming Soon" }) {
  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16 flex flex-col">
        <PageHero
          eyebrow="Under construction"
          title={title}
          subtitle="This section of Therampu Kudumbam is being prepared. Please check back soon."
        />
        <div className="flex-grow flex items-center justify-center py-16 px-6">
          <div className="text-center">
            <Sparkles className="mx-auto mb-4 text-secondary" size={36} />
            <Link
              to="/"
              className="inline-block bg-secondary text-[#16202B] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
