import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SearchBar } from './header/SearchBar';
import { UserMenu } from './header/UserMenu';
import { MobileNav } from './header/MobileNav';
import { BrandLogo } from './BrandLogo';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Catalog', path: '/shop' },
  { label: 'Lookbook', path: '/lookbook' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Header = ({ onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Monitor scroll for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop');
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#070707]/95 backdrop-blur-md border-neutral-800 shadow-lg shadow-black/60'
          : 'bg-[#070707]/80 backdrop-blur-md border-neutral-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-300 hover:text-white p-1 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <BrandLogo size="md" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors relative py-1 ${
                isActive(item.path)
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`transition-colors p-1 cursor-pointer ${
              searchOpen ? 'text-white' : 'text-neutral-300 hover:text-white'
            }`}
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/wishlist"
            className={`relative transition-colors hidden sm:block p-1 ${
              isActive('/wishlist') ? 'text-white' : 'text-neutral-300 hover:text-white'
            }`}
            aria-label={`Wishlist with ${wishlist.length} items`}
            title={`Wishlist (${wishlist.length})`}
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-white text-white' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <UserMenu
            user={user}
            isOpen={userMenuOpen}
            onToggle={() => setUserMenuOpen(!userMenuOpen)}
            onClose={() => setUserMenuOpen(false)}
            onLogout={handleLogout}
            wishlistCount={wishlist.length}
          />

          <button
            onClick={onOpenCart}
            className="relative bg-neutral-900 border border-neutral-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center space-x-2 text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
            aria-label={`Shopping bag with ${totalItems} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-mono font-medium">{totalItems}</span>
          </button>
        </div>
      </div>

      <SearchBar
        isOpen={searchOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
        isActive={isActive}
        user={user}
        wishlistCount={wishlist.length}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
