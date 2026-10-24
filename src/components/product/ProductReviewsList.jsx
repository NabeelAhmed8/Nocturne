import { Star, ShieldCheck, MessageSquare } from 'lucide-react';

export const ProductReviewsList = ({ reviewsList = [] }) => {
  if (reviewsList.length === 0) {
    return (
      <div className="p-8 bg-[#111] border border-neutral-800 rounded-2xl text-center space-y-2">
        <MessageSquare className="w-8 h-8 text-neutral-600 mx-auto" />
        <p className="text-sm font-serif text-white">No reviews yet for this garment</p>
        <p className="text-xs text-neutral-400 font-light">
          Be the first client to provide verified feedback on this silhouette.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviewsList.map((rev, index) => (
        <div
          key={rev._id || index}
          className="p-6 bg-[#111] border border-neutral-800 rounded-2xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white text-xs font-serif">
                {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-xs font-semibold text-white">{rev.name}</p>
                  <span className="inline-flex items-center space-x-1 text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-900/60">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Client</span>
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500">
                  {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Verified Acquisition'}
                </p>
              </div>
            </div>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${star <= rev.rating ? 'fill-current' : 'text-neutral-700'}`}
                />
              ))}
            </div>
          </div>

          {rev.title && (
            <h4 className="text-xs font-serif font-semibold text-white pt-1">{rev.title}</h4>
          )}
          <p className="text-xs text-neutral-300 font-light leading-relaxed">{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewsList;
