import { Star, ShoppingBag, Heart } from 'lucide-react';

export const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const isOutOfStock = product.countInStock !== undefined && product.countInStock <= 0;
  const reviewsList = product.reviewsList || [];

  return (
    <div className="space-y-6 flex flex-col justify-center">
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
          {product.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white">{product.name}</h1>

        {reviewsList.length > 0 ? (
          <div className="flex items-center space-x-2 text-amber-400 text-sm pt-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(product.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-medium text-xs">
              {product.rating ? Number(product.rating).toFixed(1) : ''}
            </span>
            <span className="text-neutral-500 text-xs">
              ({reviewsList.length} verified {reviewsList.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        ) : (
          <div className="text-xs text-neutral-400 font-light pt-1">
            No client reviews yet &bull; Be the first to review
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-4">
        <p className="text-3xl font-semibold text-white">${Number(product.price).toFixed(2)}</p>
        {isOutOfStock ? (
          <span className="text-xs uppercase tracking-widest text-red-400 font-medium bg-red-950/40 px-3 py-1 rounded-full border border-red-900/60">
            Archived / Out of Stock
          </span>
        ) : (
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/60">
            In Stock ({product.countInStock} available at atelier)
          </span>
        )}
      </div>

      <p className="text-sm text-neutral-300 font-light leading-relaxed">{product.description}</p>

      {/* Sizes Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
            Select Size
          </span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`w-12 h-12 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${
                  selectedSize === sz
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
            Textile Finish
          </span>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((clr) => (
              <button
                key={clr}
                type="button"
                onClick={() => setSelectedColor(clr)}
                style={{ backgroundColor: clr }}
                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                  selectedColor === clr ? 'border-white scale-110' : 'border-neutral-800 hover:border-neutral-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-6 border-t border-neutral-800 flex items-center space-x-4">
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-xl flex items-center justify-center space-x-2 ${
            isOutOfStock
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : 'bg-white text-black hover:bg-neutral-200 cursor-pointer'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
        </button>
        <button
          onClick={onToggleWishlist}
          className={`p-4 rounded-full border border-neutral-800 transition-colors cursor-pointer ${
            isWishlisted ? 'bg-white text-black' : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
          title="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
