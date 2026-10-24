import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { getImageUrl, handleImageError } from '../lib/utils';
import { useStore } from '../store/useStore';
import { ArrowRight } from 'lucide-react';
import { OfflineNotice } from '../components/OfflineNotice';

export const Lookbook = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const navigate = useNavigate();

  const fetchLookbooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/lookbook');
      setItems(res?.lookbooks || []);
    } catch (err) {
      setItems([]);
      setError(err.message || 'Server is offline');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLookbooks();
  }, [fetchLookbooks]);

  const handleShopCapsule = (category) => {
    if (category && category !== 'all') {
      setSelectedCategory(category);
      navigate(`/shop?category=${category}`);
    } else {
      setSelectedCategory('all');
      navigate('/shop');
    }
  };

  return (
    <main className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      <div className="text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Editorial Visual Archive</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-white">The Lookbook</h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
          Explore our seasonal runway capsules, architectural silhouettes, and brutalist tailoring documented live from the atelier archive.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#111] rounded-2xl border border-neutral-800 animate-pulse aspect-4/5 flex items-center justify-center p-8 text-center"
            >
              <span className="text-xs text-neutral-600 font-serif uppercase tracking-widest">
                Retrieving Lookbook Archive...
              </span>
            </div>
          ))}
        </div>
      ) : error ? (
        <OfflineNotice
          title="Server is Offline"
          message="The editorial lookbook capsules cannot be retrieved because the backend atelier server is unreachable."
          onRetry={fetchLookbooks}
          returnTo="/"
          returnText="Return to Home"
        />
      ) : items.length === 0 ? (
        <div className="text-center py-24 border border-neutral-800 rounded-2xl bg-[#111] space-y-3 p-8 max-w-xl mx-auto">
          <h2 className="font-serif text-lg text-white">No Lookbook Capsules Found</h2>
          <p className="text-xs text-neutral-400 font-light">
            Editorial records are currently being curated in the atelier database.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id || item.id}
              className={`relative group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-4/5 ${
                item.span || 'col-span-1 row-span-1'
              }`}
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.title}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8">
                <span className="text-[10px] uppercase tracking-widest text-neutral-300 mb-2 font-medium">
                  {item.subtitle}
                </span>
                <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
                <button
                  onClick={() => handleShopCapsule(item.categoryFilter)}
                  className="self-start px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer inline-flex items-center space-x-2"
                >
                  <span>Shop Capsule</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Lookbook;
