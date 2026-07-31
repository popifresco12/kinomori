'use client';
import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDownRight, Star, Quote, ChevronRight, Utensils, Users, Award, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Lazy load Hero3D (heavy Three.js component)
const Hero3D = lazy(() => import('../components/Hero3D').then(m => ({ default: m.default })));

// Hero3D fallback
function Hero3DFallback() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e1a] via-[#0a0a0a] to-[#1a1a1a]" />
      <div className="absolute inset-0 opacity-10" style={{
        background: `
          radial-gradient(ellipse at 50% 45%, #f59e0b 0%, transparent 70%),
          radial-gradient(ellipse at 30% 50%, #1a2e1a 0%, transparent 65%)
        `
      }} />
    </div>
  );
}

// ── Animated Counter ────────────────────────────────
function AnimatedCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-5xl md:text-6xl font-black font-display text-[#f59e0b] tabular-nums"
      >
        {count}{suffix}
      </motion.div>
      <div className="mt-2 text-sm text-white/60 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

// ── Fondo oceánico con gradientes y partículas ────
function OceanBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />

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

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[120px] h-[120px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(26,46,26,0.8) 0%, transparent 70%)',
            left: '10%',
            top: '20%',
            boxShadow: '0 0 60px 20px rgba(26,46,26,0.3), inset 0 0 40px 10px rgba(26,46,26,0.2)',
          }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 30, 0] }}
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
          animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
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
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
    </div>
  );
}

// ── Reviews estáticas ───────────────────────────────
const reviews = [
  { name: 'Sofia M.', text: 'El mejor sushi que he comido fuera de Japón. El ramen es espectacular.', rating: 5 },
  { name: 'Lucas R.', text: 'Dim sum artesanal de verdad. Los camareros son muy amables.', rating: 5 },
  { name: 'Julia T.', text: 'Lugar icónico en Tamraght. Volvemos cada semana, nunca defrauda.', rating: 4 },
];

// ── Platos destacados ───────────────────────────────
const featuredDishes = [
  {
    name: 'Korean Cold Noodles',
    description: 'Refrescantes noodles coreanos servidos fríos con verduras frescas y salsa picante.',
    price: '85 dh',
    gradient: 'from-[#1a2e1a] to-[#2d4a2d]',
    icon: '🥶',
  },
  {
    name: 'Beef Handmade Mo',
    description: 'Mo hecho a mano relleno de carne de res, cocinado al vapor y sellado a la perfección.',
    price: '95 dh',
    gradient: 'from-[#3d1a00] to-[#6b3000]',
    icon: '🥟',
  },
  {
    name: 'Rice Combo',
    description: 'Arroz salteado con verduras, huevo y tu elección de proteína.',
    price: '75 dh',
    gradient: 'from-[#2a1a00] to-[#4a3000]',
    icon: '🍚',
  },
  {
    name: 'Spring Soup Noodle',
    description: 'Sopa de fideos primaveral con caldo de verduras y hierbas frescas.',
    price: '80 dh',
    gradient: 'from-[#002a1a] to-[#004a30]',
    icon: '🍜',
  },
];

