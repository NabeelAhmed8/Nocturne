import { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const ReviewForm = ({ initialName = '', onSubmit, submitting, successMessage, errorMessage }) => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!comment.trim()) {
      setLocalError('Please write your review feedback');
      return;
    }

    onSubmit({
      name: name.trim() || 'Verified Client',
      rating,
      title: title.trim(),
      comment: comment.trim(),
    });
  };

  return (
    <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="font-serif text-lg text-white">Write Atelier Review</h3>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Share your feedback on drape, sizing, and textile performance.
        </p>
      </div>

      {successMessage && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {(errorMessage || localError) && (
        <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-red-400 text-xs">
          {errorMessage || localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Star Rating Select */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
            Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className="p-1 hover:scale-110 transition-transform cursor-pointer"
              >
                <Star
                  className={`w-5 h-5 ${num <= rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'}`}
                />
              </button>
            ))}
            <span className="text-neutral-400 text-[11px] font-mono ml-2">
              {rating} {rating === 1 ? 'Star' : 'Stars'}
            </span>
          </div>
        </div>

        {/* Reviewer Name */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
            Your Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Julian Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
          />
        </div>

        {/* Review Title */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
            Headline
          </label>
          <input
            type="text"
            placeholder="Summary of your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
          />
        </div>

        {/* Review Comment */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
            Feedback Details
          </label>
          <textarea
            required
            rows={4}
            placeholder="Describe the fabric weight, silhouette, and movement..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-neutral-600"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50"
        >
          {submitting ? 'Recording Review...' : 'Transmit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
