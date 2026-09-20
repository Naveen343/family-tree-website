const GENDER_COLORS = {
  M: { bg: "#1d4ed8", ring: "#93c5fd" },
  F: { bg: "#be185d", ring: "#f9a8d4" },
  default: { bg: "#4b5563", ring: "#9ca3af" },
};

export function initialsOf(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({ name, gender, photoUrl, size = 40, className = "" }) {
  const style = GENDER_COLORS[gender] || GENDER_COLORS.default;

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          border: `2px solid ${style.ring}`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: style.bg,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.38,
        border: `2px solid ${style.ring}`,
        flexShrink: 0,
      }}
    >
      {initialsOf(name)}
    </div>
  );
}
