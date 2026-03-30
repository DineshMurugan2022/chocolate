import { useState, useEffect, useCallback } from 'react';
import { Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/utils/api';
import ReviewForm from './ReviewForm';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: string;
}

interface CustomerReviewsProps {
  productId: string;
}

export default function CustomerReviews({ productId }: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get(`/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId, fetchReviews]);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="py-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-20 pb-12 border-b border-gold-soft/10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <MessageSquare size={16} className="text-gold-soft/40" />
             <span className="text-[10px] font-black text-gold-soft/30 uppercase tracking-[0.4em]">Testimonials_Registry</span>
          </div>
          <h2 className="text-4xl font-display font-black text-gold-soft italic">
             Artisan impressions
          </h2>
          <p className="text-gold-soft/40 text-sm font-serif italic max-w-xs">
             Encapsulated narratives from our distinguished connoisseur community.
          </p>
        </div>

        <div className="flex items-center gap-10 bg-black/40 p-8 rounded-[40px] border border-gold-soft/10 backdrop-blur-xl">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-display font-black text-gold-soft">{averageRating}</div>
            <div className="flex gap-1 text-gold-soft mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"} className="opacity-80" />
              ))}
            </div>
            <div className="text-[9px] font-black text-gold-soft/20 uppercase tracking-[0.3em] mt-3">
              {reviews.length} Validated Entries
            </div>
          </div>

          {user && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-10 h-14 bg-gold-soft text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-gold-soft/80 active:scale-95 shadow-xl shadow-gold-soft/10 italic"
            >
              Add Impression
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-20 p-10 bg-black/40 backdrop-blur-3xl rounded-[40px] border border-gold-soft/10 shadow-2xl"
          >
            <ReviewForm
              productId={productId}
              onSuccess={() => {
                setShowForm(false);
                fetchReviews();
              }}
              onCancel={() => setShowForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-10">
        {loading ? (
          <div className="py-40 text-center text-gold-soft/20 flex flex-col items-center gap-6">
            <div className="size-12 rounded-full border-2 border-gold-soft/5 border-t-gold-soft animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] italic">Accessing Heritage_Vault...</p>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/20 backdrop-blur-3xl p-10 rounded-[45px] border border-gold-soft/5 hover:border-gold-soft/10 transition-all flex flex-col gap-6 shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 text-gold-soft">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className="opacity-60" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                   <div className="h-px w-8 bg-gold-soft/10" />
                   <span className="font-mono text-[9px] font-medium text-gold-soft/20 uppercase tracking-tighter">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </span>
                </div>
              </div>

              <p className="text-gold-soft/60 text-xl font-serif italic leading-relaxed pl-6 border-l-2 border-gold-soft/10">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between mt-4 pt-6 border-t border-gold-soft/5">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-gold-soft/5 border border-gold-soft/10 flex items-center justify-center text-gold-soft/40 text-[11px] font-black uppercase group-hover:bg-gold-soft group-hover:text-black transition-all">
                    {review.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-display font-black text-gold-soft italic">{review.user.name}</p>
                    {review.isVerified && (
                      <div className="flex items-center gap-2 text-gold-soft/40 text-[8px] font-black uppercase tracking-[0.2em] mt-1">
                        <CheckCircle2 size={10} className="text-gold-soft/60" />
                        Verified_Acquisition
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-40 text-center bg-black/20 rounded-[60px] border border-dashed border-gold-soft/10">
            <MessageSquare size={48} strokeWidth={1} className="text-gold-soft/5 mx-auto mb-8" />
            <h3 className="text-3xl font-display font-black text-gold-soft/20 italic mb-4">Registry vacant</h3>
            <p className="text-gold-soft/10 font-body text-[10px] font-black uppercase tracking-[0.4em] mb-10">Be the first to record a sensory narrative.</p>
            {!showForm && user && (
              <button
                onClick={() => setShowForm(true)}
                className="px-12 h-14 bg-black/40 border border-gold-soft/10 text-gold-soft/40 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-gold-soft hover:text-black italic"
              >
                Initiate Impression
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
