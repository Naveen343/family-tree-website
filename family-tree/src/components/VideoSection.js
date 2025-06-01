import { useEffect, useState } from "react";
import logoImage from "../assets/family-logo.jpg";
import supabase from "../lib/supabaseClient";

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchVideoUrl = async (filename = "family-video.mp4") => {
    const { data } = supabase
      .storage
      .from("homepage-media")
      .getPublicUrl(`videos/${filename}`);

    setVideoUrl(data.publicUrl);
  };

  useEffect(() => {
    fetchVideoUrl(); // load default video on mount
  }, []);

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.includes("video")) return;

    const filename = `family-video.mp4`; // can make this dynamic if needed

    setUploading(true);

    const { error } = await supabase.storage
      .from("homepage-media")
      .upload(`videos/${filename}`, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      alert("Upload failed: " + error.message);
    } else {
      fetchVideoUrl(filename); // update video preview
    }

    setUploading(false);
  };

  return (
    <section className="md:py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
            Family Moments
          </h2>
          <p className="text-lg text-dark/80 max-w-3xl mx-auto mb-4">
            Capturing the special moments that make our family unique.
          </p>

          <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            {uploading ? "Uploading..." : "Upload Video"}
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </label>
        </div>

        {videoUrl && (
          <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <div className="aspect-w-16 aspect-h-9 relative">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                muted
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-light p-6">
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                Family Fun Day
              </h3>
              <p className="text-dark/80">
                Creating beautiful memories together as a family.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
