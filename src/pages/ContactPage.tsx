'use client';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import MetaTags from '@/seo/MetaTags';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <main>
      <MetaTags/>
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20"
        style={{background:'linear-gradient(135deg,#0a0a0a,#122212)'}}>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-wide">
          {t('nav.contact')}
        </motion.h1>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-20 bg-white">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-gray-900">Get in Touch</h2>
            <div className="space-y-4 text-gray-600">
              <div><span className="block text-xs font-semibold text-kin-gold tracking-[0.2em] uppercase mb-1">Address</span>
                <p>Tamraght, Morocco</p></div>
              <div><span className="block text-xs font-semibold text-kin-gold tracking-[0.2em] uppercase mb-1">Phone</span>
                <p>+212 528 000 000</p></div>
              <div><span className="block text-xs font-semibold text-kin-gold tracking-[0.2em] uppercase mb-1">Email</span>
                <p>hola@kinomori.ma</p></div>
              <div><span className="block text-xs font-semibold text-kin-gold tracking-[0.2em] uppercase mb-1">Hours</span>
                <p>Mon–Sat: 12:00 – 23:00</p></div>
            </div>
          </motion.div>
          <motion.form initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            className="space-y-5" onSubmit={e=>{e.preventDefault();alert('Message sent!')}}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-kin-gold focus:ring-2 focus:ring-kin-gold/20 outline-none transition-all" placeholder="Your name"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-kin-gold focus:ring-2 focus:ring-kin-gold/20 outline-none transition-all" placeholder="you@example.com"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-kin-gold focus:ring-2 focus:ring-kin-gold/20 outline-none transition-all resize-none" placeholder="Your message"/>
            </div>
            <button type="submit"
              className="w-full py-3.5 rounded-full bg-kin-gold hover:bg-amber-400 text-kin-dark font-bold transition-all shadow-lg shadow-kin-gold/30 hover:shadow-kin-gold/50">
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
