import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

const UploadDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  // Video states
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Hero Image states
  const [heroImages, setHeroImages] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const sliderFolders = [
    "spiritual-fathers",
    "guardians",
    "youth-wing",
    "committe-members",
  ];
  const [sliderImages, setSliderImages] = useState({});
  const [uploadingSlider, setUploadingSlider] = useState("");

  const videoFilename = "videos/family-video.mp4";

  // ------------------- Video Functions -------------------
  const fetchVideo = async () => {
    const { data, error } = await supabase
      .storage
      .from("homepage-media")
      .list("videos", { search: "family-video.mp4" });

    const exists = data?.some((file) => file.name === "family-video.mp4");

    if (exists) {
      const { data: publicData } = supabase
        .storage
        .from("homepage-media")
        .getPublicUrl(videoFilename);
      setVideoUrl(publicData.publicUrl);
    } else {
      setVideoUrl("");
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.includes("video")) return;

    setUploadingVideo(true);
    const { error } = await supabase.storage
      .from("homepage-media")
      .upload(videoFilename, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type,
      });

    if (error) alert("Upload failed: " + error.message);
    else fetchVideo();

    setUploadingVideo(false);
  };

  const handleVideoDelete = async () => {
    const { error } = await supabase.storage
      .from("homepage-media")
      .remove([videoFilename]);
    if (error) alert("Delete failed: " + error.message);
    else setVideoUrl("");
  };

  // ------------------- Slider Image Functions -------------------
  const fetchSliderImages = async () => {
    const all = {};
    for (const folder of sliderFolders) {
      const { data, error } = await supabase.storage.from("homepage-media").list(folder);
      if (!error && data.length) {
        const urls = await Promise.all(
          data.map(async (file) => {
            const { data: publicData } = supabase
              .storage
              .from("homepage-media")
              .getPublicUrl(`${folder}/${file.name}`);
            return { name: file.name, url: publicData.publicUrl };
          })
        );
        all[folder] = urls;
      } else {
        all[folder] = [];
      }
    }
    setSliderImages(all);
  };

  const handleSliderUpload = async (folder, e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const filename = `${folder}/${Date.now()}-${file.name}`;
    setUploadingSlider(folder);

    const { error } = await supabase.storage
      .from("homepage-media")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) alert("Slider image upload failed: " + error.message);
    else await fetchSliderImages();

    setUploadingSlider("");
  };

  const handleSliderDelete = async (folder, filename) => {
    const { error } = await supabase
      .storage
      .from("homepage-media")
      .remove([`${folder}/${filename}`]);

    if (error) alert("Slider image delete failed: " + error.message);
    else await fetchSliderImages();
  };

  // ------------------------------------------------------------

  // ------------------- Hero Image Functions -------------------
  const fetchHeroImages = async () => {
    const { data, error } = await supabase
      .storage
      .from("homepage-media")
      .list("hero");

    if (error) {
      console.error("Error fetching images", error.message);
      return;
    }

    const urls = await Promise.all(
      data.map(async (file) => {
        const { data: publicData } = supabase
          .storage
          .from("homepage-media")
          .getPublicUrl(`hero/${file.name}`);
        return { name: file.name, url: publicData.publicUrl };
      })
    );

    setHeroImages(urls);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const filename = `hero/${Date.now()}-${file.name}`;

    setUploadingImage(true);
    const { error } = await supabase.storage
      .from("homepage-media")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) alert("Image upload failed: " + error.message);
    else fetchHeroImages();

    setUploadingImage(false);
  };

  const handleImageDelete = async (filename) => {
    const { error } = await supabase.storage
      .from("homepage-media")
      .remove([`hero/${filename}`]);

    if (error) alert("Delete failed: " + error.message);
    else fetchHeroImages();
  };

  // ------------------- Effect -------------------
  useEffect(() => {
    if (activeTab === "home") {
      fetchVideo();
      fetchHeroImages();
      fetchSliderImages();
    }
  }, [activeTab]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
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
        {/* ---------- HOME TAB ---------- */}
        {activeTab === "home" && (
          <>
            {/* Homepage Video */}
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
            <div className="flex gap-4 flex-wrap mb-8">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {uploadingVideo ? "Uploading..." : "Upload Video"}
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>
              {videoUrl && (
                <button
                  onClick={handleVideoDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete Video
                </button>
              )}
            </div>

            {/* Hero Image Slideshow Upload */}
            <h2 className="text-xl font-bold mb-4">🖼 Advertisement Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {heroImages.map((img) => (
                <div key={img.name} className="relative group">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="rounded shadow w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => handleImageDelete(img.name)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              {uploadingImage ? "Uploading..." : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {/* ---------- Slider Image Uploads ---------- */}
            <h2 className="text-xl font-bold mb-6 mt-10">🖼 Slider Images</h2>
            {sliderFolders.map((folder) => (
              <div key={folder} className="mb-8">
                <h3 className="text-lg font-semibold mb-2 capitalize">
                  📂 {folder.replace(/-/g, " ")}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  {sliderImages[folder]?.map((img) => (
                    <div key={img.name} className="relative group">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="rounded shadow w-full h-36 object-cover"
                      />
                      <button
                        onClick={() => handleSliderDelete(folder, img.name)}
                        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>

                <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                  {uploadingSlider === folder ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleSliderUpload(folder, e)}
                  />
                </label>
              </div>
            ))}
          </>
        )}

        {/* ---------- FAMILY TREE TAB ---------- */}
        {activeTab === "family-tree" && (
          <div>
            <h2 className="text-xl font-bold mb-2">🌳 Family Tree Media</h2>
            <p className="text-gray-600">Media upload for the family tree section will go here.</p>
          </div>
        )}

        {/* ---------- NEWS & EVENTS TAB ---------- */}
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
