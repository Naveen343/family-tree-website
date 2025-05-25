import { Link } from "wouter";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-bold italic">
              <span className="text-secondary">Therampu</span> Kudumbam
            </h3>
            <p className="mb-4">
              Preserving our family history and connecting generations through shared stories and memories.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="#" 
                className="text-white hover:text-secondary transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-secondary transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-secondary transition-colors duration-200"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-secondary transition-colors duration-200"
                aria-label="YouTube"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-white/80 hover:text-secondary transition-colors duration-200 cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/family-tree">
                  <span className="text-white/80 hover:text-secondary transition-colors duration-200 cursor-pointer">
                    Family Tree
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-white/80 hover:text-secondary transition-colors duration-200 cursor-pointer">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-white/80 hover:text-secondary transition-colors duration-200 cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Get In Touch</h3>
            <address className="not-italic text-white/80">
              <p>Phone (1) : +91 456-7890</p>
              <p>Phone (2) : +91 456-7890</p>
              <p>Phone (3) : +91 456-7890</p>
              <p className="mb-2">Email: therampu@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Therambu Kudumbam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
