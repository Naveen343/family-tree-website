export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-[#1E2A36] border-b border-white/5 text-center px-6 py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #E8B84B 0, transparent 35%), radial-gradient(circle at 80% 60%, #E8B84B 0, transparent 40%)",
        }}
      />
      <div className="relative">
        {eyebrow && (
          <p className="uppercase tracking-[0.25em] text-secondary/80 text-xs font-semibold mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
