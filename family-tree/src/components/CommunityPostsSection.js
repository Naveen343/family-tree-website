import { useState } from "react";
import { X } from "lucide-react";
import { useCommunityPosts } from "../hooks/useCommunityPosts";

export default function CommunityPostsSection({ category, emptyIcon: EmptyIcon, emptyText }) {
  const { data: posts, isLoading, isError } = useCommunityPosts(category);
  const [selected, setSelected] = useState(null);

  const published = (posts || []).filter((p) => p.published);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {isLoading && <p className="text-center text-gray-400">Loading…</p>}

      {isError && (
        <p className="text-center text-red-400">Could not load this section right now.</p>
      )}

      {!isLoading && !isError && published.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          {EmptyIcon && <EmptyIcon className="mx-auto mb-4 text-secondary/60" size={36} />}
          {emptyText}
        </div>
      )}

      {!isLoading && !isError && published.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.map((post) => (
            <div
              key={post.id}
              className="bg-[#1E2A36] border border-white/5 rounded-2xl overflow-hidden hover:border-secondary/30 transition-colors shadow-md flex flex-col"
            >
              {post.image_url && (
                <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-heading font-semibold text-secondary mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                  {post.description}
                </p>
                <button
                  onClick={() => setSelected(post)}
                  className="mt-auto text-secondary text-sm font-semibold hover:underline text-left"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#1E2A36] border border-white/10 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative text-white max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {selected.image_url && (
              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-heading font-bold mb-4 text-secondary pr-6">
              {selected.title}
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {selected.description}
            </p>
            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-secondary hover:underline"
              >
                Learn more →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
