import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import VideoSection from "./components/VideoSection";
import FamilyIntroSection from "./components/FamilyIntroSection";
import Footer from "./components/Footer";
import NewsSlider from "./components/NewsSlider";
import FamilyTeamOfficial from "./components/FamilyTeamOfficial";
import NotFound from "./pages/not-found";
import UploadDashboard from "./pages/uploads";
import NewsEvents from "./pages/news-events";
import FamilyTree from "./pages/family-tree";
import FamilyHistory from "./pages/family-history";
import FamilyBranches from "./pages/family-branches";
import FamilyByLaw from "./pages/family-bylaw";
import ComingSoon from "./pages/coming-soon";
import About from "./pages/about";
import Charity from "./pages/charity";
import Academics from "./pages/academics";
import FamilyMatrimony from "./pages/family-matrimony";




const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#16202B]">
      <Header />
      <NewsSlider />
      <main className="flex-grow">
        <HeroSection />
        <VideoSection />
        <FamilyIntroSection />
        <FamilyTeamOfficial />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/family-matrimony" element={<FamilyMatrimony />} />
          <Route path="/family-directory" element={<ComingSoon title="Family Directory" />} />
          <Route path="/family-ebook" element={<ComingSoon title="Family E-book" />} />
          <Route path="/uploads" element={<UploadDashboard />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/family-tree" element={<FamilyTree />} />
          <Route path="/family-history" element={<FamilyHistory />} />
          <Route path="/family-branches" element={<FamilyBranches />} />
          <Route path="/family-bylaw" element={<FamilyByLaw />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
