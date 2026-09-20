import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const fetchVideo = async () => {
    const { data } = await supabase.storage.from("homepage-media").list("videos", {
      search: "family-video.mp4",
    });

    const exists = data?.some((file) => file.name === "family-video.mp4");

    if (exists) {
      const { data: publicData } = supabase.storage
        .from("homepage-media")
        .getPublicUrl("videos/family-video.mp4");
      setVideoUrl(`${publicData.publicUrl}?t=${Date.now()}`);
    } else {
      setVideoUrl("");
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  if (!videoUrl) return null;

  return (
    <section className="bg-[#1E2A36] py-16 md:py-20 px-6 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.25em] text-secondary text-xs font-semibold mb-3">
            Memories in motion
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Family Moments
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Capturing the special moments that make our family unique.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
          <div className="relative aspect-video bg-black">
            <video className="w-full h-full object-cover" controls autoPlay loop muted>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="bg-[#16202B] p-6">
            <h3 className="text-xl font-heading font-semibold text-secondary mb-2">
              Family Fun Day
            </h3>
            <p className="text-gray-300">
              Creating beautiful memories together as a family, building bonds that will last a
              lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
