'use client';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDownRight, Star } from 'lucide-react';
import MetaTags from '@/seo/MetaTags';

export default function Home() {
  const { t } = useTranslation('hero');
  const navigate = useNavigate();

  return (
    <>
      {<MetaTags />}
      <div className="grain min-h-screen transition-colors bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a2e1a 60%, #0a0a0a 100%)' }}>

        <div className="absolute inset-0 pointer-events-none">
          {['#ef4444','#f59e0b','#10b981','#f59e0b'].map((c,i)=>(
            <div key={i} className="absolute rounded-full animate-pulse"
              style={{ top:`${15+i*22}%`, left:`${10+i*18}%`, width:`${6+i*4}px`, height:`${6+i*4}px`, background:c, opacity:.15+i*.08, filter:'blur(8px)', animationDuration:`${3+i*1.5}s` }}/>
          ))}
          <svg className="absolute bottom-0 left-0 right-0 text-kin-green/20" viewBox="0 0 1440 200" fill="currentColor">
            <path d="M0 200L120 140L280 180L420 100L580 160L720 80L880 150L1040 90L1200 170L1440 120Z"/>
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
            className="px-8 py-4 rounded-full bg-kin-gold hover:bg-amber-400 text-kin-dark font-bold text-base transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5">
            {t('cta_reserve')}
          </button>
          <button onClick={()=>navigate('/shop')}
            className="px-8 py-4 rounded-full border-2 border-white/30 text-white hover:border-white font-semibold hover:bg-white/10 transition-all">
            {t('cta_order')}
          </button>
        </motion.div>

        {/* Static Google Rating badge */}
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.8}} className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 z-10">
          <div className="flex">
            {[1,2,3,4,5].map(n => <Star key={n} size={16} className={n <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'} />)}
          </div>
          <span className="text-white font-semibold">4.9</span>
          <span className="text-gray-500 text-sm">(200+ reviews)</span>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:1}}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-500 text-sm animate-bounce">
          <ArrowDownRight size={20}/> <span>scroll</span>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <h2 className="font-display text-4xl font-bold text-center mb-14 text-gray-900">{t('about.title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['origin','philosophy','chef'].map((k,i)=>(
            <motion.div key={k} whileHover={{y:-6}} className="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-full bg-kin-gold/20 flex items-center justify-center mb-5 text-2xl">
                {k==='origin'?'🏔️':k==='philosophy'?'🧭':'👨‍🍳'}
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-gray-900">{t('about.'+k+'_title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('about.'+k+'_text')}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATIC REVIEWS (hardcoded, sin API) ── */}
      <section className="bg-gray-50 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl font-bold text-center mb-14 text-gray-900">{t('reviews.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sofia M.', text: 'El mejor sushi que he comido fuera de Japón. El ramen es espectacular y el ambiente es perfecto.', rating: 5 },
              { name: 'Lucas R.', text: 'Dim sum artesanal de verdad. Los camareros son súper amables y los precios muy razonables.', rating: 5 },
              { name: 'Julia T.', text: 'Lugar icónico en Tamraght. Volvemos cada semana, la calidad nunca defrauda.', rating: 4 },
            ].map((rv,i) => (
              <motion.blockquote key={i} whileHover={{scale:1.03}}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(n=><Star key={n} size={14} className={n<=rv.rating?'text-yellow-400 fill-yellow-400':'text-gray-200'}/>)}
                </div>
                <Star className="text-kin-gold/40 mb-3" size={22}/>
                <p className="text-gray-700 leading-relaxed mb-4 italic">"{rv.text}"</p>
                <footer className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-kin-gold/20 flex items-center justify-center text-xs font-bold text-kin-gold">{rv.name.charAt(0)}</div>
                  <span className="text-sm font-semibold text-gray-600">{rv.name}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
