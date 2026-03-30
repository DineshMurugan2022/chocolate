import { useState } from 'react';
import { Star, Send, X } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ReviewForm({ productId, onSuccess, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length < 10) {
      toast.error('Please share a more detailed experience (min 10 characters)');
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/reviews/${productId}`, { rating, comment });
      toast.success('Your artisanal feedback has been curated!');
      onSuccess();
    } catch (error: unknown) {
      const message = error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
      toast.error(message || 'Failed to curate review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-10 rounded-[40px] border border-gold-accent/20 shadow-[0_30px_60px_rgba(107,94,85,0.15)] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <button 
        type="button"
        onClick={onCancel}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors text-taupe-muted"
      >
        <X size={20} />
      </button>

      <div className="relative z-10 flex flex-col gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-display font-medium text-umber-text mb-2">Share Your Experience</h3>
          <p className="text-taupe-muted text-sm">How would you describe the artistic depth of this piece?</p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-bold text-taupe-muted uppercase tracking-[0.2em]">Authenticity Rating</label>
          <div className="flex gap-3 justify-center md:justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className={`transition-colors duration-300 ${
                  (hoverRating || rating) >= star ? 'text-gold-accent' : 'text-black/10'
                }`}
              >
                <Star 
                  size={32} 
                  fill={(hoverRating || rating) >= star ? "currentColor" : "none"} 
                  strokeWidth={1.5}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-bold text-taupe-muted uppercase tracking-[0.2em]">Tasting Notes & Feedback</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share the nuances of flavors, textures, and your overall journey..."
            className="w-full h-40 bg-ivory-bg border border-black/5 rounded-2xl p-6 text-sm text-umber-text focus:outline-none focus:border-gold-accent/30 transition-all resize-none font-poppins leading-relaxed"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto self-end px-12 py-4 bg-umber-text text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100 shadow-xl hover:scale-105 active:scale-95"
        >
          {submitting ? (
            <div className="size-4 border-2 border-white/20 border-t-white animate-spin rounded-full" />
          ) : (
            <Send size={16} />
          )}
          {submitting ? 'Curating...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
