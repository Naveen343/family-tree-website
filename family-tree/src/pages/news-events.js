import { useState, useEffect } from "react";
import Header from "../components/Header";
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

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">📰 News & Events</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading news...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsList
              .filter((item) => item.published)
              .map((news) => (
                <div
                  key={news.id}
                  className="bg-white border border-gray-300 shadow-md rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                      {news.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {news.description?.length > 100
                        ? news.description.substring(0, 100) + "..."
                        : news.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => setSelectedNews(news)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Modal */}
        {selectedNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full relative">
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-2 right-3 text-gray-500 text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedNews.title}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedNews.description}
              </p>
              {selectedNews.link && (
                <a
                  href={selectedNews.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-blue-600 underline"
                >
                  Read More Online
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
