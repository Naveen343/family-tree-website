import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon, Mail, Phone } from "lucide-react";

const QUICK_LINKS = [
  { name: "Home", to: "/" },
  { name: "Family History", to: "/family-history" },
  { name: "Family Tree", to: "/family-tree" },
  { name: "News & Events", to: "/news-events" },
  { name: "About", to: "/about" },
];

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: TwitterIcon, label: "Twitter" },
  { icon: YoutubeIcon, label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-[#131B24] text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-heading text-xl font-semibold italic mb-4">
              <span className="text-secondary">Therampu</span> Kudumbam
            </h3>
            <p className="text-white/70 leading-relaxed">
              Preserving our family history and connecting generations through shared stories
              and memories, since 1701.
            </p>
            <div className="flex space-x-3 mt-5">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-secondary hover:text-[#16202B] transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <span className="text-white/70 hover:text-secondary transition-colors duration-200 cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-secondary">
              Get In Touch
            </h3>
            <address className="not-italic text-white/70 space-y-2.5">
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-secondary shrink-0" /> +91 456-7890
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-secondary shrink-0" /> therampu@gmail.com
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Therampu Kudumbam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
