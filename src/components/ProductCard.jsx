import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { getImageUrl, handleImageError } from '../lib/utils';

export const ProductCard = ({ product, isWishlisted, onToggleWishlist, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const productId = product._id || product.id;
  const defaultSize = product.sizes?.[0] || 'M';
  const defaultColor = product.colors?.[0] || '#111111';

  return (
    <div className="group relative bg-[#111] rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col">
      {/* Product Image Container with hover transition */}
      <div 
        className="relative aspect-3/4 overflow-hidden bg-neutral-900 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${productId}`} className="block w-full h-full relative overflow-hidden">
          {/* Default Image */}
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className={`w-full h-full object-cover object-center absolute inset-0 transition-all duration-700 ease-out ${
              isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
            }`}
          />
          {/* Hover Image (Alternate view) */}
          <img 
            src={getImageUrl(product.hoverImage || product.image)} 
            alt={`${product.name} alternate view`}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className={`w-full h-full object-cover object-center absolute inset-0 transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
            }`}
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white text-black text-[8px] sm:text-[9px] uppercase font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full tracking-wider z-10 pointer-events-none shadow-md">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(productId);
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer ${
            isWishlisted ? 'bg-white text-black' : 'bg-black/50 text-white hover:bg-black/80'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-neutral-400 mb-1 uppercase tracking-widest">
            <span className="truncate max-w-[65%]">{product.category}</span>
            {product.reviews > 0 ? (
              <div className="flex items-center space-x-1 text-amber-400 shrink-0">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                <span>{product.rating ? Number(product.rating).toFixed(1) : ''}</span>
              </div>
            ) : (
              <span className="text-[8px] sm:text-[9px] text-neutral-500 lowercase tracking-normal">new drop</span>
            )}
          </div>
          <Link to={`/product/${productId}`} className="font-serif text-xs sm:text-base text-white hover:text-neutral-300 line-clamp-1 transition-colors">
            {product.name}
          </Link>
        </div>

        <div className="mt-2.5 sm:mt-4 flex items-center justify-between pt-2.5 sm:pt-4 border-t border-neutral-800 gap-1.5">
          <span className="text-xs sm:text-base font-semibold text-white whitespace-nowrap">${Number(product.price).toFixed(2)}</span>
          <button
            onClick={() => onAddToCart && onAddToCart(product, defaultSize, defaultColor)}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white text-black rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest hover:bg-neutral-200 transition-all cursor-pointer whitespace-nowrap"
          >
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
