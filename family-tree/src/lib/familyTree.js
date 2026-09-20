// Turns the flat `family_members` rows into a forest of nodes react-d3-tree can render.
// Couples are merged into a single node (person + spouse), with children attached under
// whichever of the two the child's father_id/mother_id points to.
export function buildFamilyForest(people) {
  const byId = new Map(people.map((p) => [p.id, p]));

  const hasParent = (id) => {
    const p = byId.get(id);
    return !!(p && (p.father_id || p.mother_id));
  };

  const childrenOf = new Map();
  for (const p of people) {
    for (const parentId of [p.father_id, p.mother_id]) {
      if (!parentId || !byId.has(parentId)) continue;
      if (!childrenOf.has(parentId)) childrenOf.set(parentId, []);
      const arr = childrenOf.get(parentId);
      if (!arr.includes(p.id)) arr.push(p.id);
    }
  }

  const rendered = new Set();

  function buildNode(personId) {
    if (rendered.has(personId)) return null;
    rendered.add(personId);

    const person = byId.get(personId);
    const spouse = person.spouse_id ? byId.get(person.spouse_id) : null;
    if (spouse) rendered.add(spouse.id);

    const childIdSet = new Set(childrenOf.get(person.id) || []);
    if (spouse) {
      (childrenOf.get(spouse.id) || []).forEach((id) => childIdSet.add(id));
    }

    const childNodes = [...childIdSet]
      .map((id) => byId.get(id))
      .filter(Boolean)
      .sort((a, b) => (a.birth_year ?? 9999) - (b.birth_year ?? 9999))
      .map((c) => buildNode(c.id))
      .filter(Boolean);

    const name = spouse
      ? `${person.display_name} & ${spouse.display_name}`
      : person.display_name;

    return {
      name,
      attributes: {
        personId: person.id,
        spouseId: spouse ? spouse.id : "",
      },
      children: childNodes,
    };
  }

  const rootIds = new Set();
  for (const p of people) {
    if (hasParent(p.id)) continue;
    const spouse = p.spouse_id ? byId.get(p.spouse_id) : null;
    if (spouse && hasParent(spouse.id)) continue; // rendered under the spouse's real parents instead
    const anchor = spouse && spouse.gender === "M" && p.gender !== "M" ? spouse.id : p.id;
    rootIds.add(anchor);
  }

  return [...rootIds]
    .map((id) => buildNode(id))
    .filter(Boolean)
    .sort((a, b) => {
      const pa = byId.get(a.attributes.personId);
      const pb = byId.get(b.attributes.personId);
      return (pa.birth_year ?? 9999) - (pb.birth_year ?? 9999);
    });
}

export function lifespan(person) {
  if (!person) return "";
  const birth = person.birth_year ?? "?";
  if (person.death_year) return `${birth} – ${person.death_year}`;
  if (person.birth_year) return `b. ${birth}`;
  return "";
}
