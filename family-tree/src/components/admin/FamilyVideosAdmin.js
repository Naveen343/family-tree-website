import { useState } from "react";
import supabase from "../../lib/supabaseClient";
import { validateVideoFile } from "../../lib/fileValidation";
import {
  useFamilyVideos,
  useAddFamilyVideo,
  useUpdateFamilyVideo,
  useDeleteFamilyVideo,
} from "../../hooks/useFamilyVideos";

const inputClasses =
  "w-full bg-[#16202B] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-secondary";

export default function FamilyVideosAdmin() {
  const { data: videos, isLoading } = useFamilyVideos();
  const addVideo = useAddFamilyVideo();
  const updateVideo = useUpdateFamilyVideo();
  const deleteVideo = useDeleteFamilyVideo();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validationError = validateVideoFile(file);
    if (validationError) {
      alert(validationError);
      e.target.value = "";
      return;
    }

    setUploading(true);
    const path = `family-videos/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("homepage-media")
      .upload(path, file, { cacheControl: "3600", contentType: file.type });

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      e.target.value = "";
      return;
    }

    const { data: publicData } = supabase.storage.from("homepage-media").getPublicUrl(path);
    try {
      await addVideo.mutateAsync({
        title: title.trim() || null,
        description: description.trim() || null,
        video_url: publicData.publicUrl,
        published: false,
      });
      setTitle("");
      setDescription("");
    } catch (err) {
      const message =
        err?.message ||
        "the family_videos table may not be set up yet — run api/supabase/sql/006_matrimony_photos_and_videos.sql in the Supabase SQL editor.";
      alert("Could not save video: " + message);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    await deleteVideo.mutateAsync(id);
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold mb-2 text-secondary">Family Videos</h2>
      <p className="text-gray-400 text-sm mb-6">
        Shown on the Family History page, before Key Figures. Videos over 100MB won't upload —
        compress larger files first.
      </p>

      <div className="bg-[#16202B] border border-white/5 p-4 rounded-xl shadow mb-6 space-y-3">
        <div>
          <label className="block font-medium mb-1 text-white/90 text-sm">Title (optional)</label>
          <input className={inputClasses} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium mb-1 text-white/90 text-sm">Description (optional)</label>
          <textarea
            className={inputClasses}
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label className="cursor-pointer inline-block bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition">
          {uploading ? "Uploading…" : "Upload Video"}
          <input type="file" accept="video/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (videos || []).length === 0 ? (
        <p className="text-gray-400">No videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="border border-white/5 bg-[#16202B] rounded-xl shadow p-4">
              <video src={video.video_url} controls className="w-full rounded-lg mb-3 bg-black" />
              <h3 className="text-white font-semibold">{video.title || "Untitled"}</h3>
              {video.description && <p className="text-sm text-gray-400 mt-1">{video.description}</p>}
              <div className="flex items-center justify-between mt-3">
                <label className="flex items-center gap-2 text-sm text-white/90">
                  <input
                    type="checkbox"
                    checked={video.published}
                    onChange={(e) => updateVideo.mutate({ id: video.id, published: e.target.checked })}
                  />
                  Published
                </label>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="text-red-400 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
