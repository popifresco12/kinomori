'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import MetaTags from '@/seo/MetaTags';

const reviews = [
  { name:"Sofia M.", text:"El mejor sushi fuera de Japón.", rating:5 },
  { name:"Lucas R.", text:"Dim sum artesanal, precios razonables.", rating:5 },
  { name:"Julia T.", text:"Lugar icónico en Tamraght.", rating:4 },
];

export default function StoryPage() {
  const { t } = useTranslation();
  return (
    <main>
      <MetaTags/>
      {/* HERO */}
      <section className="min-h-[65vh] flex flex-col items-center justify-center text-center px-6 py-20" >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[400px] h-[400px] rounded-full /8 blur-[120px] top-1/4 left-1/4" />
          <div className="absolute w-[300px] h-[300px] rounded-full /8 blur-[100px] bottom-1/4 right-1/4" />
        </div>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-wide relative z-10">
          {t('about.title')}
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3,duration:1}}
          className="mt-5 text-lg text-gray-400 max-w-2xl relative z-10 leading-relaxed">
          Kinomori nace de la fusión entre la precisión japonesa y la calidez marroquí.
        </motion.p>
      </section>

      {/* ORIGIN */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} transition={{duration:.7}} viewport={{once:true}}
            className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br to-kin-dark relative" >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[8rem] opacity-20">🏔️</span>
            </div>
          </motion.div>
          <div className="space-y-5">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase" >Origin</span>
            <h2 className="font-display text-4xl font-bold text-gray-900">{t('about.origin_title')}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{t('about.origin_text')}</p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2 space-y-5">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase" >Philosophy</span>
            <h2 className="font-display text-4xl font-bold text-gray-900">{t('about.philosophy_title')}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{t('about.philosophy_text')}</p>
          </div>
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} transition={{duration:.7}} viewport={{once:true}}
            className="md:order-1 rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br /80 /30 relative"  >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[8rem] opacity-20">🧭</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <h2 className="font-display text-4xl font-bold text-center mb-4 text-gray-900">{t('reviews.title')}</h2>
        <p className="text-center text-gray-500 mb-14">⭐⭐⭐⭐⭐ {t('reviews.more')}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rv,i) => (
            <motion.blockquote key={i} whileHover={{scale:1.03}}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(n=><span key={n} className={"text-lg" +(n<=rv.rating?"text-yellow-400":"text-gray-200")}>★</span>)}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">"{rv.text}"</p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full /20 flex items-center justify-center text-xs font-bold" >{rv.name[0]}</div>
                <span className="text-sm font-semibold text-gray-600">{rv.name}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}
