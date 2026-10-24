import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] py-12 sm:py-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Runway Hero" 
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#070707] via-black/40 to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-4 sm:space-y-6"
      >
        <span className="inline-block uppercase tracking-[0.3em] text-[10px] font-semibold bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-neutral-200 border border-white/15">
          Fall / Winter 2026 Collection
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-light tracking-tight text-white leading-tight">
          Dark Architecture & Precision Tailoring
        </h1>
        <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          Uncompromising luxury garments engineered with Japanese selvedge denim, heavy organic cotton, and structured wools.
        </p>
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <Link 
            to="/shop"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-medium tracking-[0.2em] text-xs uppercase rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center space-x-3 group shadow-2xl"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/lookbook"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border border-white/30 text-white font-medium tracking-[0.2em] text-xs uppercase rounded-full hover:bg-white/10 transition-all text-center flex items-center justify-center"
          >
            View Lookbook
          </Link>
        </div>
      </motion.div>
    </section>
  );
};