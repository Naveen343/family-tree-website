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


const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
          <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
          <Route path="/contact" element={<div>Contact Page (Coming Soon)</div>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/uploads" element={<UploadDashboard />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/family-tree" element={<FamilyTree />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
