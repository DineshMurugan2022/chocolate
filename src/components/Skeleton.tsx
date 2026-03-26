import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export default function Skeleton({ className = "", variant = 'rectangular' }: SkeletonProps) {
  const baseClass = "bg-taupe-muted/10 animate-pulse relative overflow-hidden";
  const variantClass = variant === 'circular' ? 'rounded-full' : variant === 'text' ? 'rounded-md h-4' : 'rounded-2xl';

  return (
    <div className={`${baseClass} ${variantClass} ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </div>
  );
}

export const ProductSkeleton = () => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-black/5 space-y-6">
    <Skeleton className="w-full aspect-square" />
    <div className="space-y-3">
      <Skeleton className="w-2/3 h-6" variant="text" />
      <Skeleton className="w-full h-10" variant="text" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="w-20 h-8" variant="text" />
        <Skeleton className="w-24 h-10" />
      </div>
    </div>
  </div>
);

export const OrderSkeleton = () => (
  <div className="p-8 bg-white/5 border border-white/5 rounded-3xl space-y-6">
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-24 h-4" />
      </div>
      <Skeleton className="w-32 h-8" />
    </div>
    <div className="space-y-3">
      <Skeleton className="w-1/2 h-6" />
      <Skeleton className="w-1/3 h-4" />
    </div>
  </div>
);
