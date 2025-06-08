import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useScroll } from "../hooks/use-scroll";
import logoImage from "../assets/family-logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [familyDropdownOpen, setFamilyDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { scrollY } = useScroll();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("family-dropdown");
      const toggle = document.getElementById("family-toggle");
  
      if (
        familyDropdownOpen &&
        dropdown &&
        !dropdown.contains(event.target) &&
        toggle &&
        !toggle.contains(event.target)
      ) {
        setFamilyDropdownOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [familyDropdownOpen]);
  

  // Enhanced header that changes transparency based on scroll position
  const isScrolled = scrollY > 10;
  const [mobileFamilyOpen, setMobileFamilyOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md bg-black font-bold" : "bg-black font-bold"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link to="/">
                <span className={`text-lg hover:text-yellow-500 transition-colors duration-200 cursor-pointer ${location === "/" ? "text-yellow-500 border-b-2 border-text-yellow-500" : isScrolled ? "text-white" : "text-white"}`}>
                  Home
                </span>
              </Link>
            </li>
            <li className="relative group">
            <span
              id="family-toggle"
              onClick={() => setFamilyDropdownOpen(!familyDropdownOpen)}
              className={`text-lg hover:text-yellow-500 transition-colors duration-200 cursor-pointer select-none ${
                location === "/family-tree"
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : isScrolled
                  ? "text-white"
                  : "text-white"
              }`}
            >
              Family
            </span>

            {/* Dropdown */}
            <ul
              id="family-dropdown"
              className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md transition-opacity duration-200 z-50 
                ${familyDropdownOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} 
                group-hover:opacity-100 group-hover:pointer-events-auto`}
            >
              <li>
                <Link to="/family-history">
                  <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 hover:text-yellow-600">
                    Family History
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/family-tree">
                  <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 hover:text-yellow-600">
                    Family Tree
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/family-branches">
                  <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 hover:text-yellow-600">
                    Family Branches
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/family-directory">
                  <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 hover:text-yellow-600">
                    Family Directory
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/family-ebook">
                  <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 hover:text-yellow-600">
                    Family E-book
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/family-bylaw">
                  <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 hover:text-yellow-600">
                    Family By-law
                  </span>
                </Link>
              </li>
            </ul>
          </li>


            <li>
              <Link to="/news-events">
                <span className={`text-lg hover:text-yellow-500 transition-colors duration-200 cursor-pointer ${location === "/family-tree" ? "text-yellow-500 border-b-2 border-text-yellow-500" : isScrolled ? "text-white" : "text-white"}`}>
                  News & Events
                </span>
              </Link>
            </li>
            <li>
              <Link to="/charity">
                <span className={`text-lg hover:text-yellow-500 transition-colors duration-200 cursor-pointer ${location === "/family-tree" ? "text-yellow-500 border-b-2 border-text-yellow-500" : isScrolled ? "text-white" : "text-white"}`}>
                  Charity
                </span>
              </Link>
            </li>
            <li>
              <Link to="/academics">
                <span className={`text-lg hover:text-yellow-500 transition-colors duration-200 cursor-pointer ${location === "/family-tree" ? "text-yellow-500 border-b-2 border-text-yellow-500" : isScrolled ? "text-white" : "text-white"}`}>
                  Academics
                </span>
              </Link>
            </li>
            <li>
              <Link to="/family-matrimony">
                <span className={`text-lg hover:text-yellow-500 transition-colors duration-200 cursor-pointer ${location === "/family-tree" ? "text-yellow-500 border-b-2 border-text-yellow-500" : isScrolled ? "text-white" : "text-white"}`}>
                  Family Matrimony
                </span>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <span className={`text-lg hover:text-yellow-500 transition-colors duration-200 cursor-pointer ${location === "/about" ? "text-yellow-500 border-b-2 border-text-yellow-500" : isScrolled ? "text-white" : "text-white"}`}>
                  About
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          className="md:hidden bg-transparent border-none p-2"
        >
          {mobileMenuOpen ? (
            <X className={isScrolled ? "text-white" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-white" : "text-white"} />
          )}
        </button>


        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <div className="flex items-center cursor-pointer">
            <h3 className="font-heading text-lg font-semibold italic">
              <span className="text-secondary">Therampu Kudumbam </span> <br/>
              <span className="text-secondary">Since - 1701</span>
            </h3>
            {/* <img
              src={logoImage}
              alt="Family Legacy Logo"
              className={`h-10 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-90"}`}
            /> */}
              {/* <span className={`font-heading text-2lg font-bold transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`}>
                Family<span className="text-secondary">Legacy</span>
              </span> */}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu fixed top-[61px] left-0 bottom-0 w-64 bg-white shadow-lg z-50 md:hidden ${
          mobileMenuOpen ? "active" : ""
        }`}
      >
        <nav className="py-5 px-4">
          <ul className="space-y-4">
            <li>
              <Link to="/">
                <div className={`block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                  location === "/" 
                    ? "bg-light text-primary" 
                    : "hover:bg-primary hover:text-white text-dark"
                }`}>
                  Home
                </div>
              </Link>
            </li>
            <li>
              <button
                onClick={() => setMobileFamilyOpen(!mobileFamilyOpen)}
                className={`w-full text-left block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                  location.startsWith("/family") 
                    ? "bg-light text-primary" 
                    : "hover:bg-primary hover:text-white text-dark"
                }`}
              >
                Family
              </button>

              {/* Mobile submenu */}
              {mobileFamilyOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link to="/family-history">
                      <div className={`py-1 px-2 rounded text-sm cursor-pointer ${
                        location === "/family-history"
                          ? "bg-light text-primary"
                          : "hover:bg-primary hover:text-white text-dark"
                      }`}>
                        Family History
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/family-tree">
                      <div className={`py-1 px-2 rounded text-sm cursor-pointer ${
                        location === "/family-tree"
                          ? "bg-light text-primary"
                          : "hover:bg-primary hover:text-white text-dark"
                      }`}>
                        Family Tree
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/family-branches">
                      <div className={`py-1 px-2 rounded text-sm cursor-pointer ${
                        location === "/family-branches"
                          ? "bg-light text-primary"
                          : "hover:bg-primary hover:text-white text-dark"
                      }`}>
                        Family Branches
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/family-directory">
                      <div className={`py-1 px-2 rounded text-sm cursor-pointer ${
                        location === "/family-directory"
                          ? "bg-light text-primary"
                          : "hover:bg-primary hover:text-white text-dark"
                      }`}>
                        Family Directory
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/family-ebook">
                      <div className={`py-1 px-2 rounded text-sm cursor-pointer ${
                        location === "/family-ebook"
                          ? "bg-light text-primary"
                          : "hover:bg-primary hover:text-white text-dark"
                      }`}>
                        Family E-book
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/family-bylaw">
                      <div className={`py-1 px-2 rounded text-sm cursor-pointer ${
                        location === "/family-ebook"
                          ? "bg-light text-primary"
                          : "hover:bg-primary hover:text-white text-dark"
                      }`}>
                        Family By-law
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/news-events">
                <div className={`block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                  location === "/news-events" 
                    ? "bg-light text-primary" 
                    : "hover:bg-primary hover:text-white text-dark"
                }`}>
                  News & Events
                </div>
              </Link>
            </li>
            <li>
              <Link to="/charity">
                <div className={`block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                  location === "/charity" 
                    ? "bg-light text-primary" 
                    : "hover:bg-primary hover:text-white text-dark"
                }`}>
                  Charity
                </div>
              </Link>
            </li>
            <li>
              <Link to="/academics">
                <div className={`block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                  location === "/academics" 
                    ? "bg-light text-primary" 
                    : "hover:bg-primary hover:text-white text-dark"
                }`}>
                  Academics
                </div>
              </Link>
            </li>
            <li>
              <Link to="/family-matrimony">
                <div className={`block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                  location === "/family-matrimony" 
                    ? "bg-light text-primary" 
                    : "hover:bg-primary hover:text-white text-dark"
                }`}>
                  Family Matrimony
                </div>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <div className={`block font-medium py-2 px-3 rounded transition-colors duration-200 cursor-pointer ${
                  location === "/about" 
                    ? "bg-light text-primary" 
                    : "hover:bg-primary hover:text-white text-dark"
                }`}>
                  About
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
