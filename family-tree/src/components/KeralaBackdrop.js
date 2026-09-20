// Decorative backwater-sunset scene with coconut palms and a kasavu-style border.
// Purely visual; sits behind the hero text.

function Palm({ x, y, h, lean, scale = 1, fill }) {
  const cx = x + lean;
  const cy = y - h;
  const L = 95 * scale;
  const angles = [200, 170, 140, 110, 75, 45, 15, -15];
  const fronds = angles.map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const dx = Math.cos(a);
    const dy = -Math.sin(a);
    const ex = cx + dx * L;
    const ey = cy + dy * L * 0.5 + L * 0.38;
    const up = [cx + dx * L * 0.55, cy + dy * L * 0.55 - L * 0.18];
    const down = [cx + dx * L * 0.55, cy + dy * L * 0.55 + L * 0.1];
    return (
      <path
        key={i}
        d={`M${cx},${cy} Q${up[0]},${up[1]} ${ex},${ey} Q${down[0]},${down[1]} ${cx},${cy}Z`}
      />
    );
  });

  return (
    <g fill={fill} stroke={fill}>
      <path
        d={`M${x},${y} C${x + lean * 0.25},${y - h * 0.4} ${x + lean * 0.85},${y - h * 0.7} ${cx},${cy}`}
        fill="none"
        strokeWidth={7 * scale}
        strokeLinecap="round"
      />
      <g strokeWidth="0.5">{fronds}</g>
      <circle cx={cx} cy={cy + 4} r={5 * scale} />
    </g>
  );
}

export default function KeralaBackdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 700 770"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16202B" />
          <stop offset="0.55" stopColor="#173b43" />
          <stop offset="0.8" stopColor="#5a5a3c" />
          <stop offset="1" stopColor="#c98a3c" />
        </linearGradient>
        <radialGradient id="kb-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe3a0" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#f2b556" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f2b556" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kb-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d99a48" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#1d5560" />
          <stop offset="1" stopColor="#0e2a33" />
        </linearGradient>
        <linearGradient id="kb-scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#16202B" stopOpacity="0.55" />
          <stop offset="0.75" stopColor="#16202B" stopOpacity="0" />
        </linearGradient>
        <pattern id="kb-kasavu" width="28" height="16" patternUnits="userSpaceOnUse">
          <rect width="28" height="16" fill="#e8c77a" />
          <rect y="0" width="28" height="2.5" fill="#b8892f" />
          <rect y="13.5" width="28" height="2.5" fill="#b8892f" />
          <path d="M14 3.5 L20 8 L14 12.5 L8 8Z" fill="#7a4f12" />
        </pattern>
      </defs>

      <rect width="700" height="770" fill="url(#kb-sky)" />
      <circle cx="470" cy="605" r="185" fill="url(#kb-sun)" />

      {/* distant tree line */}
      <path
        d="M0,600 C60,585 90,596 140,588 C200,578 240,596 300,590 C370,582 420,596 480,589 C550,580 620,594 700,586 L700,640 L0,640Z"
        fill="#0e2a30"
        opacity="0.85"
      />

      {/* backwater */}
      <rect y="606" width="700" height="164" fill="url(#kb-water)" />
      {[622, 640, 662, 690, 725].map((yy, i) => (
        <path
          key={yy}
          d={`M${60 + i * 40},${yy} Q${170 + i * 40},${yy - 5} ${290 + i * 40},${yy} T${520 + i * 30},${yy}`}
          stroke="#f5d48a"
          strokeOpacity={0.28 - i * 0.04}
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* palms: far, then near */}
      <Palm x={598} y={614} h={80} lean={-14} scale={0.55} fill="#0d2a30" />
      <Palm x={652} y={620} h={118} lean={-26} scale={0.75} fill="#0a1f25" />
      <Palm x={34} y={640} h={98} lean={16} scale={0.6} fill="#0a1f25" />
      <Palm x={96} y={630} h={70} lean={12} scale={0.48} fill="#0d2a30" />

      <rect width="700" height="770" fill="url(#kb-scrim)" />

      {/* kasavu border */}
      <rect y="754" width="700" height="16" fill="url(#kb-kasavu)" />
    </svg>
  );
}
