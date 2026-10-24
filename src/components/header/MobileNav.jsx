import { Link } from 'react-router-dom';
import { LogOut, Heart } from 'lucide-react';
import { useScrollLock } from '../../hooks/useScrollLock';

export const MobileNav = ({
  isOpen,
  onClose,
  navLinks,
  isActive,
  user,
  wishlistCount = 0,
  onLogout,
}) => {
  // Freeze background page scrollbar when mobile navbar is opened
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay to lock out background touches and enable tap-to-close */}
      <div
        className="fixed inset-0 top-16 sm:top-20 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div className="relative z-40 md:hidden border-t border-neutral-800 bg-[#070707] px-4 pt-4 pb-8 space-y-4 animate-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
        <nav className="flex flex-col space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`text-sm tracking-[0.2em] uppercase font-medium py-2 px-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/wishlist"
            onClick={onClose}
            className="text-sm tracking-[0.2em] uppercase font-medium py-2 px-3 rounded-lg text-neutral-400 hover:text-white flex items-center justify-between"
          >
            <span className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Wishlist Archive</span>
            </span>
            <span className="bg-neutral-800 text-neutral-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
              {wishlistCount}
            </span>
          </Link>
        </nav>

        <div className="pt-4 border-t border-neutral-800 space-y-3">
          {user ? (
            <div className="space-y-3 px-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Authenticated as</p>
                  <p className="text-sm font-medium text-white font-serif">{user.name}</p>
                </div>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {user.memberTier || 'Atelier Circle'}
                </span>
              </div>
              <Link
                to="/account"
                onClick={onClose}
                className="block w-full py-2.5 bg-neutral-900 text-center text-xs uppercase tracking-widest font-bold text-white rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors"
              >
                Client Profile & Orders
              </Link>
              <button
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 text-xs uppercase tracking-widest font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 px-3">
              <Link
                to="/login"
                onClick={onClose}
                className="block w-full py-2.5 bg-white text-black text-center text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="block w-full py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-center text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
