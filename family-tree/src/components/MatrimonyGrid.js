import { useState } from "react";
import { Heart, Trash2, Pencil, X } from "lucide-react";
import { useMatrimonyInterestsPublic, useDeleteMatrimonyInterest } from "../hooks/useMatrimonyInterests";
import { useAdminAuth } from "../hooks/useAdminAuth";
import Avatar from "./Avatar";
import MatrimonyInterestForm from "./MatrimonyInterestForm";

const ABOUT_TRUNCATE_LENGTH = 140;

function ProfileCard({ profile, onDelete, onEdit, isAdmin }) {
  const photos = profile.photo_urls || [];
  const [activePhoto, setActivePhoto] = useState(0);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const isLongAbout = (profile.about || "").length > ABOUT_TRUNCATE_LENGTH;

  return (
    <div className="bg-[#1E2A36] border border-white/5 rounded-2xl overflow-hidden hover:border-secondary/30 transition-colors shadow-md flex flex-col">
      <div className="aspect-square bg-[#0e1620] flex items-center justify-center overflow-hidden">
        {photos.length > 0 ? (
          <img src={photos[activePhoto]} alt={profile.full_name} className="w-full h-full object-cover" />
        ) : (
          <Avatar name={profile.full_name} gender={profile.gender} size={72} />
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex gap-1.5 px-3 pt-3">
          {photos.map((url, i) => (
            <button
              key={url}
              onClick={() => setActivePhoto(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activePhoto ? "bg-secondary" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Show photo ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-heading font-semibold">
          {profile.full_name}
          {profile.age ? `, ${profile.age}` : ""}
        </h3>
        <p className="text-gray-400 text-xs mt-0.5">
          {[profile.branch, profile.location].filter(Boolean).join(" · ") || " "}
        </p>

        <div className="mt-2 text-sm text-gray-300 space-y-0.5">
          {profile.education && <p>{profile.education}</p>}
          {profile.occupation && <p>{profile.occupation}</p>}
        </div>

        {profile.about && (
          <div className="mt-2 flex-grow">
            <p className={`text-gray-400 text-xs whitespace-pre-line ${!aboutExpanded ? "line-clamp-3" : ""}`}>
              {profile.about}
            </p>
            {isLongAbout && (
              <button
                type="button"
                onClick={() => setAboutExpanded((v) => !v)}
                className="text-secondary text-xs font-medium hover:underline mt-1"
              >
                {aboutExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center gap-4">
          {isAdmin && (
            <button
              onClick={() => onEdit(profile)}
              className="flex items-center gap-1.5 text-xs text-secondary hover:underline"
            >
              <Pencil size={12} /> Edit
            </button>
          )}
          <button
            onClick={() => onDelete(profile.id)}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:underline"
          >
            <Trash2 size={12} /> Remove this listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MatrimonyGrid() {
  const { data: profiles, isLoading, isError } = useMatrimonyInterestsPublic();
  const deleteInterest = useDeleteMatrimonyInterest();
  const { isAdmin } = useAdminAuth();
  const [editingProfile, setEditingProfile] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this listing? This can't be undone.")) return;
    await deleteInterest.mutateAsync(id);
  };

  if (isLoading) {
    return <p className="text-center text-gray-400 py-12">Loading…</p>;
  }

  if (isError) {
    return <p className="text-center text-red-400 py-12">Could not load listings right now.</p>;
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <Heart className="mx-auto mb-4 text-secondary/60" size={32} />
        No one has added a profile yet — be the first!
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onDelete={handleDelete}
            onEdit={setEditingProfile}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {editingProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] px-4">
          <div className="bg-[#1E2A36] border border-white/10 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between p-5 border-b border-white/10">
              <h3 className="text-lg font-heading font-semibold text-secondary">Edit Profile</h3>
              <button
                onClick={() => setEditingProfile(null)}
                className="text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5">
              <MatrimonyInterestForm
                mode="edit"
                profile={editingProfile}
                onSuccess={() => setEditingProfile(null)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
