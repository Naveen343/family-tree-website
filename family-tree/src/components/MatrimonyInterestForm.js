import { useState } from "react";
import { X, ImagePlus } from "lucide-react";
import { useSubmitMatrimonyInterest, useUpdateMatrimonyInterest } from "../hooks/useMatrimonyInterests";
import supabase from "../lib/supabaseClient";
import { validateImageFile } from "../lib/fileValidation";

const MAX_PHOTOS = 4;

const emptyForm = {
  full_name: "",
  age: "",
  gender: "",
  branch: "",
  education: "",
  occupation: "",
  location: "",
  about: "",
  contact_phone: "",
  contact_email: "",
};

const inputClasses =
  "w-full bg-[#16202B] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary";

let nextId = 0;

// mode="create" (default, public submission) or mode="edit" (admin-only, editing an
// existing profile). Edit mode is fed only the public-safe fields (no contact info —
// the public grid never fetches contact_phone/contact_email), so those fields are
// hidden and left untouched rather than risk wiping real data with blanks.
export default function MatrimonyInterestForm({ mode = "create", profile, onSuccess }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState(() =>
    isEdit
      ? {
          ...emptyForm,
          full_name: profile.full_name || "",
          age: profile.age ?? "",
          gender: profile.gender || "",
          branch: profile.branch || "",
          education: profile.education || "",
          occupation: profile.occupation || "",
          location: profile.location || "",
          about: profile.about || "",
        }
      : emptyForm
  );
  // Each entry: { id, kind: "existing", url } | { id, kind: "new", file, previewUrl }
  const [photos, setPhotos] = useState(() =>
    isEdit ? (profile.photo_urls || []).map((url) => ({ id: nextId++, kind: "existing", url })) : []
  );
  const [photoError, setPhotoError] = useState("");
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const submit = useSubmitMatrimonyInterest();
  const update = useUpdateMatrimonyInterest();
  const mutation = isEdit ? update : submit;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    setPhotoError("");

    if (photos.length + files.length > MAX_PHOTOS) {
      setPhotoError(`You can add up to ${MAX_PHOTOS} photos.`);
      return;
    }

    for (const file of files) {
      const err = validateImageFile(file);
      if (err) {
        setPhotoError(err);
        return;
      }
    }

    setPhotos((p) => [
      ...p,
      ...files.map((file) => ({ id: nextId++, kind: "new", file, previewUrl: URL.createObjectURL(file) })),
    ]);
  };

  const removePhoto = (id) => {
    setPhotos((p) => p.filter((photo) => photo.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedUrls = [];
      const newPhotos = photos.filter((p) => p.kind === "new");
      if (newPhotos.length > 0) {
        setUploadingPhotos(true);
        uploadedUrls = await Promise.all(
          newPhotos.map(async ({ file }, i) => {
            const path = `matrimony/${Date.now()}-${i}-${file.name}`;
            const { error } = await supabase.storage
              .from("homepage-media")
              .upload(path, file, { cacheControl: "3600", contentType: file.type });
            if (error) throw error;
            const { data } = supabase.storage.from("homepage-media").getPublicUrl(path);
            return data.publicUrl;
          })
        );
        setUploadingPhotos(false);
      }

      // Preserve the original order: existing photos stay where they are, new ones append.
      let uploadIndex = 0;
      const photo_urls = photos.map((p) => (p.kind === "existing" ? p.url : uploadedUrls[uploadIndex++]));

      const payload = {
        full_name: form.full_name,
        age: form.age ? parseInt(form.age, 10) : null,
        gender: form.gender || null,
        branch: form.branch,
        education: form.education,
        occupation: form.occupation,
        location: form.location,
        about: form.about,
        photo_urls,
      };
      if (!isEdit) {
        payload.contact_phone = form.contact_phone;
        payload.contact_email = form.contact_email;
      }

      if (isEdit) {
        await update.mutateAsync({ id: profile.id, ...payload });
      } else {
        await submit.mutateAsync(payload);
        setForm(emptyForm);
        setPhotos([]);
      }
      onSuccess?.();
    } catch {
      setUploadingPhotos(false);
      // error surfaced via mutation.isError / photoError below
    }
  };

  const busy = mutation.isPending || uploadingPhotos;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">Photos (up to {MAX_PHOTOS})</label>
        <div className="flex flex-wrap gap-3">
          {photos.map((p) => (
            <div key={p.id} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
              <img src={p.kind === "existing" ? p.url : p.previewUrl} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(p.id)}
                className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80"
                aria-label="Remove photo"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="w-20 h-20 flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 cursor-pointer transition-colors">
              <ImagePlus size={18} />
              <span className="text-[10px]">Add</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoSelect} />
            </label>
          )}
        </div>
        {photoError && <p className="text-red-400 text-xs mt-1">{photoError}</p>}
        <p className="text-gray-500 text-xs mt-1">Each photo must be 3MB or smaller.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">Full Name *</label>
        <input className={inputClasses} value={form.full_name} onChange={set("full_name")} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Age</label>
          <input type="number" className={inputClasses} value={form.age} onChange={set("age")} />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Gender</label>
          <select className={inputClasses} value={form.gender} onChange={set("gender")}>
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">Family Branch</label>
        <input
          className={inputClasses}
          value={form.branch}
          onChange={set("branch")}
          placeholder="e.g. Valiakalam, Therampu, Ariyappally…"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Education</label>
          <input className={inputClasses} value={form.education} onChange={set("education")} />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">Occupation</label>
          <input className={inputClasses} value={form.occupation} onChange={set("occupation")} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">Location</label>
        <input className={inputClasses} value={form.location} onChange={set("location")} />
      </div>

      <div>
        <label className="block text-xs font-medium text-white/70 mb-1">About you</label>
        <textarea className={inputClasses} rows={3} value={form.about} onChange={set("about")} />
      </div>

      {isEdit ? (
        <p className="text-xs text-gray-500">
          Editing as admin — phone and email aren't shown here and won't be changed.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Phone *</label>
            <input className={inputClasses} value={form.contact_phone} onChange={set("contact_phone")} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Email</label>
            <input type="email" className={inputClasses} value={form.contact_email} onChange={set("contact_email")} />
          </div>
        </div>
      )}

      {mutation.isError && (
        <p className="text-red-400 text-sm">
          Something went wrong {isEdit ? "saving these changes" : "submitting your details"}. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full bg-secondary text-[#16202B] font-semibold px-4 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {uploadingPhotos
          ? "Uploading photos…"
          : mutation.isPending
          ? "Saving…"
          : isEdit
          ? "Save Changes"
          : "Add My Profile"}
      </button>
      {!isEdit && (
        <p className="text-xs text-gray-500 text-center">
          Your name, photos and details will be listed publicly for the family to browse. Your phone
          and email stay private, visible only to the family committee.
        </p>
      )}
    </form>
  );
}
