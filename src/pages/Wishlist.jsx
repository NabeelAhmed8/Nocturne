import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getImageUrl, handleImageError } from '../lib/utils';

export const Wishlist = ({ onOpenCart }) => {
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCart = useStore((state) => state.addToCart);
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const wishlistProducts = (products || []).filter((p) => wishlist.includes(p._id || p.id));

  return (
    <main className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 min-h-[60vh]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-800 pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Curated Archive</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mt-1">Saved Wishlist</h1>
        </div>
        <p className="text-xs text-neutral-400 mt-2 sm:mt-0 font-light">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'garment' : 'garments'} preserved
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <Heart className="w-16 h-16 mx-auto text-neutral-700 stroke-1" />
          <div className="space-y-2">
            <h2 className="text-xl font-serif text-white">Your curation is currently empty</h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto font-light leading-relaxed">
              Explore our architectural silhouettes and save your essential garments for later acquisition.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore Catalog</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {wishlistProducts.map((product) => {
            const productId = product._id || product.id;
            return (
              <div
                key={productId}
                className="group relative bg-[#111] rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all flex flex-col"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-neutral-900">
                  <Link to={`/product/${productId}`}>
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => toggleWishlist(productId)}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/60 text-white hover:text-red-400 backdrop-blur-md transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest">{product.category}</span>
                    <Link to={`/product/${productId}`} className="block font-serif text-xs sm:text-base text-white hover:text-neutral-300 mt-1 line-clamp-1">
                      {product.name}
                    </Link>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-1.5 sm:mt-2">${product.price.toFixed(2)}</p>
                  </div>

                  <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-4 border-t border-neutral-800">
                    <button
                      onClick={() => {
                        addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0] || '#111');
                        if (onOpenCart) onOpenCart();
                      }}
                      className="w-full py-1.5 sm:py-2.5 bg-white text-black rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center space-x-1.5 sm:space-x-2"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Wishlist;

