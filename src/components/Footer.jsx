import { Link } from 'react-router-dom';

// Clean inline SVG social icons
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-[#070707] border-t border-neutral-900 text-neutral-400 pt-10 sm:pt-16 pb-4 sm:pb-6 mt-10 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div className="space-y-4">
          <span className="text-xl font-serif tracking-[0.2em] font-bold uppercase text-white">
            Nocturne
          </span>
          <p className="text-xs font-light leading-relaxed text-neutral-500">
            Dark architectural garments crafted with organic materials and uncompromising precision for the contemporary wardrobe.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 bg-neutral-900 rounded-full hover:text-white transition-colors"><InstagramIcon className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 bg-neutral-900 rounded-full hover:text-white transition-colors"><TwitterIcon className="w-4 h-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 bg-neutral-900 rounded-full hover:text-white transition-colors"><FacebookIcon className="w-4 h-4" /></a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Navigation</h4>
          <ul className="space-y-2.5 text-xs font-light">
            <li><Link to="/shop" className="hover:text-white transition-colors">Catalog Archive</Link></li>
            <li><Link to="/lookbook" className="hover:text-white transition-colors">Lookbook FW26</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Concierge</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Client Care</h4>
          <ul className="space-y-2.5 text-xs font-light">
            <li><Link to="/shipping" className="hover:text-white transition-colors">Courier & Delivery</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/sizing" className="hover:text-white transition-colors">Sizing & Specifications</Link></li>
            <li><Link to="/textile-care" className="hover:text-white transition-colors">Textile Care</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Flagship Atelier</h4>
          <p className="text-xs font-light leading-relaxed text-neutral-500">
            88 Wooster Street, SoHo, New York, NY 10012<br />
            Mon - Sat: 11:00 AM - 7:00 PM<br />
            concierge@nocturne.com
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mt-6 sm:pt-8 sm:mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-2.5 sm:gap-0 pb-[env(safe-area-inset-bottom,0px)]">
        <p>&copy; 2026 Nocturne Inc. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-neutral-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-neutral-400">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};