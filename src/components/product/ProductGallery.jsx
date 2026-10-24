import { getImageUrl, handleImageError } from '../../lib/utils';

export const ProductGallery = ({ product }) => {
  return (
    <div className="aspect-3/4 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 relative group">
      <img
        src={getImageUrl(product.image)}
        alt={product.name}
        decoding="async"
        onError={handleImageError}
        className="w-full h-full object-cover"
      />
      {product.hoverImage && (
        <img
          src={getImageUrl(product.hoverImage)}
          alt={`${product.name} view 2`}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      )}
      {product.badge && (
        <span className="absolute top-4 left-4 bg-white text-black text-[9px] uppercase font-bold px-3 py-1 rounded-full tracking-wider shadow-lg">
          {product.badge}
        </span>
      )}
    </div>
  );
};

export default ProductGallery;
