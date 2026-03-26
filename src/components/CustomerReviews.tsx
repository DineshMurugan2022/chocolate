import { useState, useEffect } from 'react';
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

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="py-24 px-6 md:px-10 lg:px-20 bg-ivory-bg/30 border-t border-black/5 rounded-[60px] mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <span className="text-gold-accent font-poppins font-bold tracking-[0.3em] uppercase text-[10px] block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-umber-text">
              Artisanal <span className="italic text-gold-accent font-light">Impressions</span>
            </h2>
            <p className="text-taupe-muted max-w-xl text-lg leading-relaxed">
              Discover the sensory journeys shared by our patrons of this masterpiece.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-6 bg-white/50 backdrop-blur-xl p-6 rounded-3xl border border-black/5 shadow-sm">
              <div className="text-center">
                <div className="text-5xl font-display font-bold text-umber-text">{averageRating}</div>
                <div className="flex gap-1 text-gold-accent mt-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"} strokeWidth={1.5} />
                  ))}
                </div>
                <div className="text-[10px] font-bold text-taupe-muted uppercase tracking-widest mt-2 opacity-60">
                  {reviews.length} Reflections
                </div>
              </div>
            </div>

            {user && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-10 py-4 bg-umber-text text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold-accent transition-all shadow-[0_15px_30px_rgba(107,94,85,0.2)] hover:scale-105 active:scale-95 flex items-center gap-2 group"
              >
                <div className="size-1.5 rounded-full bg-gold-accent animate-pulse" />
                Capture Your Journey
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 64 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center text-taupe-muted flex flex-col items-center gap-4">
              <div className="size-12 rounded-full border-2 border-gold-accent/20 border-t-gold-accent animate-spin" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Summoning testimonials...</p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm p-10 rounded-[40px] border border-black/5 shadow-[0_15px_40px_rgba(107,94,85,0.04)] flex flex-col gap-6 group hover:shadow-[0_25px_60px_rgba(107,94,85,0.12)] transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex gap-1 text-gold-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-taupe-muted/60 uppercase tracking-widest">
                    {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <p className="text-umber-text font-poppins text-base leading-relaxed italic relative z-10">
                  "{review.comment}"
                </p>

                <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent text-xs font-bold uppercase overflow-hidden">
                      {review.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-umber-text tracking-wide">{review.user.name}</p>
                      <p className="text-[9px] text-taupe-muted uppercase tracking-[0.2em] font-medium opacity-60">Verified Patron</p>
                    </div>
                  </div>

                  {review.isVerified && (
                    <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/5 px-4 py-1.5 rounded-full border border-emerald-500/10">
                      <CheckCircle2 size={12} />
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Verified</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white/30 backdrop-blur-sm rounded-[60px] border-2 border-dashed border-black/5">
              <div className="size-20 rounded-3xl bg-black/5 flex items-center justify-center text-taupe-muted/30 mx-auto mb-8 rotate-12 group hover:rotate-0 transition-transform duration-500">
                <MessageSquare size={40} />
              </div>
              <h3 className="text-2xl font-display text-umber-text mb-3">Be the first to grace this piece</h3>
              <p className="text-taupe-muted text-sm max-w-xs mx-auto mb-10 leading-relaxed">
                Your sensory journey will guide fellow patrons in their quest for the perfect truffle.
              </p>
              {!showForm && user && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-12 py-4 bg-gold-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-umber-text transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Write Your Review
                </button>
              )}
              {!user && (
                <p className="text-[10px] font-bold text-taupe-muted uppercase tracking-widest opacity-40">Please sign in to share your journey</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
