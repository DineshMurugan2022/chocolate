export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden flex items-end">
      <div className="absolute inset-0 bg-gradient-to-t from-ivory-50 via-ivory-50/20 to-transparent z-10"></div>
      <div 
        className="absolute inset-0 scale-110 bg-center bg-cover transition-transform duration-[20s] ease-linear" 
        data-alt="Luxury dark chocolate Ganache close up view" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvba7eTvL5D42qI9yV2CbVjbCm902Wm9E2M2GCAWCSQywtnVxwsTcol63NCCK7lA2Vi-24zUjTihMldgaSl0Rke7HjLvLZR9S54yhpPznBtHW4pJnL5rzGX28k-eMHHWG-TwIpGvaFPYh0MrTKs3asljuxIve1jrqDqq-q1cyr0LmFRvYFP4d6W28nrsHX9QJUduSa6f34M_mfKekJFu0NKpPHBuEYCSz5WbILz6EYIsLFUuC8H1U0Epiv9Pf9kZn8BkTdOiARUyKu')" }}
      >
      </div>
      <div className="relative z-20 px-6 md:px-16 lg:px-40 pb-20 max-w-4xl">
        <span className="text-satin-gold font-bold tracking-[0.5em] uppercase text-xs mb-4 block">The Art of Cacao</span>
        <h2 className="text-5xl md:text-8xl font-display font-medium text-espresso-950 mb-6 leading-[1.05]">Pure Indulgence</h2>
        <p className="text-lg text-espresso-900/70 max-w-xl leading-relaxed font-body">
          Experience the ethereal lightness of artisanal creation. A curated sanctuary for the world's most delicate single-origin masterpieces.
        </p>
      </div>
    </section>
  );
}
