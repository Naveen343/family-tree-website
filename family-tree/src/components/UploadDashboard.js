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

  // News state
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({ title: "", description: "", published: false });
  const [editingId, setEditingId] = useState(null);
  const [loadingNews, setLoadingNews] = useState(false);


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

  // ---------------- News & Events ----------------

  const fetchNews = async () => {
    setLoadingNews(true);
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
  
    if (error) {
      console.error("Error fetching news:", error.message);
    } else {
      setNewsList(data);
    }
    setLoadingNews(false);
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
  
    if (editingId) {
      const { error } = await supabase
        .from("news")
        .update(newNews)
        .eq("id", editingId);
  
      if (error) return alert("Update failed: " + error.message);
    } else {
      const { error } = await supabase
        .from("news")
        .insert([newNews]);
  
      if (error) {
          console.error("Insert error:", error);
          alert("Insert failed: " + (error.message || "Unknown error"));
          return;
        }
    }
  
    setNewNews({ title: "", description: "", published: false });
    setEditingId(null);
    fetchNews();
  };

  const handleDeleteNews = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this news item?");
    if (!confirmed) return;
  
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      fetchNews();
    }
  };
  

  const handleEditNews = (item) => {
    setNewNews({
      title: item.title,
      description: item.description,
      published: item.published,
    });
    setEditingId(item.id);
  };
    

  // ------------------- Effect -------------------
  useEffect(() => {
    if (activeTab === "home") {
      fetchVideo();
      fetchHeroImages();
      fetchSliderImages();
      fetchNews();
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
          <h2 className="text-xl font-bold mb-4">📰 Manage News & Events</h2>
        
          {/* Form */}
          <form onSubmit={handleNewsSubmit} className="bg-gray-100 p-4 rounded shadow mb-6">
            <div className="mb-2">
              <label className="block font-medium">Title</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={newNews.title}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={4}
                value={newNews.description}
                onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={newNews.published}
                onChange={(e) => setNewNews({ ...newNews, published: e.target.checked })}
              />
              <label>Published</label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingId ? "Update" : "Create"} News
            </button>
            {editingId && (
              <button
                type="button"
                className="ml-2 px-3 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => {
                  setNewNews({ title: "", description: "", published: false });
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        
          {/* News List */}
          {loadingNews ? (
            <p>Loading news...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsList.map((item) => (
                <div key={item.id} className="border rounded shadow p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-4">{item.description}</p>
                    <p className="text-xs text-gray-500">
                      Status:{" "}
                      <span className={`font-medium ${item.published ? "text-green-600" : "text-red-600"}`}>
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>        
        )}
      </div>
    </div>
  );
};

export default UploadDashboard;
