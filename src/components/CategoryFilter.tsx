import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

export default function CategoryFilter({ onCategoryChange, selectedCategory }: { onCategoryChange?: (cat: string) => void, selectedCategory?: string }) {
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const allCategories = [{ _id: 'all', name: '' }, ...categories];

  return (
    <div className="flex justify-center w-full py-4 relative z-20">
      <div className="flex items-center justify-center flex-wrap gap-y-4">
        {allCategories.map((cat, idx) => {
          const isActive = (!selectedCategory && cat.name === '') || selectedCategory === cat.name;
          const displayName = cat.name === '' ? 'All Collections' : cat.name;
          
          return (
            <div key={cat._id} className="flex items-center">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onCategoryChange?.(cat.name)}
                className={`relative px-6 md:px-10 py-2 text-lg md:text-xl font-display transition-all duration-500 whitespace-nowrap group ${
                  isActive ? 'text-[#3C2A21]' : 'text-[#6B5E55]/60 hover:text-[#3C2A21]'
                }`}
              >
                <span className="relative z-10">{displayName}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-6 right-6 h-[2px] bg-[#B08D57]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
              
              {/* Vertical Separator */}
              {idx < allCategories.length - 1 && (
                <span className="text-[#6B5E55]/20 font-light text-xl pointer-events-none">|</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
