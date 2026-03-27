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
    <section className="py-24 border-t border-gray-100 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
               Customer Reviews
            </h2>
            <p className="text-gray-500 text-base">
               What our community thinks about this product.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
              <div className="flex gap-0.5 text-yellow-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"} />
                ))}
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">
                {reviews.length} Reviews
              </div>
            </div>

            {user && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold transition-all hover:bg-black active:scale-95"
              >
                Write a Review
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-16"
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

        <div className="space-y-6">
          {loading ? (
            <div className="py-20 text-center text-gray-400 flex flex-col items-center gap-4">
              <div className="size-8 rounded-full border-2 border-gray-100 border-t-gray-900 animate-spin" />
              <p className="text-xs font-medium">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <p className="text-gray-900 text-base leading-relaxed">
                  "{review.comment}"
                </p>

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100/50">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-bold uppercase">
                      {review.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{review.user.name}</p>
                      {review.isVerified && (
                        <div className="flex items-center gap-1 text-green-600 text-[9px] font-bold uppercase tracking-wider">
                          <CheckCircle2 size={10} />
                          Verified Purchase
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <MessageSquare size={32} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No reviews yet</h3>
              <p className="text-gray-500 text-sm mb-6">Be the first to share your thoughts.</p>
              {!showForm && user && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold transition-all hover:bg-black"
                >
                  Write a Review
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
