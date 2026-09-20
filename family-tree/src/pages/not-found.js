import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <Compass className="mx-auto mb-6 text-secondary" size={48} />
          <p className="uppercase tracking-[0.3em] text-secondary/80 text-xs font-semibold mb-3">
            Error 404
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            This branch doesn&apos;t exist
          </h1>
          <p className="text-gray-300 leading-relaxed mb-8">
            The page you're looking for may have been moved or never existed. Let's get you back
            to familiar ground.
          </p>
          <Link
            to="/"
            className="inline-block bg-secondary text-[#16202B] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
