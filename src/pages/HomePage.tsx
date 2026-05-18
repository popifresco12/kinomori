'use client';
import { useEffect, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ── Fondo CSS shader simulado ─────────────────────────────────
function OceanBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fondo base oscuro */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Gradiente radial mimando el shader */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 45%, rgba(26,46,26,0.5) 0%, transparent 70%),
            radial-gradient(ellipse 120% 80% at 30% 50%, rgba(26,46,26,0.3) 0%, transparent 65%),
            radial-gradient(ellipse 80% 80% at 75% 40%, rgba(245,158,11,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,46,26,0.15) 0%, transparent 60%)
          `,
        }}
      />

      {/* Vetas doradas */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            conic-gradient(from 120deg at 40% 45%, transparent 0deg, rgba(245,158,11,0.15) 20deg, transparent 40deg),
            conic-gradient(from 60deg at 70% 55%, transparent 0deg, rgba(245,158,11,0.12) 25deg, transparent 45deg),
            conic-gradient(from 180deg at 20% 50%, transparent 0deg, rgba(245,158,11,0.1) 30deg, transparent 50deg)
          `,
          filter: 'blur(20px)',
        }}
      />

      {/* Partículas eléctricas */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {Array.from({ length: 40 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-[#f59e0b] rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${5 + Math.random() * 90}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
              y: [0, -20 + Math.random() * 40],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Orbes flotantes CSS */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[120px] h-[120px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(26,46,26,0.8) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
            boxShadow: '0 0 60px 20px rgba(26,46,26,0.3), inset 0 0 40px 10px rgba(26,46,26,0.2)',
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[80px] h-[80px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 65%)',
            right: '15%',
            top: '50%',
            boxShadow: '0 0 40px 15px rgba(245,158,11,0.2)',
          }}
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute w-[60px] h-[60px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(26,46,26,0.7) 0%, transparent 65%)',
            left: '60%',
            bottom: '30%',
            boxShadow: '0 0 30px 10px rgba(26,46,26,0.3)',
          }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
    </div>
  );
}

// ── Reviews estáticas ────────────────────────────────
const reviews = [
  { name:'Sofia M.', text:'El mejor sushi que he comido fuera de Japón. El ramen es espectacular.', rating:5 },
  { name:'Lucas R.', text:'Dim sum artesanal de verdad. Los camareros son muy amables.', rating:5 },
  { name:'Julia T.',  text:'Lugar icónico en Tamraght. Volvemos cada semana, nunca defrauda.', rating:4 },
];

// ── HOME ─────────────────────────────────────────────
export default function Home() {
  const { t } = useTranslation();

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OceanBackground />
        </div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div initial={{opacity:0,y:-22}} animate={{opacity:1,y:0}} transition={{duration:.9}}
            className="mb-5 px-6 py-2.5 rounded-full text-[11px] font-black tracking-[.32em] uppercase border border-[#f59e0b]/30 text-[#f59e0b]/90 backdrop-blur-md bg-[#f59e0b]/[0.07]">
            KINOMORI · {t('hero.tagline')}
          </motion.div>

          <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:.12}}
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-black text-white tracking-[.04em] leading-[0.88]"
            style={{textShadow:'0 1px #ffffff10, 0 2px 30px #000000a8, 0 8px 80px #0006'}}>
            {t('hero.title')}
          </motion.h1>

          <motion.p initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.32}}
            className="mt-7 text-[clamp(1rem,2.2vw,1.7rem)] text-white/85 font-light tracking-wide">
            {t('hero.tagline')}
          </motion.p>

          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.85,delay:.52}}
            className="mt-11 flex flex-wrap gap-4 justify-center">
            <a href="#contact"
              className="px-9 py-4 rounded-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-[#0a0a0a] font-bold text-base transition-all shadow-[0_8px_32px_rgba(245,158,11,0.55)] hover:shadow-[0_14px_48px_rgba(245,158,11,0.75)] hover:-translate-y-0.5 active:scale-[.97]">
              {t('hero.cta_reserve')}
            </a>
            <a href="#menu"
              className="px-9 py-4 rounded-full border border-white/25 text-white hover:border-white/50 hover:bg-white/8 font-semibold transition-all duration-300">
              {t('hero.cta_order')}
            </a>
          </motion.div>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.86,duration:.9}}
            className="mt-9 flex items-center gap-3 bg-white/[0.07] backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
            <div className="flex">{[1,2,3,4,5].map(n=><Star key={n} size={15} className={n<=5?'text-yellow-400 fill-yellow-400':'text-gray-600'}/>)}</div>
            <span className="text-white font-semibold text-sm">4.9</span>
            <span className="text-gray-500 text-xs">(200+ reviews)</span>
          </motion.div>
        </div>

        <motion.div initial={{opacity:0}} animate={{opacity:.45}} transition={{delay:1.3,duration:1}}
          className="absolute bottom-7 flex flex-col items-center gap-2 text-white/50 text-[11px] tracking-[.22em] uppercase">
          <ArrowDownRight size={16}/> Scroll
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28 bg-white">
        <motion.h2 initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}
          className="font-display text-5xl font-bold text-center mb-20 text-gray-900">{t('about.title')}</motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['origin','philosophy','chef'].map((k,i)=>(
            <motion.div key={k} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.15,duration:.7}}
              whileHover={{y:-8}} className="p-10 rounded-3xl bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200/80 shadow-sm hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/15 flex items-center justify-center text-2xl mb-7">
                {k==='origin'?'🏔️':k==='philosophy'?'🧭':'👨‍🍳'}
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-gray-900">{t('about.'+k+'_title')}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{t('about.'+k+'_text')}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────── */}
      <section className="bg-gray-50 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}
            className="font-display text-5xl font-bold text-center mb-6 text-gray-900">{t('reviews.title')}</motion.h2>
          <p className="text-center text-gray-500 mb-16 text-sm">⭐⭐⭐⭐⭐ {t('reviews.more')}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((rv,i)=>(
              <motion.blockquote key={i} initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*.12}}
                whileHover={{scale:1.04,y:-4}} className="p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl">
                <div className="flex gap-1.5 mb-6">{[1,2,3,4,5].map(n=><Star key={n} size={16} className={n<=rv.rating?'text-yellow-400 fill-yellow-400':'text-gray-200'}/>)}</div>
                <Quote className="text-[#f59e0b]/35 mb-5" size={26}/>
                <p className="text-gray-700 leading-relaxed mb-6 italic text-[15px]">"{rv.text}"</p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f59e0b]/15 flex items-center justify-center text-sm font-extrabold text-[#f59e0b]">{rv.name[0]}</div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-800">{rv.name}</span>
                    <span className="text-xs text-gray-400">{rv.rating}.0 Review</span>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a] via-[#0f2210] to-[#f59e0b]/60"/>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9}}
          className="relative max-w-3xl mx-auto text-center px-6 space-y-6">
          <span className="text-[#f59e0b] text-sm font-black tracking-[.25em] uppercase">Kinomori · Tamraght</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">{t('hero.tagline')}</h2>
          <div className="flex gap-4 justify-center pt-4">
            <a href="/contact" className="px-9 py-4 rounded-full bg-white text-[#0a0a0a] font-bold hover:bg-[#f59e0b] hover:shadow-lg hover:shadow-[#f59e0b]/30 transition-all duration-300">{t('hero.cta_reserve')}</a>
            <a href="/shop" className="px-9 py-4 rounded-full border-2 border-white/30 text-white hover:bg-white/10 font-semibold transition-all duration-300">Shop</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
