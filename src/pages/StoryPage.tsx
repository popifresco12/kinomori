'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import MetaTags from '@/seo/MetaTags';

export default function Story() {
  const { t } = useTranslation();
  const timeline = ['year_2021','year_2022','year_2023','year_2024'];
  const values = [
    { key:'val_fresh',     emoji:'🌿', color:'from-green-400 to-emerald-600' },
    { key:'val_respect',   emoji:'🤝', color:'from-amber-400 to-orange-500' },
    { key:'val_community', emoji:'🏘️', color:'from-blue-400 to-indigo-500' },
    { key:'val_sustainability', emoji:'♻️', color:'from-teal-400 to-cyan-600' },
  ];
  return (
    <div className="grain min-h-screen transition-colors bg-white dark:bg-slate-950">
      <MetaTags titleKey="story.page_title" descriptionKey="about.origin_text" />

      {/* ── Origin ── */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}}
          className="font-display text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {t('story.page_title')}
        </motion.h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.15}}
          className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {t('about.origin_text')}
        </motion.p>
      </section>

      {/* ── Philosophy / Chef side-by-side ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div whileHover={{translateY:-4}} className="p-10 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/50 border border-amber-100 dark:border-slate-700">
            <span className="text-4xl block mb-4">🧭</span>
            <h2 className="font-display text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t('about.philosophy_title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('about.philosophy_text')}</p>
          </motion.div>
          <motion.div whileHover={{translateY:-4}} className="p-10 rounded-3xl bg-gradient-to-b from-slate-50 to-gray-50 dark:from-slate-900 dark:to-slate-800 border border-gray-100 dark:border-slate-700">
            <span className="text-4xl block mb-4">👨‍🍳</span>
            <h2 className="font-display text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t('about.chef_title')}</h2>
            <p className="font-semibold text-kin-gold mb-2">{t('about.chef_name')}</p>
            <p className="text-gray-600 dark:text-gray-300 italic">"</p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('about.chef_quote')}</p>
            <p className="text-gray-600 dark:text-gray-300 italic">"</p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="font-display text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          {t('about.timeline_title')}
        </motion.h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-kin-gold/40 via-kin-gold/20 to-transparent"/>
          {timeline.map((ev, i) => (
            <motion.div
              key={ev}
              initial={{opacity:0,x:-20}}
              whileInView={{opacity:1,x:0}}
              viewport={{once:true}}
              transition={{delay:i*0.12}}
              className="relative pl-20 pb-12 last:pb-0"
            >
              <div className="absolute left-5 w-6 h-6 rounded-full bg-kin-gold ring-4 ring-white dark:ring-slate-950 shadow-lg"/>
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">{t('about.' + ev)}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="font-display text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white">{t('about.values_title')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.key} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              whileHover={{scale:1.05, y:-4}}
              className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all text-center">
              <span className={`text-5xl block mb-4 bg-gradient-to-br ${v.color} bg-clip-text text-transparent`}>{v.emoji}</span>
              <p className="font-display text-lg font-bold text-gray-900 dark:text-white">{t('about.'+v.key)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
