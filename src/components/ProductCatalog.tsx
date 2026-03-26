import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductCatalog = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-32 px-8 bg-transparent relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-satin-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-satin-gold/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-burnt-orange font-bold tracking-[0.4em] uppercase mb-4 block underline decoration-gold-accent decoration-2 underline-offset-8">Handcrafted Excellence</span>
            <h2 className="text-6xl md:text-8xl font-display text-white">The Collection</h2>
          </div>
          <p className="max-w-md text-cream-text/60 font-body font-medium leading-relaxed">
            Discover our spectrum of artisanal creations, from delicate truffles to royal single-origin masterpieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              index={idx} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
