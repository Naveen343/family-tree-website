import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useScroll } from "../hooks/use-scroll";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  {
    name: "Family",
    path: "/family-tree",
    children: [
      { name: "Family History", path: "/family-history" },
      { name: "Family Tree", path: "/family-tree" },
      { name: "Family Branches", path: "/family-branches" },
      { name: "Family Directory", path: "/family-directory" },
      { name: "Family E-book", path: "/family-ebook" },
      { name: "Family By-law", path: "/family-bylaw" },
    ],
  },
  { name: "News & Events", path: "/news-events" },
  { name: "Charity", path: "/charity" },
  { name: "Academics", path: "/academics" },
  { name: "Family Matrimony", path: "/family-matrimony" },
  { name: "About", path: "/about" },
];

// inline-flex (not inline/flex) so every item — plain link or the icon+text button —
// gets the same box model. A plain `inline` span ignores vertical padding/border for
// height purposes, while a `flex` button doesn't, which used to misalign the two.
const linkClasses = (active) =>
  `inline-flex items-center gap-1 text-[15px] font-medium tracking-wide transition-colors duration-200 cursor-pointer pb-1 border-b-2 ${
    active
      ? "text-secondary border-secondary"
      : "text-white/85 hover:text-secondary border-transparent"
  }`;

function DesktopNavItem({ item, location }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = item.children
    ? item.children.some((c) => c.path === location) || location === item.path
    : location === item.path;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!item.children) {
    return (
      <li>
        <Link to={item.path}>
          <span className={linkClasses(active)}>{item.name}</span>
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`select-none mt-[3px] ${linkClasses(active)}`}
      >
        {item.name}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <ul
        className={`absolute left-0 mt-3 w-56 bg-[#1E2A36] border border-white/10 shadow-xl rounded-lg py-2 transition-all duration-150 origin-top ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {item.children.map((child) => (
          <li key={child.path}>
            <Link to={child.path}>
              <span
                className={`block px-4 py-2 text-sm transition-colors duration-150 cursor-pointer ${
                  location === child.path
                    ? "text-secondary bg-white/5"
                    : "text-white/80 hover:bg-white/5 hover:text-secondary"
                }`}
                onClick={() => setOpen(false)}
              >
                {child.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFamilyOpen, setMobileFamilyOpen] = useState(false);
  const [location] = useLocation();
  const { scrollY } = useScroll();
  const isScrolled = scrollY > 10;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileMenuButton = document.getElementById("mobile-menu-button");
      if (
        mobileMenuOpen &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        mobileMenuButton &&
        !mobileMenuButton.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-[#16202B] ${
        isScrolled ? "shadow-lg shadow-black/30 border-b border-white/5" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <div className="flex flex-col cursor-pointer leading-tight">
            <span className="font-heading text-lg md:text-xl font-semibold italic text-secondary">
              Therampu Kudumbam
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase text-white/50">
              Since 1701
            </span>
          </div>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <DesktopNavItem key={item.name} item={item} location={location} />
            ))}
          </ul>
        </nav>

        <button
          id="mobile-menu-button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden bg-transparent border-none p-2 text-white"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 w-72 max-w-[85vw] bg-[#1E2A36] border-l border-white/10 shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="py-5 px-4 h-full overflow-y-auto">
          <ul className="space-y-1">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <li key={item.name}>
                  <button
                    onClick={() => setMobileFamilyOpen((o) => !o)}
                    className={`w-full flex items-center justify-between text-left font-medium py-2 px-3 rounded transition-colors duration-200 ${
                      location.startsWith("/family")
                        ? "bg-white/10 text-secondary"
                        : "text-white/85 hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileFamilyOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileFamilyOpen && (
                    <ul className="pl-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link to={child.path}>
                            <div
                              className={`py-2 px-3 rounded text-sm cursor-pointer ${
                                location === child.path
                                  ? "bg-white/10 text-secondary"
                                  : "text-white/70 hover:bg-white/5 hover:text-secondary"
                              }`}
                            >
                              {child.name}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.name}>
                  <Link to={item.path}>
                    <div
                      className={`block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                        location === item.path
                          ? "bg-white/10 text-secondary"
                          : "text-white/85 hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
