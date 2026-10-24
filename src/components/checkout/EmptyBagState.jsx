import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const EmptyBagState = () => {
  return (
    <main className="py-24 max-w-xl mx-auto px-4 text-center space-y-6 min-h-[60vh] flex flex-col justify-center items-center">
      <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
        <ShoppingBag className="w-8 h-8 stroke-1" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-serif text-white">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          There are currently no luxury garments staged for acquisition. Explore our atelier collection to select pieces.
        </p>
      </div>
      <Link
        to="/shop"
        className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all shadow-xl"
      >
        Explore Catalog
      </Link>
    </main>
  );
};

export default EmptyBagState;
