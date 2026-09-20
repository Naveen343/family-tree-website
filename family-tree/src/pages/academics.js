import { GraduationCap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import CommunityPostsSection from "../components/CommunityPostsSection";

export default function Academics() {
  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16">
        <PageHero
          eyebrow="Learning together"
          title="Academics"
          subtitle="Celebrating the educational achievements of Therampu Kudumbam members, and supporting the next generation through scholarships and mentorship."
        />

        <CommunityPostsSection
          category="academics"
          emptyIcon={GraduationCap}
          emptyText={
            <>
              No academic highlights published yet. Know a family member's achievement worth
              sharing, or need support with your studies? Reach out to the family committee —
              contact details are in the footer below.
            </>
          }
        />
      </div>
      <Footer />
    </>
  );
}
