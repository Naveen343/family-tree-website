import Header from "../components/Header";

export default function FamilyHistory() {
  return (
     <>
    <Header />
    <div className="bg-[#16202B] min-h-screen text-white mt-16">
      {/* Hero / Title */}
      <section className="bg-[#1E2A36] text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary">
          Our Family History
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Tracing the roots of our family through generations — stories of resilience, tradition,
          and unity that connect us across time.
        </p>
      </section>

      {/* Origins Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-secondary mb-4">The Origins</h2>
        <p className="leading-relaxed">
          Our story begins in the early 1800s, when our ancestors settled in a small village. 
          They were farmers and craftsmen, building a foundation of hard work and faith that 
          shaped the generations to come.
        </p>
      </section>

      {/* Generations Section */}
      <section className="bg-[#1E2A36] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-secondary mb-6">Generations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#16202B] rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-secondary">1st Generation</h3>
              <p className="mt-2">
                The pioneers who migrated and established the family roots.
              </p>
            </div>
            <div className="p-6 bg-[#16202B] rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-secondary">2nd Generation</h3>
              <p className="mt-2">
                Expanded the family lands and passed down traditions of hospitality and faith.
              </p>
            </div>
            <div className="p-6 bg-[#16202B] rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-secondary">3rd Generation</h3>
              <p className="mt-2">
                Pursued education and community leadership, setting the stage for modern growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-secondary mb-6">Timeline</h2>
        <ul className="space-y-6 border-l border-secondary pl-6">
          <li>
            <div className="text-secondary font-semibold">1805</div>
            <p>Our earliest known ancestor settles in the homeland.</p>
          </li>
          <li>
            <div className="text-secondary font-semibold">1900</div>
            <p>Family expands across neighboring towns.</p>
          </li>
          <li>
            <div className="text-secondary font-semibold">1950</div>
            <p>Modern education and careers bring new opportunities.</p>
          </li>
          <li>
            <div className="text-secondary font-semibold">2000</div>
            <p>Family reunions become a yearly tradition, uniting generations.</p>
          </li>
        </ul>
      </section>

      {/* Key Figures Section */}
      <section className="bg-[#1E2A36] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-secondary mb-6">Key Figures</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4 bg-[#16202B] p-6 rounded-2xl shadow-md">
              <img
                src="https://via.placeholder.com/100"
                alt="Ancestor One"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-secondary">Ancestor One</h3>
                <p className="text-sm">
                  Known for wisdom and leadership in the community.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#16202B] p-6 rounded-2xl shadow-md">
              <img
                src="https://via.placeholder.com/100"
                alt="Ancestor Two"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-secondary">Ancestor Two</h3>
                <p className="text-sm">
                  Remembered for compassion and charitable works.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Therampu Kudumbam. All Rights Reserved.
      </footer>
    </div>
    </>
  );
}
