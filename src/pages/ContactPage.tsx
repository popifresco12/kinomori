'use client';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import MetaTags from '@/seo/MetaTags';

const schema = z.object({
  name: z.string().min(2, 'Min 2 chars'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string().min(10, 'Min 10 chars'),
  newsletter: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { t } = useTranslation(['contact','common']);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const body = 'Hi! My name is ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + (data.phone || 'N/A') + '\nSubject: ' + data.subject + '\nMessage: ' + data.message;
    window.open('https://wa.me/212600000000?text=' + encodeURIComponent(body));
    reset();
  };

  return (
    <div className="grain min-h-screen transition-colors bg-white dark:bg-slate-950">
      <MetaTags />
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">
        <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
          <h1 className="font-display text-5xl font-bold mb-3 text-gray-900 dark:text-white">{t('page_title', {ns:'contact'})}</h1>
          <p className="text-gray-500 mb-10">{t('about.philosophy_title', {ns:'about'})}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">{t('name', {ns:'contact'})}</label>
              <input {...register('name')} placeholder="John Doe" className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:border-kin-gold focus:ring-1 focus:ring-kin-gold outline-none transition-all text-gray-900 dark:text-white" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">{t('email', {ns:'contact'})}</label>
                <input type="email" {...register('email')} placeholder="john@email.com" className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:border-kin-gold outline-none transition-all text-gray-900 dark:text-white" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">{t('phone', {ns:'contact'})}</label>
                <input {...register('phone')} placeholder="+212 6XX-XXXXXX" className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none transition-all text-gray-900 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">{t('subject', {ns:'contact'})}</label>
              <select {...register('subject')} className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none transition-all text-gray-900 dark:text-white">
                {['Reservation','Private Event','Feedback','Other'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">{t('message', {ns:'contact'})}</label>
              <textarea rows={4} {...register('message')} placeholder="I would like to book a table for..." className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 outline-none resize-none transition-all text-gray-900 dark:text-white" />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button type="submit" className="w-full py-4 rounded-2xl bg-kin-gold hover:bg-amber-400 text-kin-dark font-bold text-base transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 flex items-center justify-center gap-2">
              <Send size={18} /> {t('send', {ns:'contact'})}
            </button>
          </form>
        </motion.div>
        <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/50 border border-amber-100 dark:border-slate-700">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('nav.contact', {ns:'common'})}</h3>
            <div className="space-y-5">
              {[
                {Icon:MapPin,value:'Tamraght, Morocco'},
                {Icon:Phone,value:'+212 5XX-XXXXXX'},
                {Icon:Mail,value:'hello@kinomori.ma'},
                {Icon:Clock,value:t('hours',{ns:'contact'})},
              ].map(({Icon,value},i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-kin-gold/15 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-kin-gold"/></div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-64 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <iframe title="Kinomori location" width="100%" height="100%" style={{border:0}} loading="lazy"
              src="https://www.google.com/maps?q=Kinomori+restaurant+Tamraght+Morocco&output=embed" allowFullScreen></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
