import { Film } from "lucide-react";
import { useFamilyVideos } from "../hooks/useFamilyVideos";
import VideoPlayerCard from "./VideoPlayerCard";

export default function FamilyVideoGrid() {
  const { data: videos, isLoading, isError } = useFamilyVideos();
  const published = (videos || []).filter((v) => v.published);

  if (isLoading || isError || published.length === 0) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-8">Family Videos</h2>
        <div className="text-center py-12 text-gray-400">
          <Film className="mx-auto mb-4 text-secondary/60" size={32} />
          {isError ? "Could not load videos right now." : "No videos published yet."}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-heading font-semibold text-secondary mb-8">Family Videos</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {published.map((video) => (
          <VideoPlayerCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
