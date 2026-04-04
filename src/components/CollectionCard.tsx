import { motion } from 'framer-motion';

interface CollectionCardProps {
  title: string;
  image: string;
  description?: string;
  onClick: () => void;
  shape?: "portrait" | "landscape" | "circle";
}

export default function CollectionCard({ title, image, description, onClick, shape = "portrait" }: CollectionCardProps) {
  const shapeClasses = {
    portrait: "aspect-[4/5] rounded-2xl",
    landscape: "aspect-video rounded-3xl",
    circle: "aspect-square rounded-full"
  };

  return (
    <motion.div 
      className={`group relative cursor-pointer overflow-hidden bg-black border border-gold-soft/20 shadow-2xl ${shapeClasses[shape]}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-700" />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-3xl font-display font-black text-white italic tracking-tight">{title}</h3>
          {description && (
            <p className="font-body text-[10px] uppercase font-black tracking-widest text-gold-soft mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {description}
            </p>
          )}
          <div className="w-12 h-[2px] bg-gold-soft mt-6 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </motion.div>
  );
}
