import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Tree from "react-d3-tree";
import { Search, X, RotateCcw, Users, UserPlus, Heart, Pencil, Trash2, Maximize2, Minimize2 } from "lucide-react";
import { useFamilyMembers } from "../hooks/useFamilyMembers";
import {
  useAddFamilyMember,
  useUpdateFamilyMember,
  useDeleteFamilyMember,
} from "../hooks/useFamilyMemberMutations";
import { buildFamilyForest, lifespan } from "../lib/familyTree";
import Avatar from "./Avatar";
import PageHero from "./PageHero";
import MemberFormModal from "./MemberFormModal";

function PersonAvatar({ person, size = 28 }) {
  return (
    <Avatar name={person?.display_name} gender={person?.gender} photoUrl={person?.photo_url} size={size} />
  );
}

function makeRenderNode({ byId, selectedId, onSelect }) {
  return ({ nodeDatum, toggleNode }) => {
    const personId = nodeDatum.attributes.personId;
    const spouseId = nodeDatum.attributes.spouseId;
    const person = byId.get(personId);
    if (!person) return <g />;
    const spouse = spouseId ? byId.get(spouseId) : null;
    const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
    const isSelected = selectedId === personId || (spouse && selectedId === spouse.id);
    const width = 230;
    const height = spouse ? 76 : 56;

    return (
      <g>
        <foreignObject width={width} height={height} x={-width / 2} y={-height / 2} style={{ overflow: "visible" }}>
          <div
            onClick={() => onSelect(personId)}
            style={{
              width: width - 4,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 10,
              background: "#1E2A36",
              border: isSelected ? "2px solid #E8B84B" : "1px solid #33465A",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              fontFamily: "Raleway, sans-serif",
              boxSizing: "border-box",
              height: height - 4,
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <PersonAvatar person={person} />
              <div style={{ minWidth: 0 }}>
                <div style={{ color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {person.display_name}
                </div>
                <div style={{ color: "#9fb0c3", fontSize: 10 }}>{lifespan(person)}</div>
              </div>
            </div>
            {spouse && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <PersonAvatar person={spouse} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "white", fontSize: 12, fontWeight: 600, lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {spouse.display_name}
                  </div>
                  <div style={{ color: "#9fb0c3", fontSize: 10 }}>{lifespan(spouse)}</div>
                </div>
              </div>
            )}
          </div>
        </foreignObject>
        {hasChildren && (
          <circle
            r={7}
            cy={height / 2}
            fill="#E8B84B"
            stroke="#16202B"
            strokeWidth={1}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleNode();
            }}
          />
        )}
      </g>
    );
  };
}

function RelativeLink({ person, onSelect }) {
  if (!person) return <span className="text-gray-500">Unknown</span>;
  return (
    <button
      onClick={() => onSelect(person.id)}
      className="text-secondary hover:underline text-left"
    >
      {person.display_name}
      {person.birth_year ? ` (${person.birth_year})` : ""}
    </button>
  );
}

function DetailPanel({ person, byId, onSelect, onClose, onAddChild, onAddSpouse, onEdit, onDelete }) {
  if (!person) return null;
  const father = person.father_id ? byId.get(person.father_id) : null;
  const mother = person.mother_id ? byId.get(person.mother_id) : null;
  const spouse = person.spouse_id ? byId.get(person.spouse_id) : null;
  const children = [...byId.values()].filter(
    (p) => p.father_id === person.id || p.mother_id === person.id
  );

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-80 bg-[#1E2A36] border-l border-[#33465A] shadow-2xl overflow-y-auto z-20">
      <div className="flex items-start justify-between p-4 border-b border-[#33465A]">
        <div className="flex items-center gap-3">
          <PersonAvatar person={person} size={48} />
          <div>
            <h3 className="text-white font-semibold leading-tight">{person.display_name}</h3>
            <p className="text-gray-400 text-sm">{lifespan(person)}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 p-4 border-b border-[#33465A]">
        <button
          onClick={() => onAddChild(person)}
          className="flex items-center gap-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-full transition-colors"
        >
          <UserPlus size={13} /> Add Child
        </button>
        {!spouse && (
          <button
            onClick={() => onAddSpouse(person)}
            className="flex items-center gap-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-full transition-colors"
          >
            <Heart size={13} /> Add Spouse
          </button>
        )}
        <button
          onClick={() => onEdit(person)}
          className="flex items-center gap-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-full transition-colors"
        >
          <Pencil size={13} /> Edit
        </button>
        <button
          onClick={() => onDelete(person)}
          className="flex items-center gap-1.5 text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full transition-colors"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>

      <div className="p-4 space-y-4 text-sm">
        {(person.birth_place || person.death_place) && (
          <div>
            <p className="text-gray-400 uppercase text-xs tracking-wide mb-1">Places</p>
            {person.birth_place && <p className="text-gray-200">Born in {person.birth_place}</p>}
            {person.death_place && <p className="text-gray-200">Died in {person.death_place}</p>}
          </div>
        )}

        {person.bio && (
          <div>
            <p className="text-gray-400 uppercase text-xs tracking-wide mb-1">About</p>
            <p className="text-gray-200 leading-relaxed">{person.bio}</p>
          </div>
        )}

        <div>
          <p className="text-gray-400 uppercase text-xs tracking-wide mb-1">Parents</p>
          <div className="flex flex-col gap-1">
            <RelativeLink person={father} onSelect={onSelect} />
            <RelativeLink person={mother} onSelect={onSelect} />
          </div>
        </div>

        {spouse && (
          <div>
            <p className="text-gray-400 uppercase text-xs tracking-wide mb-1">Spouse</p>
            <RelativeLink person={spouse} onSelect={onSelect} />
          </div>
        )}

        {children.length > 0 && (
          <div>
            <p className="text-gray-400 uppercase text-xs tracking-wide mb-1">
              Children ({children.length})
            </p>
            <div className="flex flex-col gap-1">
              {children
                .sort((a, b) => (a.birth_year ?? 9999) - (b.birth_year ?? 9999))
                .map((c) => (
                  <RelativeLink key={c.id} person={c} onSelect={onSelect} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FamilyTreeView() {
  const { data: people, isLoading, isError, error } = useFamilyMembers();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [resetCounter, setResetCounter] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [formTask, setFormTask] = useState(null); // { type: 'add-root'|'add-child'|'add-spouse'|'edit', person? }
  const [formError, setFormError] = useState(null);

  const addMember = useAddFamilyMember();
  const updateMember = useUpdateFamilyMember();
  const deleteMember = useDeleteFamilyMember();
  const saving = addMember.isPending || updateMember.isPending;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: 90 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [people]);

  // Fullscreen: the container is pinned to the viewport via CSS (works everywhere, incl. iOS);
  // the native Fullscreen API is layered on top where available to hide browser chrome.
  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setIsFullscreen(false);
    const onFsChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => {
      document.body.style.overflow = prevOverflow;
      requestAnimationFrame(() => window.scrollTo(0, scrollY));
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFsChange);
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
  }, [isFullscreen]);

  useEffect(() => {
    const t = setTimeout(() => setResetCounter((c) => c + 1), 150);
    return () => clearTimeout(t);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    }
    setIsFullscreen((v) => !v);
  };

  const byId = useMemo(() => new Map((people || []).map((p) => [p.id, p])), [people]);

  const forest = useMemo(() => {
    if (!people || people.length === 0) return [];
    return buildFamilyForest(people);
  }, [people]);

  const founder = useMemo(() => {
    if (!people || people.length === 0) return null;
    return people.reduce(
      (earliest, p) => (p.birth_year && (!earliest || p.birth_year < earliest.birth_year) ? p : earliest),
      null
    );
  }, [people]);

  const matches = useMemo(() => {
    if (!query.trim() || !people) return [];
    const q = query.trim().toLowerCase();
    return people.filter((p) => p.display_name.toLowerCase().includes(q)).slice(0, 25);
  }, [query, people]);

  const selectedPerson = selectedId ? byId.get(selectedId) : null;

  const renderCustomNodeElement = useMemo(
    () => makeRenderNode({ byId, selectedId, onSelect: setSelectedId }),
    [byId, selectedId]
  );

  const closeForm = () => {
    setFormTask(null);
    setFormError(null);
  };

  const handleFormSubmit = async (values) => {
    setFormError(null);
    try {
      if (formTask.type === "edit") {
        await updateMember.mutateAsync({ id: formTask.person.id, ...values });
        setSelectedId(formTask.person.id);
      } else if (formTask.type === "add-child") {
        const { person } = formTask;
        const spouse = person.spouse_id ? byId.get(person.spouse_id) : null;
        const fields = { ...values };
        if (person.gender === "F") {
          fields.mother_id = person.id;
          fields.father_id = spouse?.id ?? null;
        } else {
          fields.father_id = person.id;
          fields.mother_id = spouse?.id ?? null;
        }
        const created = await addMember.mutateAsync(fields);
        setSelectedId(created.id);
      } else if (formTask.type === "add-spouse") {
        const { person } = formTask;
        const created = await addMember.mutateAsync({ ...values, spouse_id: person.id });
        await updateMember.mutateAsync({ id: person.id, spouse_id: created.id });
        setSelectedId(created.id);
      } else {
        const created = await addMember.mutateAsync(values);
        setSelectedId(created.id);
      }
      closeForm();
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleDeletePerson = async (person) => {
    const confirmed = window.confirm(
      `Delete ${person.display_name}? This can't be undone. Any children keep their own records but lose this parent link.`
    );
    if (!confirmed) return;
    await deleteMember.mutateAsync(person.id);
    if (selectedId === person.id) setSelectedId(null);
  };

  const formModalProps = {
    "add-root": { title: "Add Family Member", subtitle: "Adds a new, unconnected person to the tree." },
    "add-child": {
      title: `Add Child of ${formTask?.person?.display_name ?? ""}`,
      subtitle: "The new person will be linked as a child automatically.",
    },
    "add-spouse": {
      title: `Add Spouse of ${formTask?.person?.display_name ?? ""}`,
      subtitle: "The new person will be linked as a spouse automatically.",
    },
    edit: { title: `Edit ${formTask?.person?.display_name ?? ""}` },
  };

  return (
    <div className="bg-[#16202B] min-h-screen text-white mt-16">
      <PageHero eyebrow="Explore the lineage" title="Family Tree">
        {people && people.length > 0 && (
          <p className="mt-4 text-gray-300 text-sm md:text-base flex items-center justify-center gap-1.5">
            <Users size={14} />
            {people.length} family members
            {founder ? ` · founded by ${founder.display_name} (${founder.birth_year})` : ""}
          </p>
        )}
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading && (
          <div className="text-center py-24 text-gray-300">Loading the family tree…</div>
        )}

        {isError && (
          <div className="text-center py-24 text-red-400">
            Could not load the family tree{error?.message ? `: ${error.message}` : "."}
          </div>
        )}

        {!isLoading && !isError && people && people.length === 0 && (
          <div className="text-center py-24 text-gray-300">
            <p className="mb-4">
              No family members yet. Run the seed script in{" "}
              <code className="text-secondary">api/supabase/sql/family_members_seed.sql</code> to populate the
              tree, or add the first person yourself.
            </p>
            <button
              onClick={() => setFormTask({ type: "add-root" })}
              className="inline-flex items-center gap-1.5 bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              <UserPlus size={15} /> Add Family Member
            </button>
          </div>
        )}

        {!isLoading && !isError && people && people.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="relative max-w-sm flex-1 min-w-[220px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search family members…"
                  className="w-full bg-[#1E2A36] border border-[#33465A] rounded-lg pl-9 pr-8 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
                {matches.length > 0 && (
                  <div className="absolute mt-1 w-full bg-[#1E2A36] border border-[#33465A] rounded-lg shadow-xl max-h-72 overflow-y-auto z-30">
                    {matches.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedId(p.id);
                          setQuery("");
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-[#28394B] flex items-center gap-2"
                      >
                        <PersonAvatar person={p} size={22} />
                        <span>
                          {p.display_name}
                          {p.birth_year ? ` (${p.birth_year})` : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setFormTask({ type: "add-root" })}
                className="flex items-center gap-1.5 bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-full hover:opacity-90 transition text-sm"
              >
                <UserPlus size={15} /> Add Family Member
              </button>
            </div>

            <div
              ref={containerRef}
              className={`bg-[#111a22] border-[#33465A] overflow-hidden ${
                isFullscreen
                  ? "fixed inset-0 z-[55] w-screen h-screen border-0 rounded-none"
                  : "relative w-full h-[650px] border rounded-xl"
              }`}
            >
              {dimensions.width > 0 && (
                <Tree
                  key={resetCounter}
                  data={forest}
                  renderCustomNodeElement={renderCustomNodeElement}
                  orientation="vertical"
                  translate={translate}
                  dimensions={dimensions}
                  nodeSize={{ x: 260, y: 150 }}
                  separation={{ siblings: 1.15, nonSiblings: 1.5 }}
                  pathFunc="step"
                  collapsible
                  zoomable
                  draggable
                  scaleExtent={{ min: 0.15, max: 2 }}
                  zoom={0.7}
                  onNodeClick={(node) => setSelectedId(node.data.attributes.personId)}
                />
              )}

              <button
                onClick={() => setResetCounter((c) => c + 1)}
                title="Reset view"
                className="absolute bottom-4 left-4 bg-[#1E2A36] border border-[#33465A] text-gray-200 hover:text-white rounded-full p-2 z-10"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                className="absolute bottom-4 left-16 bg-[#1E2A36] border border-[#33465A] text-gray-200 hover:text-white rounded-full p-2 z-10"
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <DetailPanel
                person={selectedPerson}
                byId={byId}
                onSelect={setSelectedId}
                onClose={() => setSelectedId(null)}
                onAddChild={(person) => setFormTask({ type: "add-child", person })}
                onAddSpouse={(person) => setFormTask({ type: "add-spouse", person })}
                onEdit={(person) => setFormTask({ type: "edit", person })}
                onDelete={handleDeletePerson}
              />
            </div>

            <p className="text-gray-500 text-xs mt-3">
              Drag to pan, scroll/pinch to zoom, click the gold dot on a node to expand or collapse
              its branch, and click a name to see their details.
            </p>
          </>
        )}
      </div>

      {formTask &&
        createPortal(
        <MemberFormModal
          {...formModalProps[formTask.type]}
          initialValues={
            formTask.type === "edit" ? { ...formTask.person, given_name: formTask.person.display_name } : undefined
          }
          submitting={saving}
          error={formError}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />,
          isFullscreen && containerRef.current ? containerRef.current : document.body
        )}
    </div>
  );
}
