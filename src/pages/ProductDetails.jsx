import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { api } from '../lib/api';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ProductReviewsList } from '../components/product/ProductReviewsList';
import { ReviewForm } from '../components/product/ReviewForm';
import { OfflineNotice } from '../components/OfflineNotice';

export const ProductDetails = ({ onOpenCart }) => {
  const { id } = useParams();
  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const user = useStore((state) => state.user);
  const submitProductReview = useStore((state) => state.submitProductReview);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#111111');

  // Review status
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [reviewError, setReviewError] = useState('');

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(`/products/${id}`);
      if (data?.product) {
        setProduct(data.product);
        setSelectedSize(data.product.sizes?.[0] || 'M');
        setSelectedColor(data.product.colors?.[0] || '#111111');
      } else {
        setError('Garment not found in atelier');
      }
    } catch (err) {
      setError(err.message || 'Server is offline');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = () => {
    if (!product || (product.countInStock !== undefined && product.countInStock <= 0)) return;
    addToCart(product, selectedSize, selectedColor);
    if (onOpenCart) onOpenCart();
  };

  const handleReviewSubmit = async (reviewData) => {
    setReviewError('');
    setReviewSuccess('');
    setSubmittingReview(true);

    const res = await submitProductReview(id, reviewData);
    setSubmittingReview(false);

    if (res?.success) {
      setReviewSuccess('Thank you. Your atelier review has been recorded.');
      if (res.product) {
        setProduct(res.product);
      } else {
        loadProduct();
      }
    } else {
      setReviewError(res?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <main className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-3/4 rounded-2xl bg-neutral-900 border border-neutral-800" />
          <div className="space-y-6 flex flex-col justify-center">
            <div className="h-4 bg-neutral-800 rounded w-24" />
            <div className="h-8 bg-neutral-800 rounded w-3/4" />
            <div className="h-6 bg-neutral-800 rounded w-20" />
            <div className="h-16 bg-neutral-800 rounded w-full" />
            <div className="h-12 bg-neutral-800 rounded-full w-48" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <OfflineNotice
        title={error?.toLowerCase().includes('offline') || error?.toLowerCase().includes('server') ? 'Server is Offline' : 'Garment Not Found'}
        message={error?.toLowerCase().includes('offline') || error?.toLowerCase().includes('server') ? 'The garment archive cannot be retrieved because the backend server is unreachable. Please ensure the server is running.' : 'The requested archival garment could not be retrieved from the atelier database.'}
        onRetry={loadProduct}
        returnTo="/shop"
        returnText="Return to Catalog"
      />
    );
  }

  const productId = product._id || product.id;
  const reviewsList = product.reviewsList || [];

  return (
    <main className="py-10 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      <Link to="/shop" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <ProductGallery product={product} />

        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.includes(productId)}
          onToggleWishlist={() => toggleWishlist(productId)}
        />
      </div>

      {/* Verified Reviews Section */}
      <section className="pt-8 sm:pt-12 border-t border-neutral-800 space-y-8 sm:space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Client Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              Atelier Reviews ({reviewsList.length})
            </h2>
          </div>
          {reviewsList.length > 0 && (
            <div className="flex items-center space-x-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl">
              <span className="text-xl font-serif text-white font-semibold">
                {product.rating ? Number(product.rating).toFixed(1) : ''}
              </span>
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= Math.round(product.rating || 0) ? 'fill-current' : 'text-neutral-700'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-400">/ 5.0 Rating</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <ProductReviewsList reviewsList={reviewsList} />
          </div>

          <div>
            <ReviewForm
              initialName={user?.name || ''}
              onSubmit={handleReviewSubmit}
              submitting={submittingReview}
              successMessage={reviewSuccess}
              errorMessage={reviewError}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
