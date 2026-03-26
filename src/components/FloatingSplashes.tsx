import { motion } from 'framer-motion';
import splash1 from '../assets/branding/splash1.jpg';
import splash2 from '../assets/branding/splash2.jpg';
import splash3 from '../assets/branding/splash3.jpg';

export default function FloatingSplashes() {
  const splashes = [
    { src: splash1, initial: { top: '10%', left: '5%', rotate: 10 }, duration: 8, scale: 0.8 },
    { src: splash2, initial: { top: '40%', right: '0%', rotate: -15 }, duration: 12, scale: 1.2 },
    { src: splash3, initial: { top: '70%', left: '10%', rotate: 20 }, duration: 10, scale: 0.9 },
    { src: splash1, initial: { bottom: '5%', right: '5%', rotate: -10 }, duration: 9, scale: 0.7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 overflow-hidden">
      {splashes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ ...s.initial, opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0.2, 0],
            y: [0, -40, 0],
            rotate: [s.initial.rotate, s.initial.rotate + 10, s.initial.rotate],
            scale: s.scale
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
          className="absolute w-80 h-80 mix-blend-multiply opacity-20 contrast-125"
          style={s.initial as any}
        >
          <img src={s.src} alt="" className="w-full h-full object-contain filter drop-shadow-2xl" />
        </motion.div>
      ))}
    </div>
  );
}
