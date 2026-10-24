import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const products = useStore((state) => state.products);
  const isLoadingProducts = useStore((state) => state.isLoadingProducts);
  const productError = useStore((state) => state.productError);
  const fetchProducts = useStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = [
    'outerwear & jackets',
    'heavyweight tees',
    'tailored trousers',
    'streetwear & shells',
  ];

  const featuredProducts = categories
    .map((cat) => products.find((p) => p.category?.toLowerCase() === cat))
    .filter(Boolean);

  return (
    <div>
      <Hero />

      {/* Value Propositions */}
      <section className="border-y border-neutral-800 bg-[#0a0a0a] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2 p-4">
            <Truck className="w-7 h-7 mx-auto text-neutral-400 stroke-[1.5]" />
            <h3 className="font-serif text-base text-white tracking-wider">Global Express Courier</h3>
            <p className="text-xs text-neutral-400 font-light">Complimentary carbon-neutral worldwide shipping on orders above $250.</p>
          </div>
          <div className="space-y-2 p-4">
            <ShieldCheck className="w-7 h-7 mx-auto text-neutral-400 stroke-[1.5]" />
            <h3 className="font-serif text-base text-white tracking-wider">Uncompromising Textiles</h3>
            <p className="text-xs text-neutral-400 font-light">Sourced exclusively from certified organic European and Japanese mills.</p>
          </div>
          <div className="space-y-2 p-4">
            <RefreshCw className="w-7 h-7 mx-auto text-neutral-400 stroke-[1.5]" />
            <h3 className="font-serif text-base text-white tracking-wider">30-Day Articulated Returns</h3>
            <p className="text-xs text-neutral-400 font-light">Seamless doorstep pickups for exchanges and effortless refunds.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">Curated Selection</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-white mt-1">Featured Drops</h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs tracking-[0.15em] uppercase text-neutral-400 hover:text-white flex items-center space-x-2 group"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#111] rounded-xl overflow-hidden border border-neutral-800 animate-pulse aspect-3/4 flex flex-col justify-end p-5 space-y-3">
                <div className="h-2.5 bg-neutral-800 rounded w-1/3"></div>
                <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                <div className="h-3.5 bg-neutral-800 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : productError ? (
          <div className="text-center py-20 border border-neutral-800 rounded-2xl bg-[#111] space-y-4 p-8 max-w-xl mx-auto">
            <p className="font-serif text-xl text-white uppercase tracking-wider">Server is Offline</p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Atelier database is currently unreachable. Live garment records cannot be displayed until the backend server is online.
            </p>
            <div className="pt-2">
              <button
                onClick={() => fetchProducts()}
                className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          </div>
        ) : (featuredProducts || []).length === 0 ? (
          <div className="text-center py-16 border border-neutral-800 rounded-2xl bg-[#111] space-y-3">
            <p className="font-serif text-lg text-white">No Active Drops Found</p>
            <p className="text-xs text-neutral-400 font-light">Products will appear once added to the backend database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => {
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
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
