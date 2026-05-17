'use client';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDownRight, MapPin } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation('hero');
  const navigate = useNavigate();
  return (
    <div className="grain">
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{background:'linear-gradient(135deg,#0a0a0a 0%,#1a2e1a 60%,#0a0a0a 100%)'}}>
        {/* Particle simulation via CSS blobs */}
        <div className="absolute inset-0 pointer-events-none">
          {['#ef4444','#f59e0b','#10b981','#f59e0b'].map((c,i)=>(
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{
                top: `${15+i*22}%`, left: `${10+i*18}%`,
                width: `${6+i*4}px`, height: `${6+i*4}px`,
                background: c, opacity: .15+i*.08,
                filter: 'blur(8px)', animationDuration: `${3+i*1.5}s`,
              }}
            />
          ))}
          {/* Mountains silhouette */}
          <svg className="absolute bottom-0 left-0 right-0 text-kin-green/30" viewBox="0 0 1440 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200L120 140L280 180L420 100L580 160L720 80L880 150L1040 90L1200 170L1440 120V200Z"/>
          </svg>
        </div>

        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8}}
          className="font-display text-7xl md:text-9xl font-bold text-white tracking-wider relative z-10">
          {t('title')}
        </motion.h1>
        <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.2}}
          className="mt-5 text-2xl md:text-3xl text-gray-300 font-light relative z-10">
          {t('tagline')}
        </motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.4}}
          className="mt-10 flex flex-wrap gap-4 justify-center relative z-10">
          <button onClick={()=>navigate('/contact')}
            className="px-8 py-4 rounded-full bg-kin-gold hover:bg-amber-400 text-kin-dark font-bold text-base magnetic-shadow transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5">
            {t('cta_reserve')}
          </button>
          <button onClick={()=>navigate('/shop')}
            className="px-8 py-4 rounded-full border-2 border-white/30 text-white hover:border-white font-semibold hover:bg-white/10 transition-all">
            {t('cta_order')}
          </button>
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:1}}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-500 text-sm animate-bounce">
          <ArrowDownRight size={20}/> <span>scroll</span>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-4xl font-bold text-center mb-14" data-i18n="about.title">{t('about.title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['origin','philosophy','chef'].map((k,i)=>(
            <motion.div key={k} whileHover={{y:-6}} className="p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-kin-gold/20 flex items-center justify-center mb-5 text-2xl">
                {k==='origin'?'🏔️':k==='philosophy'?'🧭:'👨‍🍳'}
              </div>
              <h3 className="font-display text-xl font-bold mb-3" data-i18n={'about.'+k+'_title'}>{t('about.'+k+'_title')}</h3>
              <p className="text-gray-600 leading-relaxed" data-i18n={'about.'+k+'_text'}>{t('about.'+k+'_text')}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl font-bold text-center mb-14">{t('reviews.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(n=>(
              <motion.blockquote key={n} whileHover={{scale:1.03}} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <p className="text-gray-700 leading-relaxed mb-4">"{(t as any)('reviews.r'+n)}"</p>
                <footer className="text-sm text-kin-gold font-semibold">– {(t as any)('reviews.author'+n)}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
