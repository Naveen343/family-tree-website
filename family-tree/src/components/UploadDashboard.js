import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

const UploadDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const filename = "videos/family-video.mp4";

  const fetchVideo = async () => {
    const { data, error } = await supabase
      .storage
      .from("homepage-media")
      .list("videos", {
        search: "family-video.mp4",
      });
  
    const exists = data?.some(file => file.name === "family-video.mp4");
  
    if (exists) {
      const { data: publicData } = supabase
        .storage
        .from("homepage-media")
        .getPublicUrl("videos/family-video.mp4");
      setVideoUrl(publicData.publicUrl);
    } else {
      setVideoUrl("");
    }
  };
  

  useEffect(() => {
    if (activeTab === "home") fetchVideo();
  }, [activeTab]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.includes("video")) return;

    setUploading(true);
    const { error } = await supabase.storage
      .from("homepage-media")
      .upload(filename, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type,
      });

    if (error) alert("Upload failed: " + error.message);
    else fetchVideo();

    setUploading(false);
  };

  const handleDelete = async () => {
    const { error } = await supabase.storage.from("homepage-media").remove([filename]);
    if (error) alert("Delete failed: " + error.message);
    else setVideoUrl("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">📁 Upload Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {["home", "family-tree", "news-events"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab === "home"
              ? "Home"
              : tab === "family-tree"
              ? "Family Tree"
              : "News & Events"}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Home Tab */}
        {activeTab === "home" && (
          <>
            <h2 className="text-xl font-bold mb-4">📽 Homepage Video</h2>
            {videoUrl && (
              <video
                className="mb-4 w-full max-w-md rounded shadow"
                src={videoUrl}
                controls
                loop
                muted
              />
            )}
            <div className="flex gap-4 flex-wrap">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {uploading ? "Uploading..." : "Upload Video"}
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
              {videoUrl && (
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete Video
                </button>
              )}
            </div>
          </>
        )}

        {/* Family Tree Tab */}
        {activeTab === "family-tree" && (
          <div>
            <h2 className="text-xl font-bold mb-2">🌳 Family Tree Media</h2>
            <p className="text-gray-600">Media upload for the family tree section will go here.</p>
          </div>
        )}

        {/* News & Events Tab */}
        {activeTab === "news-events" && (
          <div>
            <h2 className="text-xl font-bold mb-2">📰 News & Events</h2>
            <p className="text-gray-600">Media upload for news and event highlights will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDashboard;
