import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ingredients = [
  { id: 1, type: 'cocoa-bean', x: '10%', y: '150vh', size: 60, delay: 0 },
  { id: 2, type: 'almond', x: '85%', y: '280vh', size: 40, delay: 0.5 },
  { id: 3, type: 'chocolate-piece', x: '5%', y: '450vh', size: 80, delay: 1 },
  { id: 4, type: 'strawberry-slice', x: '80%', y: '580vh', size: 50, delay: 1.5 },
  { id: 5, type: 'cocoa-pod', x: '15%', y: '720vh', size: 100, delay: 2 },
  { id: 6, type: 'mint-leaf', x: '90%', y: '850vh', size: 40, delay: 2.5 },
];

export default function FloatingIngredients() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {ingredients.map((ing) => {
        // Different parallax factors for each ingredient
        const yTransform = useTransform(smoothProgress, [0, 1], [0, -(1000 + Math.random() * 2000)]);
        const rotationTransform = useTransform(smoothProgress, [0, 1], [0, 360 * (ing.id % 2 === 0 ? 1 : -1)]);
        
        return (
          <motion.div
            key={ing.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: ing.delay, duration: 1.5, ease: "easeOut" }}
            style={{ 
              left: ing.x, 
              top: ing.y,
              y: yTransform,
              rotate: rotationTransform
            }}
            className="absolute transition-all duration-700 pointer-events-none drop-shadow-2xl"
          >
            {/* Using more identifiable and visible placeholders for ingredients */}
            <div 
              style={{ width: ing.size, height: ing.size }} 
              className={`opacity-40 rounded-[30%_70%_70%_30%] blur-[0.5px] border border-white/10 flex items-center justify-center
                ${ing.type.includes('cocoa') ? 'bg-[#3D2B1F]' : 
                  ing.type.includes('almond') ? 'bg-[#C29B6D]' : 
                  ing.type.includes('strawberry') ? 'bg-[#E63946]' : 
                  'bg-burnt-caramel'}`}
            >
               <span className="text-[12px] font-black uppercase text-white/40 select-none">
                  {ing.type.charAt(0)}
               </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
