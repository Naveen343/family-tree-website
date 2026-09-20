import { useState, useEffect } from "react";
import { Newspaper, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import supabase from "../lib/supabaseClient";

export default function NewsEvents() {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error.message);
    } else {
      setNewsList(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const published = newsList.filter((item) => item.published);

  return (
    <>
      <Header />
      <div className="bg-[#16202B] min-h-screen text-white mt-16">
        <PageHero
          eyebrow="Stay connected"
          title="News & Events"
          subtitle="Announcements, gatherings, and milestones from across the Therampu family."
        />

        <div className="max-w-6xl mx-auto px-6 py-16">
          {loading ? (
            <p className="text-center text-gray-400">Loading news…</p>
          ) : published.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Newspaper className="mx-auto mb-4 text-secondary/60" size={36} />
              No news published yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {published.map((news) => (
                <div
                  key={news.id}
                  className="bg-[#1E2A36] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-secondary/30 transition-colors shadow-md"
                >
                  <div>
                    <h2 className="text-lg font-heading font-semibold mb-2 text-secondary">
                      {news.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {news.description?.length > 100
                        ? news.description.substring(0, 100) + "..."
                        : news.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => setSelectedNews(news)}
                      className="bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition w-full"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#1E2A36] border border-white/10 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative text-white">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-heading font-bold mb-4 text-secondary pr-6">
              {selectedNews.title}
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {selectedNews.description}
            </p>
            {selectedNews.link && (
              <a
                href={selectedNews.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-secondary hover:underline"
              >
                Read More Online →
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
