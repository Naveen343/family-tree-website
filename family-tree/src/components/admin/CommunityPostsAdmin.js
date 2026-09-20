import { useState } from "react";
import {
  useCommunityPosts,
  useAddCommunityPost,
  useUpdateCommunityPost,
  useDeleteCommunityPost,
} from "../../hooks/useCommunityPosts";

const emptyForm = { title: "", description: "", link: "", image_url: "", published: false };

export default function CommunityPostsAdmin({ category, label }) {
  const { data: posts, isLoading } = useCommunityPosts(category);
  const addPost = useAddCommunityPost(category);
  const updatePost = useUpdateCommunityPost(category);
  const deletePost = useDeleteCommunityPost(category);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const inputClasses =
    "w-full bg-[#16202B] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-secondary";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePost.mutateAsync({ id: editingId, ...form });
    } else {
      await addPost.mutateAsync(form);
    }
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      description: post.description,
      link: post.link || "",
      image_url: post.image_url || "",
      published: post.published,
    });
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deletePost.mutateAsync(id);
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold mb-4 text-secondary">Manage {label}</h2>

      <form onSubmit={handleSubmit} className="bg-[#16202B] border border-white/5 p-4 rounded-xl shadow mb-6">
        <div className="mb-3">
          <label className="block font-medium mb-1 text-white/90">Title</label>
          <input
            className={inputClasses}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1 text-white/90">Description</label>
          <textarea
            className={inputClasses}
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block font-medium mb-1 text-white/90">Image URL</label>
            <input
              className={inputClasses}
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="https://…"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-white/90">Link (optional)</label>
            <input
              className={inputClasses}
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://…"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          <label className="text-white/90">Published</label>
        </div>
        <button
          type="submit"
          className="bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {isLoading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(posts || []).map((post) => (
            <div key={post.id} className="border border-white/5 bg-[#16202B] rounded-xl shadow p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">{post.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-4">{post.description}</p>
                <p className="text-xs text-gray-500">
                  Status:{" "}
                  <span className={`font-medium ${post.published ? "text-emerald-400" : "text-red-400"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                <button onClick={() => handleEdit(post)} className="text-secondary hover:underline text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:underline text-sm">
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