// ── Dish Card ───────────────────────────────────────
function DishCard({ dish, index }: { dish: typeof featuredDishes[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111] shadow-lg hover:shadow-2xl hover:shadow-[#f59e0b]/10 transition-all duration-500"
    >
      {/* Placeholder image with gradient */}
      <div className={`relative h-56 bg-gradient-to-br ${dish.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(245,158,11,0.3) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(245,158,11,0.2) 0%, transparent 50%)`,
          }}
        />
        {/* Glow behind icon */}
        <div className="absolute w-24 h-24 rounded-full bg-[#f59e0b]/10 blur-xl" />
        {/* Icon/Emoji */}
        <motion.span
          className="relative text-6xl z-10"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {dish.icon}
        </motion.span>
        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f59e0b]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-[#f59e0b] transition-colors duration-300">
            {dish.name}
          </h3>
          <span className="shrink-0 px-3 py-1 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] text-sm font-bold">
            {dish.price}
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {dish.description}
        </p>
        <motion.button
          whileHover={{ x: 4 }}
          className="flex items-center gap-1.5 text-[#f59e0b] text-sm font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Ver plato <ChevronRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── HOME ────────────────────────────────────────────
export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="bg-[#0a0a0a]">
      {/* ════════════════════════════════════════════════
          HERO — 3D + Ocean Background + Overlay
         ════════════════════════════════════════════════ */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <OceanBackground />
        <Suspense fallback={<Hero3DFallback />}>
          <Hero3D />
        </Suspense>

        {/* Overlay con gradiente sutil en los bordes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/60 z-[2] pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-5 px-6 py-2.5 rounded-full text-[11px] font-black tracking-[.32em] uppercase border border-[#f59e0b]/30 text-[#f59e0b]/90 backdrop-blur-md bg-[#f59e0b]/[0.07]"
          >
            KINOMORI · {t('hero.tagline')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.12 }}
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-black text-white tracking-[.04em] leading-[0.88]"
            style={{ textShadow: '0 1px #ffffff10, 0 2px 30px #000000a8, 0 8px 80px #0006' }}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32 }}
            className="mt-7 text-[clamp(1rem,2.2vw,1.7rem)] text-white/85 font-light tracking-wide"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.52 }}
            className="mt-11 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#contact"
              className="px-9 py-4 rounded-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-[#0a0a0a] font-bold text-base transition-all shadow-[0_8px_32px_rgba(245,158,11,0.55)] hover:shadow-[0_14px_48px_rgba(245,158,11,0.75)] hover:-translate-y-0.5 active:scale-[.97]"
            >
              {t('hero.cta_reserve')}
            </a>
            <a
              href="#menu"
              className="px-9 py-4 rounded-full border border-white/25 text-white hover:border-white/50 hover:bg-white/8 font-semibold transition-all duration-300"
            >
              {t('hero.cta_order')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.86, duration: 0.9 }}
            className="mt-9 flex items-center gap-3 bg-white/[0.07] backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={15} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white font-semibold text-sm">4.9</span>
            <span className="text-gray-500 text-xs">(200+ reviews)</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-[11px] tracking-[.22em] uppercase"
        >
          <ArrowDownRight size={16} /> Scroll
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          ABOUT — Ocean Background + Animated Counters
         ════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <OceanBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80 z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl font-bold text-center mb-20 text-white"
          >
            {t('about.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {['origin', 'philosophy', 'chef'].map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                whileHover={{ y: -8 }}
                className="p-10 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-lg hover:shadow-2xl hover:shadow-[#f59e0b]/5 hover:border-[#f59e0b]/20 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/15 flex items-center justify-center text-2xl mb-7">
                  {k === 'origin' ? '🏔️' : k === 'philosophy' ? '🧭' : '👨‍🍳'}
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-white">
                  {t('about.' + k + '_title')}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('about.' + k + '_text')}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Animated Counters */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 px-4"
          >
            <AnimatedCounter value={15000} suffix="+" label="Platos Servidos" />
            <AnimatedCounter value={15} suffix="+" label="Años de Experiencia" />
            <AnimatedCounter value={8} suffix="" label="Chefs Expertos" />
            <AnimatedCounter value={98} suffix="%" label="Satisfacción" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURED DISHES
         ════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#f59e0b] text-sm font-black tracking-[.32em] uppercase">
              KINOMORI · MENÚ
            </span>
            <h2 className="font-display text-5xl font-bold mt-4 text-white">
              Platos Destacados
            </h2>
            <p className="mt-4 text-gray-400 max-w-lg mx-auto">
              Una selección de nuestros platos más emblemáticos, creados con ingredientes frescos y pasión asiática.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish, i) => (
              <DishCard key={i} dish={dish} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          REVIEWS
         ════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <OceanBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60 z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl font-bold text-center mb-6 text-white"
          >
            {t('reviews.title')}
          </motion.h2>
          <p className="text-center text-gray-400 mb-16 text-sm">
            ⭐⭐⭐⭐⭐ {t('reviews.more')}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((rv, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="p-10 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-lg hover:shadow-2xl hover:shadow-[#f59e0b]/5 hover:border-[#f59e0b]/20 transition-all duration-500"
              >
                <div className="flex gap-1.5 mb-6">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={16}
                      className={n <= rv.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <Quote className="text-[#f59e0b]/35 mb-5" size={26} />
                <p className="text-gray-300 leading-relaxed mb-6 italic text-[15px]">
                  &ldquo;{rv.text}&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f59e0b]/15 flex items-center justify-center text-sm font-extrabold text-[#f59e0b]">
                    {rv.name[0]}
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-white">{rv.name}</span>
                    <span className="text-xs text-gray-500">{rv.rating}.0 Review</span>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA — Mejorado
         ════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Fondo con gradiente dinámico */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e1a] via-[#0f2210] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 100% 60% at 50% 30%, rgba(245,158,11,0.15) 0%, transparent 70%),
              radial-gradient(ellipse 60% 80% at 80% 70%, rgba(245,158,11,0.1) 0%, transparent 60%)
            `,
          }}
        />

        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#f59e0b] rounded-full"
              style={{
                left: `${10 + i * 16}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -30 - i * 5, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeInOut',
              }}
            />
          ))}
          {/* Líneas decorativas doradas */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)',
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)',
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-black tracking-[.25em] uppercase mb-8 backdrop-blur-sm bg-[#f59e0b]/[0.06]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
            Kinomori · Tamraght
          </motion.div>

          <h2 className="font-display text-4xl md:text-7xl font-bold text-white leading-[1.05]">
            ¿Listo para una{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#f59e0b]/70">
              experiencia
            </span>{' '}
            única?
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-gray-300 text-lg max-w-xl mx-auto"
          >
            Déjate llevar por los sabores de Asia en el corazón de Tamraght. Tu mesa te espera.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-5 justify-center"
          >
            <a
              href="/contact"
              className="group relative px-10 py-5 rounded-full bg-[#f59e0b] text-[#0a0a0a] font-bold text-lg transition-all duration-300 shadow-[0_8px_32px_rgba(245,158,11,0.45)] hover:shadow-[0_16px_48px_rgba(245,158,11,0.7)] hover:-translate-y-1 active:scale-[.97] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.cta_reserve')}
                <ArrowDownRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <a
              href="/shop"
              className="group px-10 py-5 rounded-full border-2 border-white/25 text-white hover:border-[#f59e0b]/50 hover:bg-[#f59e0b]/10 font-semibold text-lg transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Explorar Tienda
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
