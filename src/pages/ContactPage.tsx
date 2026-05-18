'use client';
import { useTranslation } from 'react-i18next';
import MetaTags from '@/seo/MetaTags';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const { t } = useTranslation('contact');
const schema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().optional(),
  subject: z.string(), message: z.string().min(10), newsletter: z.boolean().optional() });
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { t, i18n } = useTranslation(['contact','common']);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    toast({ title: t('success',{ns:'contact'}), variant: 'success' });
    reset();
    // WhatsApp fallback for demo
    window.open('https://wa.me/212600000000?text='+encodeURIComponent(
      JSON.stringify({name:data.name,email:data.email,phone:data.phone,subject:data.subject,message:data.message})));
  };

  return (
      <MetaTags titleKey="contact.page_title" descriptionKey="about.origin_text"/>
    <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12">
      <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
        <h1 className="font-display text-5xl font-bold mb-8">{t('page_title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5">{t('name')}</label>
            <input {...register('name')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-kin-gold focus:ring-1 focus:ring-kin-gold outline-none transition-all"/>
            {errors.name&&<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">{t('email')}</label>
            <input type="email" {...register('email')} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-kin-gold outline-none transition-all"/>
            {errors.email&&<p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">{t('phone')}</label>
            <input {...register('phone')} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all"/>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">{t('subject')}</label>
            <select {...register('subject')} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
              <option value="Reservation">{t('nav.story')}</option>
              <option value="Private Event">{t('common.read_more')}</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">{t('message')}</label>
            <textarea rows={4} {...register('message')} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none"/>
            {errors.message&&<p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-kin-gold hover:bg-amber-400 text-kin-dark font-bold transition-all shadow-md hover:shadow-lg">
            {t('send')}
          </button>
        </form>
      </motion.div>

      <motion.div initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
        className="space-y-8 text-gray-600">
        <div>
          <h3 className="font-display text-2xl font-bold text-kin-dark mb-6">{t('nav.contact')}</h3>
          {[{Icon:MapPin,label:'address'},{Icon:Phone,label:'contact'},{Icon:Mail,label:'email'},{Icon:Clock,label:'hours',value:t('hours_text',{ns:'contact'})}].map(({Icon,label,value})=>(
            <div key={label} className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 rounded-full bg-kin-gold/15 flex items-center justify-center"><Icon size={18} className="text-kin-gold"/></div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">{label==='email'?'Email':label==='hours'?t('hours',{ns:'contact'}):label==='contact'?'Phone':'Address'}</p>
                <p className="font-semibold text-gray-800">{value||label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden h-52 bg-gray-200 flex items-center justify-center text-gray-400">
          [Google Maps Embed — Tamraght, Morocco]
        </div>
      </motion.div>
    </div>
  );
}
