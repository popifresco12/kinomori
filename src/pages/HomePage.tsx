'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowDownRight, Star, Sparkles } from 'lucide-react';
import MetaTags from '@/seo/MetaTags';

// ── Shader Background ──────────────────────────────────────────────────────
function ShaderPlane({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value += delta;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.set(mouse.x, mouse.y);
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uResolution.value.set(size.width, size.height);
  });

  useEffect(() => {
    const handleResize = () => {
      uniforms.uResolution.value.set(size.width, size.height);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size, uniforms]);

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          varying vec2 vUv;
          vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
          vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
          vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
          float snoise(vec3 v){
            const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
            vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
            vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
            vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
            float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);
            vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
            vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
            vec4 b0=vec4(x.xy,y.xy),b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
            vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
            vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
            return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
          }
          void main(){
            vec2 uv=vUv;vec2 mouse=uMouse*.3;
            float n1=snoise(vec3(uv*1.5+uTime*.15,uTime*.08))*.5+.5;
            float n2=snoise(vec3(uv*3.-uTime*.1,uTime*.12+10.))*.5+.5;
            float n3=snoise(vec3(uv*6.+uTime*.05,uTime*.06+20.))*.5+.5;
            float noise=n1*.5+n2*.3+n3*.2;
            float dist=distance(uv,vec2(.5)+mouse*.15);
            float mouseInfl=smoothstep(.6,.0,dist)*.15;
            vec3 deepGreen=vec3(.04,.1,.06);vec3 charcoal=vec3(.06,.06,.06);
            vec3 warmGold=vec3(.92,.58,.08);vec3 amberGlow=vec3(1.,.8,.3);
            vec3 color=mix(charcoal,deepGreen,noise);color=mix(color,warmGold,noise*mouseInfl*2.);
            float botGlow=smoothstep(.7,1.,uv.y)*.12;color+=amberGlow*botGlow;
            float vignette=1.-smoothstep(.3,1.1,length(uv-.5)*1.2);color*=vignette;
            float grain=fract(sin(dot(uv*uTime,vec2(12.9898,78.233)))*43758.5453);color+=grain*.015;
            gl_FragColor=vec4(color,1.);
          }
        `}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Floating Particles ────────────────────────────────────────────────────
function ParticleField() {
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#f59e0b" size={0.025} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

// ── Mouse tracker for parallax ────────────────────────────────────────────
function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.05;
    target.current.y += (mouse.current.y - target.current.y) * 0.05;
    if (groupRef.current) {
      groupRef.current.rotation.y = target.current.x * 0.08;
      groupRef.current.rotation.x = target.current.y * 0.05;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// ── R3F Scene ─────────────────────────────────────────────────────────────
function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f59e0b" />
      <ShaderPlane mouse={mouse} />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <ParticleField />
      </Float>
      <MouseParallax>
        {/* Abstract floating shapes for depth */}
        <mesh position={[-3, 1, -1]} castShadow>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#1a2e1a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[3.5, -0.5, -0.5]} castShadow>
          <torusGeometry args={[0.3, 0.12, 16, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[1.5, 2, -2]} castShadow>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.15} />
        </mesh>
      </MouseParallax>
      <Environment preset="city" />
    </>
  );
}

// ── Liquid Glass Components ────────────────────────────────────────────────
function LiquidButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}) {
  const base =
    'relative px-8 py-4 rounded-full font-bold text-base transition-all duration-500 overflow-hidden group cursor-pointer';
  const variants: Record<string, string> = {
    primary:
      'text-kin-dark shadow-[0_8px_32px_rgba(245,158,11,.35)] hover:shadow-[0_12px_48px_rgba(245,158,11,.55)]',
    secondary:
      'text-white border border-white/20 hover:border-white/50 backdrop-blur-md',
    ghost: 'text-white/70 hover:text-white',
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {/* Animated gradient border */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            variant === 'primary'
              ? 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(245,158,11,.25), transparent 60%)'
              : 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.08), transparent 60%)',
          transition: 'opacity .5s cubic-bezier(0.23,1,0.32,1)',
        }}
      />
      {/* Animated gradient overlay */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-kin-gold/20 via-kin-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

// ── Liquid Glass Card ─────────────────────────────────────────────────────
function LiquidCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,.18)] hover:shadow-[0_20px_60px_rgba(245,158,11,.12)] transition-all duration-500 ${className}`}
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,.02) 50%, rgba(255,255,255,.04) 100%)',
      }}
    >
      {/* animated gradient rim */}
      <span
        className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(245,158,11,.1), transparent 60%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ── Rating Pill ───────────────────────────────────────────────────────────
function RatingPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/10"
      style={{ background: 'rgba(255,255,255,.07)' }}
    >
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={15} className="text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,.5)]" />
        ))}
      </div>
      <span className="text-white/90 font-semibold text-sm tracking-wide">4.9</span>
      <span className="text-white/40 text-xs">(200+ reviews)</span>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const { t } = useTranslation('hero');
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Mouse tracking for liquid hover effects
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`);
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {<MetaTags />}

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        {/* R3F Background */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
            style={{ width: '100%', height: '100%' }}
          >
            <Scene mouse={mouse} />
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="pointer-events-auto max-w-5xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-xl border border-kin-gold/20"
              style={{ background: 'rgba(245,158,11,.08)', color: '#f59e0b' }}
            >
              <Sparkles size={13} />
              {t('title')} · {t('tagline')}
            </motion.div>

            {/* Title — cinematic typography */}
            <motion.h1
              initial={{ opacity: 0, y: 60, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.88] tracking-[0.04em] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,.6)] [text-shadow:_0_2px_30px_rgba(0,0,0,.5)]"
            >
              {t('title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 text-[clamp(1rem,2vw,1.5rem)] font-light text-white/60 tracking-wide max-w-2xl mx-auto"
            >
              {t('tagline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="mt-12 flex flex-wrap gap-5 justify-center"
            >
              <LiquidButton onClick={() => navigate('/contact')}>
                {t('cta_reserve')}
              </LiquidButton>
              <LiquidButton variant="secondary" onClick={() => navigate('/shop')}>
                {t('cta_order')}
              </LiquidButton>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-10 flex justify-center"
            >
              <RatingPill />
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDownRight size={18} />
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        </motion.div>
      </section>

      {/* ════════════════ ABOUT — Liquid Glass Cards ════════════════ */}
      <section className="relative py-32 px-6 bg-white overflow-hidden">
        {/* subtle top fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-center mb-20 text-gray-900 tracking-tight"
          >
            {t('about.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-7">
            {[
              { key: 'origin', emoji: '🏔️', delay: 0 },
              { key: 'philosophy', emoji: '🧭', delay: 0.12 },
              { key: 'chef', emoji: '👨‍🍳', delay: 0.24 },
            ].map(({ key, emoji, delay }) => (
              <LiquidCard key={key} delay={delay} className="!p-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6"
                  style={{ background: 'linear-gradient(135deg, rgba(245,158,11,.12), rgba(245,158,11,.04))' }}>
                  {emoji}
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-gray-900 leading-tight">
                  {t(`about.${key}_title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">{t(`about.${key}_text`)}</p>
              </LiquidCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ REVIEWS ════════════════ */}
      <section className="relative py-32 px-6" style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-center mb-20 text-gray-900 tracking-tight"
          >
            {t('reviews.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-7">
            {[
              { name: 'Sofia M.', text: 'El mejor sushi que he comido fuera de Japón. El ramen es espectacular y el ambiente es perfecto.', rating: 5 },
              { name: 'Lucas R.', text: 'Dim sum artesanal de verdad. Los camareros son súper amables y los precios muy razonables.', rating: 5 },
              { name: 'Julia T.', text: 'Lugar icónico en Tamraght. Volvemos cada semana, la calidad nunca defrauda.', rating: 4 },
            ].map((rv, i) => (
              <LiquidCard key={i} delay={i * 0.12} className="!p-10">
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={15} className={n <= rv.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-[15px] mb-6 italic">"{rv.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-kin-gold"
                    style={{ background: 'linear-gradient(135deg, rgba(245,158,11,.15), rgba(245,158,11,.06))' }}>
                    {rv.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{rv.name}</span>
                </div>
              </LiquidCard>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
