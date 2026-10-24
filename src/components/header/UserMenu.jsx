import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';

export const UserMenu = ({ user, isOpen, onToggle, onClose, onLogout, wishlistCount = 0 }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative hidden sm:block" ref={menuRef}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-1.5 text-neutral-300 hover:text-white transition-colors p-1 cursor-pointer"
        aria-label="User account"
        title={user ? `Signed in as ${user.name}` : 'Client Portal'}
      >
        <div className="relative">
          <User className="w-5 h-5" />
          {user && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
          )}
        </div>
        {user && (
          <span className="text-xs font-medium text-neutral-300 max-w-24 truncate hidden xl:inline">
            {user.name.split(' ')[0]}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-[#111] border border-neutral-800 rounded-xl shadow-2xl p-5 text-xs space-y-4 z-50 backdrop-blur-lg animate-in fade-in zoom-in-95 duration-150">
          {user ? (
            <div className="space-y-3">
              <div className="border-b border-neutral-800 pb-3">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Verified Client</p>
                <p className="text-sm font-medium text-white font-serif mt-0.5 truncate">{user.name}</p>
                <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {user.memberTier || 'Atelier Circle'}
                </span>
              </div>

              <div className="space-y-1">
                <Link
                  to="/account"
                  onClick={onClose}
                  className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
                >
                  Client Profile & Orders
                </Link>
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
                >
                  <span>Wishlist Archive</span>
                  <span className="text-neutral-400 font-mono">{wishlistCount}</span>
                </Link>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="border-b border-neutral-800 pb-2.5">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Client Portal</p>
                <p className="text-xs text-neutral-300 font-serif mt-0.5">Welcome to Nocturne</p>
                <p className="text-[11px] text-neutral-500 font-light mt-0.5">
                  Access your orders & saved garments
                </p>
              </div>

              <div className="space-y-2 pt-0.5">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full py-2.5 px-3 bg-white text-black text-center text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="block w-full py-2.5 px-3 bg-neutral-900 border border-neutral-800 text-neutral-300 text-center text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
