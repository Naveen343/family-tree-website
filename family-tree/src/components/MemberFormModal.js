import { useMemo, useState } from "react";
import { X } from "lucide-react";
import supabase from "../lib/supabaseClient";
import { validateImageFile } from "../lib/fileValidation";

const emptyForm = {
  given_name: "",
  gender: "",
  birth_year: "",
  birth_place: "",
  death_year: "",
  death_place: "",
  bio: "",
  photo_url: "",
  father_id: null,
  mother_id: null,
};

const inputClasses =
  "w-full bg-[#16202B] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary";

function PersonPicker({ label, people, value, onChange, placeholder }) {
  const [query, setQuery] = useState("");
  const selected = value ? people.find((p) => p.id === value) : null;

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return people.filter((p) => p.display_name.toLowerCase().includes(q)).slice(0, 8);
  }, [query, people]);

  return (
    <div>
      <label className="block text-xs font-medium text-white/70 mb-1">{label}</label>
      {selected ? (
        <div className="flex items-center justify-between bg-[#16202B] border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
          <span>
            {selected.display_name}
            {selected.birth_year ? ` (${selected.birth_year})` : ""}
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-gray-400 hover:text-white ml-2"
            aria-label={`Clear ${label}`}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={inputClasses}
          />
          {matches.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-[#1E2A36] border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto">
              {matches.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onChange(p.id);
                    setQuery("");
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
                >
                  {p.display_name}
                  {p.birth_year ? ` (${p.birth_year})` : ""}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PhotoUploadField({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      alert(validationError);
      e.target.value = "";
      return;
    }

    setUploading(true);
    const path = `family-tree/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("homepage-media")
      .upload(path, file, { cacheControl: "3600", contentType: file.type });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      e.target.value = "";
      return;
    }

    const { data } = supabase.storage.from("homepage-media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-white/70 mb-1">Photo</label>
      {value ? (
        <div className="flex items-center gap-2">
          <img src={value} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-400 hover:underline"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="cursor-pointer inline-block bg-white/10 text-white text-sm px-3 py-2 rounded-lg hover:bg-white/20 transition">
          {uploading ? "Uploading…" : "Upload Photo"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      )}
    </div>
  );
}

export default function MemberFormModal({
  title,
  subtitle,
  initialValues,
  onSubmit,
  onClose,
  submitting,
  error,
  people,
  showParentFields,
}) {
  const [form, setForm] = useState({ ...emptyForm, ...initialValues });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.given_name.trim()) return;

    const payload = {
      given_name: form.given_name.trim(),
      display_name: form.given_name.trim(),
      gender: form.gender || null,
      birth_year: form.birth_year ? parseInt(form.birth_year, 10) : null,
      birth_place: form.birth_place.trim() || null,
      death_year: form.death_year ? parseInt(form.death_year, 10) : null,
      death_place: form.death_place.trim() || null,
      bio: form.bio.trim() || null,
      photo_url: form.photo_url.trim() || null,
    };

    if (showParentFields) {
      payload.father_id = form.father_id || null;
      payload.mother_id = form.mother_id || null;
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] px-4">
      <div className="bg-[#1E2A36] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-5 border-b border-white/10">
          <div>
            <h3 className="text-lg font-heading font-semibold text-secondary">{title}</h3>
            {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Name *</label>
            <input
              autoFocus
              className={inputClasses}
              value={form.given_name}
              onChange={set("given_name")}
              required
            />
          </div>

          {showParentFields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PersonPicker
                label="Father (optional)"
                people={people}
                value={form.father_id}
                onChange={(id) => setForm((f) => ({ ...f, father_id: id }))}
                placeholder="Search by name…"
              />
              <PersonPicker
                label="Mother (optional)"
                people={people}
                value={form.mother_id}
                onChange={(id) => setForm((f) => ({ ...f, mother_id: id }))}
                placeholder="Search by name…"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">Gender</label>
              <select className={inputClasses} value={form.gender} onChange={set("gender")}>
                <option value="">Unknown</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <PhotoUploadField
              value={form.photo_url}
              onChange={(url) => setForm((f) => ({ ...f, photo_url: url }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">Birth year</label>
              <input
                type="number"
                className={inputClasses}
                value={form.birth_year}
                onChange={set("birth_year")}
                placeholder="e.g. 1975"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">Birth place</label>
              <input className={inputClasses} value={form.birth_place} onChange={set("birth_place")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">Death year</label>
              <input
                type="number"
                className={inputClasses}
                value={form.death_year}
                onChange={set("death_year")}
                placeholder="Leave blank if living"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">Death place</label>
              <input className={inputClasses} value={form.death_place} onChange={set("death_place")} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Bio</label>
            <textarea className={inputClasses} rows={3} value={form.bio} onChange={set("bio")} />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
