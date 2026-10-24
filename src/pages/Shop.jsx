import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { OfflineNotice } from '../components/OfflineNotice';

export const Shop = () => {
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const searchQuery = useStore((state) => state.searchQuery);
  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const products = useStore((state) => state.products);
  const isLoadingProducts = useStore((state) => state.isLoadingProducts);
  const productError = useStore((state) => state.productError);
  const fetchProducts = useStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts('all', searchQuery);
  }, [searchQuery, fetchProducts]);

  const categories = [
    { id: 'all', label: 'All Garments' },
    { id: 'outerwear & jackets', label: 'Outerwear & Jackets' },
    { id: 'heavyweight tees', label: 'Heavyweight Tees' },
    { id: 'tailored trousers', label: 'Tailored Trousers' },
    { id: 'streetwear & shells', label: 'Streetwear & Shells' },
  ];

  const displayedProducts = (products || []).filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category?.toLowerCase() === selectedCategory;
  });

  return (
    <main className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12 text-center space-y-3 sm:space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Complete Archive</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-light text-white">The Catalog</h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light">
          Explore outerwear, precision trousers, organic jerseys, and technical streetwear capsules.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-8 sm:mb-12 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center p-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shrink-0 border ${
              selectedCategory === cat.id
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLoadingProducts ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-[#111] rounded-xl overflow-hidden border border-neutral-800 animate-pulse aspect-3/4 flex flex-col justify-end p-3 sm:p-5 space-y-2 sm:space-y-3">
              <div className="h-2 bg-neutral-800 rounded w-1/3"></div>
              <div className="h-3 sm:h-4 bg-neutral-800 rounded w-3/4"></div>
              <div className="h-2.5 sm:h-3.5 bg-neutral-800 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : productError ? (
        <OfflineNotice
          title="Server is Offline"
          message="The garments archive cannot be retrieved because the backend atelier server is unreachable."
          onRetry={() => fetchProducts('all', searchQuery)}
          returnTo="/"
          returnText="Return to Home"
        />
      ) : (displayedProducts || []).length === 0 ? (
        <div className="text-center py-20 border border-neutral-800 rounded-2xl bg-[#111] space-y-3">
          <p className="font-serif text-lg text-white">No Garments Found in Backend Archive</p>
          <p className="text-xs text-neutral-400 font-light">Try selecting another collection or clearing search terms.</p>
        </div>
      ) : (
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
        >
          {displayedProducts.map((product) => {
            const productId = product._id || product.id;
            return (
              <ProductCard
                key={productId}
                product={product}
                isWishlisted={wishlist.includes(productId)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />
            );
          })}
        </motion.div>
      )}
    </main>
  );
};

export default Shop;
