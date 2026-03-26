export default function LimitedEditionBanner() {
  return (
    <section className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent z-10"></div>
      <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" data-alt="Close up of chocolate melting and flowing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2L-GY4DJJjaxFpl6ByGotPki9i5q-5wIdNnOG7RxalrMWY0n1ESErTbQjaUDfHJDh3QZ6uMwPd6Fws7NBa7jDJNhWjyltxjYkJLd2bZWEvleOshNURnXgg9sIOokM83cYy6Bz_eTGGY0xd9ohDJwF_jeQXknUQrr8kgTYlzPuvmXvogDBO4LVRLz_0QOjB2lh22bWZi6q4eAfDT1Ut4XBSQ3--90NYv35P0T7_AelG5VBqbxfulpVUnMLnm2_IDKqqam6DASn5_zP"/>
      <div className="relative z-20 h-full flex flex-col justify-center px-12 md:px-24 max-w-2xl">
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Rare & Seasonal</span>
        <h3 className="text-4xl md:text-5xl font-black mb-6">The Winter Solstice Edition</h3>
        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          Infused with smoked cedar and aged brandy, our most exclusive collection yet. Only 500 sets produced.
        </p>
        <div>
          <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:-translate-y-1">
            Secure Early Access
          </button>
        </div>
      </div>
    </section>
  );
}
