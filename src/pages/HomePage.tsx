'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowDownRight, Star, Quote } from 'lucide-react';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';

// ── Shader: "Australian Night Ocean" — verde bosque + vetas doradas ──
function OceanShader() {
  const ref = useRef<any>(null);
  const mouse = useRef({ x:.5, y:.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: [.5, .5] as [number, number] },
  }), []);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uMouse.value[0] += (mouse.current.x - uniforms.uMouse.value[0]) * .04;
    uniforms.uMouse.value[1] += (mouse.current.y - uniforms.uMouse.value[1]) * .04;
    if (ref.current) {
      (ref.current.material as any).uniforms.uTime.value  = uniforms.uTime.value;
      (ref.current.material as any).uniforms.uMouse.value = uniforms.uMouse.value;
    }
  });

  return (
    <mesh ref={ref} position-z={-30}>
      <planeGeometry args={[80, 60, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }
        `}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
          float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
            return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
          float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<5;i++){v+=a*noise(p);p*=2.2;a*=.5;} return v; }
          void main(){
            vec2 uv=vUv; float t=uTime*.12;
            float f=fbm(uv*1.4+(uMouse-.5)*.4+t);
            float g=fbm(uv*1.5-t*.7+f);
            float h=fbm(uv*.7+t*.4+g);
            vec3 col=mix(vec3(.04,.10,.09),vec3(.10,.18,.10),clamp(f+g,0.,1.));
            col=mix(col,vec3(.96,.62,.04),clamp(h*h*.7,0.,1.));
            float vig=1.-length(uv-.5)*1.5; col*=clamp(vig,0.,1.);
            col+=(hash(uv+fract(t))-.5)*.025;
            gl_FragColor=vec4(col,1.);
          }
        `}
      />
    </mesh>
  );
}

// ── Partículas doradas ────────────────────────────
function Dust() {
  const ref = useRef<any>(null);
  const count = 100;
  const [positions] = useMemo(() => {
    const p: number[] = [];
    for (let i = 0; i < count; i++)
      p.push((Math.random()-.5)*50, (Math.random()-.5)*50, (Math.random()-.5)*30);
    return [new Float32Array(p)];
  }, []);

  useFrame((_, d) => { if(ref.current) (ref.current as any).rotation.y += d * .008; });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f59e0b" size={.07} transparent opacity={.6} />
    </points>
  );
}

// ── Forma flotante 3D ─────────────────────────────
function Orb({ color, pos, geo }: { color:string, pos:[number,number,number], geo:any }) {
  const meshRef = useRef<any>(null);

  useFrame((_, d) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += d * .3;
    meshRef.current.position.y = pos[1] + Math.sin(performance.now()*.001) * .2;
  });

  return (
    <Float speed={1.5} floatIntensity={.6} rotationIntensity={.3}>
      <mesh ref={meshRef} position={pos}>
        <primitive object={geo} attach="geometry" />
        <meshStandardMaterial color={color} metalness={.7} roughness={.3} />
      </mesh>
    </Float>
  );
}

// ── Reviews estáticas ─────────────────────────────
const reviews = [
  { name:'Sofia M.', text:'El mejor sushi que he comido fuera de Japón. El ramen es espectacular.', rating:5 },
  { name:'Lucas R.', text:'Dim sum artesanal de verdad. Los camareros son muy amables.', rating:5 },
  { name:'Julia T.',  text:'Lugar icónico en Tamraght. Volvemos cada semana, nunca defrauda.', rating:4 },
];

// ── HOME ──────────────────────────────────────────
export default function Home() {
  const { t } = useTranslation();

  return (
    <main style={{ background:'#0a0a0a' }}>
      {/* ── HERO — Three.js + Shader + Partículas ── */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position:[0,0,18], fov:55 }} dpr={[1,2]}>
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={.5} />
            <directionalLight position={[5,5,5]} intensity={1.2} color="#fff5e6" />
            <OceanShader />
            <Dust />
            <Orb color="#1a2e1a" pos={[-3.5,1.5,-5]} geo={(function(){ const g = new THREE.IcosahedronGeometry(.8,.1); return g; })()} />
            <Orb color="#f59e0b" pos={[3.8,-1,-6]}  geo={(function(){ const g = new THREE.TorusGeometry(.55,.2,14,40); return g; })()} />
            <Orb color="#f59e0b" pos={[-2.8,-1.5,-4]} geo={(function(){ const g = new THREE.OctahedronGeometry(.65); return g; })()} />
            <Orb color="#1a2e1a" pos={[2.5,2,-5.5]} geo={(function(){ const g = new THREE.DodecahedronGeometry(.55); return g; })()} />
          </Canvas>
        </div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div initial={{opacity:0,y:-22}} animate={{opacity:1,y:0}} transition={{duration:.9}}
            className="mb-5 px-6 py-2.5 rounded-full text-[11px] font-black tracking-[.32em] uppercase border border-kin-gold/30 text-kin-gold/90 backdrop-blur-md bg-kin-gold/[0.07]">
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
              className="px-9 py-4 rounded-full bg-kin-gold hover:bg-amber-400 text-kin-dark font-bold text-base transition-all shadow-[0_8px_32px_rgba(245,158,11,.55)] hover:shadow-[0_14px_48px_rgba(245,158,11,.75)] hover:-translate-y-0.5 active:scale-[.97]">
              {t('hero.cta_reserve')}
            </a>
            <a href="#menu"
              className="px-9 py-4 rounded-full border border-white/25 text-white hover:border-white/50 hover:bg-white/8 font-semibold transition-all duration-300">
              {t('hero.cta_order')}
            </a>
          </motion.div>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.86,duration:.9}}
            className="mt-9 flex items-center gap-3 bg-white/[0.07] backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
            <div className="flex">{[1,2,3,4,5].map(n=> <Star key={n} size={15} className={n<=5?'text-yellow-400 fill-yellow-400':'text-gray-600'}/>)}</div>
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
              <div className="w-14 h-14 rounded-2xl bg-kin-gold/15 flex items-center justify-center text-2xl mb-7">
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
                <Quote className="text-kin-gold/35 mb-5" size={26}/>
                <p className="text-gray-700 leading-relaxed mb-6 italic text-[15px]">"{rv.text}"</p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-kin-gold/15 flex items-center justify-center text-sm font-extrabold text-kin-gold">{rv.name[0]}</div>
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
        <div className="absolute inset-0 bg-gradient-to-r from-kin-green via-[#0f2210] to-kin-gold/60"/>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9}}
          className="relative max-w-3xl mx-auto text-center px-6 space-y-6">
          <span className="text-kin-gold text-sm font-black tracking-[.25em] uppercase">Kinomori · Tamraght</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">{t('hero.tagline')}</h2>
          <div className="flex gap-4 justify-center pt-4">
            <a href="/contact" className="px-9 py-4 rounded-full bg-white text-kin-dark font-bold hover:bg-kin-gold hover:shadow-lg hover:shadow-kin-gold/30 transition-all duration-300">{t('hero.cta_reserve')}</a>
            <a href="/shop" className="px-9 py-4 rounded-full border-2 border-white/30 text-white hover:bg-white/10 font-semibold transition-all duration-300">Shop</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
