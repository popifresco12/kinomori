'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Story() {
  const { t } = useTranslation();
  const events = ['year_2021','year_2022','year_2023','year_2024'];
  const values = [
    { key: 'val_fresh',     emoji: '🌿' },
    { key: 'val_respect',   emoji: '🤝' },
    { key: 'val_community', emoji: '🏘️' },
    { key: 'val_sustainability', emoji: '♻️' },
  ];
  return (
    <div className="grain" style={{background:'#faf7f2'}}>
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="font-display text-5xl font-bold mb-8 text-center">{t('story.page_title')}</h1>

        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="prose prose-lg text-gray-700 leading-relaxed mb-16">
          <p>{t('about.origin_text')}</p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-kin-gold/30"/>
          {events.map((ev,i)=>(
            <motion.div key={ev} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.15}}
              className="relative pl-16 pb-12 last:pb-0">
              <div className="absolute left-3 w-6 h-6 rounded-full bg-kin-gold border-4 border-white shadow"/>
              <h3 className="font-display text-2xl font-bold">{t('about.'+ev)}</h3>
            </motion.div>
          ))}
        </div>

        {/* VALUES */}
        <h2 className="font-display text-3xl font-bold mt-20 mb-10 text-center">{t('about.values_title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {values.map(v=>(
            <motion.div key={v.key} whileHover={{scale:1.05}}
              className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <span className="text-4xl block mb-3">{v.emoji}</span>
              <p className="font-semibold text-sm">{t('about.'+v.key)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
