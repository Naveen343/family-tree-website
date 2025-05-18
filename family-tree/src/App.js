import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import VideoSection from "./components/VideoSection";
import FamilyIntroSection from "./components/FamilyIntroSection";
import Footer from "./components/Footer";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <VideoSection />
        <FamilyIntroSection />
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
          <Route path="/family-tree" element={<div>Family Tree Page (Coming Soon)</div>} />
          <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
          <Route path="/contact" element={<div>Contact Page (Coming Soon)</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
