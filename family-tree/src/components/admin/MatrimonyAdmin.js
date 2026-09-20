import {
  useMatrimonyInterestsAdmin,
  useUpdateMatrimonyInterest,
  useDeleteMatrimonyInterest,
} from "../../hooks/useMatrimonyInterests";

const STATUS_STYLES = {
  new: "text-amber-400",
  reviewed: "text-emerald-400",
  archived: "text-gray-500",
};

export default function MatrimonyAdmin() {
  const { data: interests, isLoading } = useMatrimonyInterestsAdmin();
  const updateInterest = useUpdateMatrimonyInterest();
  const deleteInterest = useDeleteMatrimonyInterest();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    await deleteInterest.mutateAsync(id);
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-semibold mb-2 text-secondary">
        Matrimony Interest Submissions
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Private submissions from the Family Matrimony page. Nothing here is ever shown publicly —
        reach out to people directly using the contact details they provided.
      </p>

      {isLoading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (interests || []).length === 0 ? (
        <p className="text-gray-400">No submissions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interests.map((person) => (
            <div key={person.id} className="border border-white/5 bg-[#16202B] rounded-xl shadow p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">
                  {person.full_name}
                  {person.age ? `, ${person.age}` : ""}
                </h3>
                <select
                  value={person.status}
                  onChange={(e) => updateInterest.mutate({ id: person.id, status: e.target.value })}
                  className={`bg-transparent border border-white/10 rounded px-2 py-1 text-xs font-medium ${STATUS_STYLES[person.status] || "text-white"}`}
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <dl className="text-sm text-gray-300 space-y-1 mb-3">
                {person.gender && <p>Gender: {person.gender === "M" ? "Male" : "Female"}</p>}
                {person.branch && <p>Branch: {person.branch}</p>}
                {person.education && <p>Education: {person.education}</p>}
                {person.occupation && <p>Occupation: {person.occupation}</p>}
                {person.location && <p>Location: {person.location}</p>}
                {person.contact_phone && <p>Phone: {person.contact_phone}</p>}
                {person.contact_email && <p>Email: {person.contact_email}</p>}
              </dl>
              {person.about && (
                <p className="text-sm text-gray-400 border-t border-white/5 pt-3 whitespace-pre-line">
                  {person.about}
                </p>
              )}
              <div className="mt-3">
                <button
                  onClick={() => handleDelete(person.id)}
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
