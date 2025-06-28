import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient"; // adjust path if needed

export default function NewsSlider() {
  const [newsItems, setNewsItems] = useState([]);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("id, title, link")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error.message);
      return;
    }

    setNewsItems(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (!newsItems.length) return null;

  return (
    <>
    <div
      id="running-slider"
      className="fixed top-20 left-0 w-full z-40 overflow-hidden bg-primary text-white py-2 px-4 text-sm md:hidden"
    >
      <div
        id="running-slider-floating-content"
        className="flex gap-8 animate-marquee whitespace-nowrap"
      >
        Tradition, Lineage, Ancestors : Key to deep family bonds. പാരമ്പര്യം, വംശം, പൂർവ്വികർ : ആഴത്തിലുള്ള കുടുംബബന്ധങ്ങളുടെ താക്കോൽ.
      </div>
    </div>

    
    <div
      id="running-slider"
      className="fixed bottom-0 left-0 w-full z-50 overflow-hidden bg-primary text-white py-2 px-4 text-sm"
    >
      <div
        id="running-slider-floating-content"
        className="flex gap-8 animate-marquee whitespace-nowrap"
      >
        {newsItems.map((item) => (
          <div key={item.id} className="running-slider-single-news">
            <a
              href="/news-events"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
