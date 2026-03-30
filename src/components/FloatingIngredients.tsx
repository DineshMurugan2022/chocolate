import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { createRandom } from '@/utils/random';

import cocoaBean from '../assets/cocoa-bean.png';
import almond from '../assets/almond.png';
import chocolateShard from '../assets/chocolate-shard.png';
import strawberrySlice from '../assets/strawberry-slice.png';
import cacaoPod from '../assets/cacao-pod.png';
import mintLeaf from '../assets/mint-leaf.png';

interface Ingredient {
  id: number;
  type: string;
  image: string;
  x: string;
  y: string;
  size: number;
  speed: number;
  rotateDir: 1 | -1;
}

const ingredients: Ingredient[] = [
  // Section 1: Hero & Top Reveal
  { id: 1, type: 'cocoa-bean', image: cocoaBean, x: '8%', y: '20vh', size: 140, speed: 0.15, rotateDir: 1 },
  { id: 2, type: 'almond', image: almond, x: '88%', y: '45vh', size: 90, speed: 0.1, rotateDir: -1 },
  { id: 3, type: 'chocolate-piece', image: chocolateShard, x: '4%', y: '130vh', size: 180, speed: 0.25, rotateDir: 1 },
  
  // Section 2: Exhibition Grid
  { id: 4, type: 'strawberry-slice', image: strawberrySlice, x: '82%', y: '280vh', size: 110, speed: 0.2, rotateDir: -1 },
  { id: 5, type: 'cacao-pod', image: cacaoPod, x: '15%', y: '350vh', size: 220, speed: 0.1, rotateDir: 1 },
  { id: 6, type: 'mint-leaf', image: mintLeaf, x: '94%', y: '420vh', size: 100, speed: 0.3, rotateDir: -1 },
  
  // Section 3: Mid Section
  { id: 7, type: 'cocoa-bean', image: cocoaBean, x: '78%', y: '550vh', size: 100, speed: 0.15, rotateDir: -1 },
  { id: 8, type: 'chocolate-piece', image: chocolateShard, x: '10%', y: '620vh', size: 140, speed: 0.2, rotateDir: 1 },
  
  // Section 4: Final Registry
  { id: 9, type: 'strawberry-slice', image: strawberrySlice, x: '86%', y: '780vh', size: 90, speed: 0.25, rotateDir: 1 },
  { id: 10, type: 'almond', image: almond, x: '12%', y: '850vh', size: 70, speed: 0.1, rotateDir: -1 },
  { id: 11, type: 'cacao-pod', image: cacaoPod, x: '80%', y: '980vh', size: 200, speed: 0.15, rotateDir: 1 },
  { id: 12, type: 'mint-leaf', image: mintLeaf, x: '6%', y: '1100vh', size: 110, speed: 0.2, rotateDir: -1 },
];

const IngredientSprite = ({ ing, smoothProgress }: { ing: Ingredient; smoothProgress: MotionValue<number> }) => {
  const yTransform = useTransform(smoothProgress, [0, 1], [0, -(2000 * ing.speed)]);
  const rotationTransform = useTransform(smoothProgress, [0, 1], [0, 720 * ing.rotateDir]);
  const rand = createRandom(ing.id * 9811);
  const floatDuration = 4 + rand() * 4;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ 
        left: ing.x, 
        top: ing.y,
        y: yTransform,
        rotate: rotationTransform
      }}
      className="absolute transition-all duration-700 pointer-events-none drop-shadow-2xl"
    >
      <motion.img
        src={ing.image}
        alt={ing.type}
        animate={{ 
           y: [0, -25, 0],
           rotate: [0, 5 * ing.rotateDir, 0]
        }}
        transition={{ 
           duration: floatDuration, 
           repeat: Infinity, 
           ease: "easeInOut" 
        }}
        style={{ width: ing.size, height: ing.size }} 
        className="opacity-100 blur-[0.2px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)] select-none"
      />
    </motion.div>
  );
};

export default function FloatingIngredients() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {ingredients.map((ing) => (
        <IngredientSprite key={ing.id} ing={ing} smoothProgress={smoothProgress} />
      ))}
    </div>
  );
}
