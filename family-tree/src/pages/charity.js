import { HandHeart } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import CommunityPostsSection from "../components/CommunityPostsSection";

export default function Charity() {
  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16">
        <PageHero
          eyebrow="Giving back"
          title="Charity"
          subtitle="Therampu Kudumbam supports members and the wider community in times of need — through direct aid, scholarships, and shared initiatives led by the family committee."
        />

        <CommunityPostsSection
          category="charity"
          emptyIcon={HandHeart}
          emptyText={
            <>
              No charity initiatives published yet. If you'd like to propose or support one,
              reach out to the family committee — contact details are in the footer below.
            </>
          }
        />
      </div>
      <Footer />
    </>
  );
}
