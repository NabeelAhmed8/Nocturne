import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck, LogIn, UserPlus } from 'lucide-react';
import { getImageUrl, handleImageError } from '../../lib/utils';

export const AuthRequiredState = ({ cart, grandTotal }) => {
  return (
    <main className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link to="/shop" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Catalog</span>
      </Link>

      <div className="bg-[#111] border border-neutral-800 p-5 sm:p-12 rounded-xl sm:rounded-2xl space-y-6 sm:space-y-8 shadow-2xl">
        <div className="text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white">
            <Lock className="w-6 h-6 text-neutral-300" />
          </div>

          <div className="inline-flex items-center space-x-2 text-amber-400 text-[10px] font-mono uppercase tracking-[0.2em] bg-amber-950/30 px-3 py-1 rounded-full border border-amber-900/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Client Authentication Required</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Client Sign In Required
          </h1>

          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            To preserve garment provenance, maintain your permanent acquisition archive, and coordinate direct courier delivery, guest checkout is not permitted. All orders must be placed under an authenticated Nocturne client account.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Link
            to="/login?redirect=/checkout"
            className="py-4 px-6 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center space-x-2 shadow-xl"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Atelier</span>
          </Link>

          <Link
            to="/register?redirect=/checkout"
            className="py-4 px-6 bg-neutral-900 border border-neutral-700 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:border-white transition-all flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Client Account</span>
          </Link>
        </div>

        <div className="border-t border-neutral-800/80 pt-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="uppercase tracking-widest text-[10px] font-semibold text-neutral-300">
              Staged Acquisition Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </span>
            <span className="font-mono text-white text-sm font-semibold">${grandTotal.toFixed(2)}</span>
          </div>

          <div className="divide-y divide-neutral-800/60 max-h-56 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartId} className="py-3 flex items-center space-x-4">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  className="w-12 h-14 object-cover rounded bg-neutral-900 border border-neutral-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-serif text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-neutral-400">Size: {item.selectedSize} &middot; Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-mono font-medium text-white shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-500 text-center font-light pt-2">
            Your garments have been preserved in your bag. Upon signing in or registering, you will immediately return here to finalize delivery coordinates.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthRequiredState;
