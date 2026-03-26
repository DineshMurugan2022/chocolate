import { X, Users, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useSocket } from '@/context/SocketContext';
import MagneticButton from './MagneticButton';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    images?: string[];
    rating: number;
    stock?: number;
  };
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [productViewers, setProductViewers] = useState(1);
  const gallery = [product.image, ...(product.images || [])];
  const { socket } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveImage(0);
      
      if (socket) {
        socket.emit('joinProduct', product._id);
        socket.on('updateProductViewers', (data: { productId: string; count: number }) => {
          if (data.productId === product._id) {
            setProductViewers(data.count);
          }
        });
      }
    } else {
      document.body.style.overflow = 'auto';
      if (socket) {
        socket.emit('leaveProduct', product._id);
        socket.off('updateProductViewers');
      }
    }

    return () => {
      if (socket && product._id) {
        socket.emit('leaveProduct', product._id);
        socket.off('updateProductViewers');
      }
    };
  }, [isOpen, product._id, socket]);

  const nextImage = () => setActiveImage((prev: number) => (prev + 1) % gallery.length);
  const prevImage = () => setActiveImage((prev: number) => (prev - 1 + gallery.length) % gallery.length);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-[0_40px_100px_rgba(107,94,85,0.15)] flex flex-col md:flex-row animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 border border-black/5 text-taupe-muted hover:text-umber-text hover:bg-black/10 transition-all"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="md:w-1/2 relative p-8 flex flex-col justify-center items-center bg-ivory-bg overflow-hidden group/image">
          {/* Pagination Dots (Top Left) */}
          <div className="absolute top-8 left-8 z-30 flex gap-2">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-gold-accent/30 ${
                  activeImage === idx ? 'bg-gold-accent scale-125' : 'bg-gold-accent/20 hover:bg-gold-accent/40'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows (Hover) */}
          {gallery.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 border border-black/5 flex items-center justify-center text-umber-text opacity-0 group-hover/image:opacity-100 transition-all hover:bg-gold-accent hover:text-white"
              >
                ←
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 border border-black/5 flex items-center justify-center text-umber-text opacity-0 group-hover/image:opacity-100 transition-all hover:bg-gold-accent hover:text-white"
              >
                →
              </button>
            </>
          )}

          {/* Decorative Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[120%] h-[120%] bg-gold-accent/10 rounded-full blur-[100px]" />
          </div>
          
          <img 
            key={activeImage}
            src={gallery[activeImage]} 
            alt={product.name}
            className="w-full h-auto max-h-[400px] object-contain rounded-2xl shadow-[0_20px_60px_rgba(107,94,85,0.15)] z-10 transition-all duration-500 animate-[fadeIn_0.5s_ease-out] border-2 border-white"
          />
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-accent/5 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold-accent/20 text-gold-accent px-3 py-1.5 rounded-full text-[10px] font-poppins font-bold uppercase tracking-widest border border-gold-accent/30 flex items-center gap-1.5">
                <Users size={12} className="text-gold-accent" /> {productViewers} Looking Now
              </span>
              {product.stock !== undefined && product.stock > 0 && product.stock < 10 && (
                <span className="bg-rose-500/10 text-rose-500 px-3 py-1.5 rounded-full text-[10px] font-poppins font-bold uppercase tracking-widest border border-rose-500/20 flex items-center gap-1.5 animate-pulse">
                  <Sparkles size={12} /> Only {product.stock} Left in Atelier
                </span>
              )}
              <span className="bg-umber-text/5 text-umber-text/60 px-3 py-1.5 rounded-full text-[10px] font-poppins font-bold uppercase tracking-widest border border-black/5 flex items-center gap-1.5">
                ⭐ {product.rating} Rating
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-medium text-umber-text leading-tight mb-4">
              {product.name}
            </h2>
            
            <p className="text-taupe-muted font-poppins text-sm leading-relaxed mb-8">
              {product.description}<br/><br/>
              An exquisite masterpiece crafted by our master chocolatiers. Experience the unparalleled depth of rare Asian flavors, meticulously balanced for the ultimate tasting journey.
            </p>

            <div className="text-3xl font-poppins font-bold text-gold-accent mb-8">
              ₹{product.price} <span className="text-sm text-taupe-muted line-through opacity-60 ml-2">₹{product.price + 100}</span>
            </div>

            <MagneticButton className="w-full sm:w-auto">
              <button 
                onClick={() => {
                  dispatch(addToCart({ ...product, id: product._id, quantity: 1 }));
                  onClose();
                }}
                className="w-full sm:w-auto px-10 py-4 bg-umber-text hover:bg-gold-accent text-white font-poppins font-semibold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 group"
              >
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                Add To Cart
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
