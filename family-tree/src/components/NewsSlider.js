import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";
import supabase from "../lib/supabaseClient";

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
    <div className="sticky top-[57px] md:top-[61px] z-40 overflow-hidden bg-[#0e161e] border-b border-white/10 text-white py-2 px-4 text-sm">
      <div className="flex gap-8 animate-marquee whitespace-nowrap items-center">
        <Megaphone size={14} className="text-secondary shrink-0" />
        {newsItems.map((item) => (
          <a key={item.id} href="/news-events" className="hover:text-secondary transition-colors">
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}
