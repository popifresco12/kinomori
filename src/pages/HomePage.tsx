'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowDownRight, Star, Sparkles, ChevronRight } from 'lucide-react';
import MetaTags from '@/seo/MetaTags';
import i18n from '@/i18n';

// ════════════════════════════════════════════════════════════
//  SHADER: "Australian Night Ocean" — deep forest + amber glow
// ════════════════════════════════════════════════════════════
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
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <planeGeometry args={[16, 12, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        depthWrite={false}
        vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          varying vec2 vUv;

          // Simplex 2D noise
          vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}
          float snoise(vec2 v){
            const vec4 C=vec4(.211324865,.366025404,-.577350269,.024390243);
            vec2 i=floor(v+dot(v,C.yy));
            vec2 x0=v-i+dot(i,C.xx);
            vec2 i1;i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
            vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);
            vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
            vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
            m=m*m;m=m*m;
            vec3 x=2.*fract(p*C.www)-1.;
            vec3 h=abs(x)-.5;vec3 a0=x-floor(x+.5);
            m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
            vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
            return 130.*dot(m,g);
          }

          void main(){
            vec2 uv = vUv;
            vec2 mouse = uMouse * 0.25;

            // Multi-layered flowing noise — "ocean at night"
            float t = uTime * 0.08;
            float n1 = snoise(uv * 1.2 + vec2(t * 0.6, t * 0.3)) * 0.5 + 0.5;
            float n2 = snoise(uv * 2.4 - vec2(t * 0.4, t * 0.5) + 10.0) * 0.5 + 0.5;
            float n3 = snoise(uv * 4.8 + vec2(t * 0.25, t * 0.15) + 20.0) * 0.5 + 0.5;
            float wave = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

            // Mouse interaction — subtle warp + glow
            float mouseDist = length(uv - vec2(0.5) - mouse * 0.2);
            float mouseGlow = smoothstep(0.7, 0.0, mouseDist) * 0.25;

            // Palette: deep forest midnight → charcoal → amber warmth
            vec3 midnight  = vec3(0.02, 0.04, 0.025);   // casi negro verdoso
            vec3 deepForest= vec3(0.03, 0.09, 0.065);   // verde bosque noche
            vec3 charcoal  = vec3(0.045, 0.045, 0.05);  // gris carbón
            vec3 amber     = vec3(0.92, 0.58, 0.08);    // dorado Kinomori
            vec3 warmGlow  = vec3(1.0, 0.80, 0.30);     // brillo cálido

            // Blend layers
            vec3 color = mix(midnight, charcoal, wave);
            color = mix(color, deepForest, wave * 0.7 + 0.15);
            // Amber glow trails
            float amberMask = snoise(uv * 3.0 + vec2(t * 1.2, t * 0.8) + 5.0) * 0.5 + 0.5;
            color = mix(color, amber, amberMask * wave * 0.35);
            // Mouse highlight
            color = mix(color, warmGlow, mouseGlow * 0.6);

            // Bottom amber horizon bleed
            float horizon = smoothstep(0.55, 1.0, uv.y);
            color += warmGlow * horizon * 0.08;

            // Radial vignette (dramatic, not too dark)
            float vignette = 1.0 - smoothstep(0.2, 1.0, length(uv - 0.5) * 1.3);
            color *= vignette;

            // Film grain (almost imperceptible)
            float grain = fract(sin(dot(uv * uTime * 0.001, vec2(127.1, 311.7))) * 43758.5453);
            color += (grain - 0.5) * 0.018;

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

// ════════════════════════════════════════════════════════════
//  FLOATING GOLD PARTICLES
// ════════════════════════════════════════════════════════════
function GoldParticles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;
      sizes[i] = Math.random() * 3 + 1;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.008;
    if (materialRef.current) {
      materialRef.current.opacity = 0.3 + Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#f59e0b"
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ════════════════════════════════════════════════════════════
//  MOUSE PARALLAX — smooth lerp tracking
// ════════════════════════════════════════════════════════════
function MouseParallaxGroup({ children }: { children: React.ReactNode }) {
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
    target.current.x += (mouse.current.x - target.current.x) * 0.04;
    target.current.y += (mouse.current.y - target.current.y) * 0.04;
    if (groupRef.current) {
      groupRef.current.rotation.y = target.current.x * 0.06;
      groupRef.current.rotation.x = target.current.y * 0.04;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// ════════════════════════════════════════════════════════════
//  ABSTRACT 3D SCULPTURES — floating depth anchors
// ════════════════════════════════════════════════════════════
function FloatingSculptures() {
  return (
    <MouseParallaxGroup>
      {/* Icosahedron — dark forest, left */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[-3.8, 0.8, -1.5]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#1a2e1a"
            metalness={0.92}
            roughness={0.08}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>

      {/* Torus — obsidian, right */}
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh position={[4.0, -0.4, -1.2]}>
          <torusGeometry args={[0.38, 0.14, 24, 48]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.98}
            roughness={0.03}
          />
        </mesh>
      </Float>

      {/* Octahedron — gold, top-right */}
      <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[2.2, 2.0, -2.0]}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color="#f59e0b"
            metalness={0.88}
            roughness={0.12}
            emissive="#f59e0b"
            emissiveIntensity={0.15}
          />
        </mesh>
      </Float>

      {/* Dodecahedron — charcoal accent, bottom-left */}
      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.55}>
        <mesh position={[-2.5, -1.5, -2.2]}>
          <dodecahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            color="#0d0d0d"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </Float>
    </MouseParallaxGroup>
  );
}

// ════════════════════════════════════════════════════════════
//  SCENE COMPOSITION
// ════════════════════════════════════════════════════════════
function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 6, 4]} intensity={1.0} color="#f59e0b" />
      <pointLight position={[-4, -2, 2]} intensity={0.5} color="#1a2e1a" />
      <pointLight position={[4, 3, 1]} intensity={0.4} color="#f59e0b" />

      <ShaderPlane mouse={mouse} />
      <GoldParticles />
      <FloatingSculptures />
      <Environment preset="city" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
//  LIQUID GLASS BUTTON — Viktor Oddy spec
// ════════════════════════════════════════════════════════════
function LiquidButton({
  children,
  onClick,
  variant = 'gold',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'gold' | 'glass';
  className?: string;
}) {
  const base = [
    'relative px-9 py-4.5 rounded-full font-semibold text-[15px]',
    'transition-all duration-500 overflow-hidden group cursor-pointer',
    'border-none outline-none focus-visible:ring-2 focus-visible:ring-kin-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
  ].join(' ');

  const variants: Record<string, string> = {
    gold:
      'bg-kin-gold text-kin-dark shadow-[0_8px_32px_rgba(245,158,11,.4)] hover:bg-amber-300 hover:shadow-[0_14px_48px_rgba(245,158,11,.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    glass:
      'bg-white/[0.07] text-white border border-white/12 hover:bg-white/[0.14] hover:border-white/25 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,.3)]',
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {/* Mouse-reactive glow */}
      <span
        className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            variant === 'gold'
              ? 'radial-gradient(ellipse 60% 60% at var(--mx,50%) var(--my,50%), rgba(245,158,11,.35), transparent 70%)'
              : 'radial-gradient(ellipse 60% 60% at var(--mx,50%) var(--my,50%), rgba(255,255,255,.08), transparent 70%)',
        }}
      />
      <span className="relative z-10 flex items-center gap-2.5 tracking-wide">
        {children}
        {variant === 'glass' && <ChevronRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform duration-300" />}
      </span>
    </button>
  );
}

// ════════════════════════════════════════════════════════════
//  RATING PILL — glass, no API needed
// ════════════════════════════════════════════════════════════
function RatingPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-3 px-5.5 py-2.5 rounded-full border border-white/8"
      style={{ background: 'rgba(255,255,255,0.055)', backdropFilter: 'blur(16px)' }}
    >
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={14}
            className="text-amber-400 fill-amber-400 drop-shadow-[0_0_7px_rgba(251,191,36,.6)]"
          />
        ))}
      </div>
      <span className="text-white/90 font-semibold text-[13px] tracking-wide">4.9</span>
      <span className="text-white/35 text-[11px]">(200+ reviews)</span>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════
//  MAIN HERO
// ════════════════════════════════════════════════════════════
export default function Home() {
  const { t } = useTranslation('hero');
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const readyRef = useRef(false);

  // i18n guard
  useEffect(() => {
    if (readyRef.current) return;
    if (readyRef.current) return;
    if (Boolean(i18n.isInitialized!)) {
      readyRef.current = true;
    } else i18n.once!('initialized', () => { readyRef.current = true; });
  }, []);

  // Mouse tracking for CSS custom properties + R3F
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth) * 100;
      const py = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mx', `${px}%`);
      document.documentElement.style.setProperty('--my', `${py}%`);
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Don't render until i18n ready
  if (!readyRef.current) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="w-8 h-8 border-3 border-kin-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {<MetaTags />}

      {/* ════ HERO — full-bleed, no chrome, no gaps ════ */}
      <section className="relative h-[100svh] w-full overflow-hidden" style={{ background: '#0a0a0a' }}>

        {/* R3F Canvas — z-0, covers all */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
            style={{ width: '100%', height: '100%' }}
          >
            <Scene mouse={mouse} />
          </Canvas>
        </div>

        {/* ─── Overlay Content — z-10 ─── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">

          <div className="pointer-events-auto w-full max-w-5xl mx-auto">

            {/* Badge — "Best Sushi in Morocco" */}
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-7 text-[11px] font-bold uppercase tracking-[0.22em] border border-kin-gold/[.18]"
              style={{ background: 'rgba(245,158,11,.06)', color: '#f59e0b', backdropFilter: 'blur(16px)' }}
            >
              <Sparkles size={12} className="text-kin-gold" />
              <span>{t('title')} · {t('tagline')}</span>
            </motion.div>

            {/* Main title — cinematic scale + dramatic shadow */}
            <motion.h1
              initial={{ opacity: 0, y: 70, scale: 0.91 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="font-display font-bold leading-[0.86] tracking-[0.03em] text-white drop-shadow-[0_4px_60px_rgba(0,0,0,.7)]"
              style={{ fontSize: 'clamp(3.2rem, 11vw, 9.5rem)' }}
            >
              <span
                className="[background:linear-gradient(180deg,#fff_30%,rgba(255,255,255,.72)_100%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background-clip:text]"
                dangerouslySetInnerHTML={{ __html: t('title') }}
              />
            </motion.h1>

            {/* Subtitle — elegant light weight */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 text-[clamp(1rem,2.2vw,1.7rem)] font-extralight text-white/80 tracking-wider max-w-2xl mx-auto leading-relaxed"
            >
              {t('tagline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mt-12 flex flex-wrap gap-5 justify-center"
            >
              <LiquidButton onClick={() => navigate('/contact')} variant="gold">
                {t('cta_reserve')}
              </LiquidButton>
              <LiquidButton onClick={() => navigate('/shop')} variant="glass">
                {t('cta_order')}
              </LiquidButton>
            </motion.div>

            {/* Rating — glass pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-9 flex justify-center"
            >
              <RatingPill />
            </motion.div>

          </div>
        </div>

        {/* ─── Scroll hint — absolute bottom ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/25"
          >
            <ArrowDownRight size={16} strokeWidth={1.5} />
          </motion.div>
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/25 font-medium">Scroll</span>
        </motion.div>
      </section>

      {/* ════ ABOUT — liquid glass section ════ */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ background: '#faf9f7' }}>
        <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-center mb-20 text-[#1a1a1a] tracking-tight leading-[1.1]"
          >
            {t('about.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-7">
            {[
              { key: 'origin', emoji: '🌊', delay: 0.0 },
              { key: 'philosophy', emoji: '🍣', delay: 0.1 },
              { key: 'chef', emoji: '👨‍🍳', delay: 0.2 },
            ].map(({ key, emoji, delay }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -8 }}
                className="relative rounded-[1.5rem] p-9 transition-all duration-500 group"
                style={{
                  background: 'linear-gradient(165deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,.55) 100%)',
                  border: '1px solid rgba(26,46,26,0.08)',
                  boxShadow: '0 4px 30px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
                }}
              >
                {/* Hover glow — gold radial from cursor */}
                <span
                  className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 80% at var(--mx,50%) var(--my,50%), rgba(245,158,11,.08), transparent 55%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="text-4xl mb-5">{emoji}</div>
                  <h3 className="font-display text-xl font-bold mb-3 text-[#1a2e1a] leading-snug">
                    {t(`about.${key}_title`)}
                  </h3>
                  <p className="text-[#555] leading-[1.75] text-[15px]">
                    {t(`about.${key}_text`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ REVIEWS — bottom soft section ════ */}
      <section className="relative py-32 px-6" style={{ background: 'linear-gradient(180deg, #f0efed 0%, #eae8e4 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-center mb-14 text-[#1a1a1a] tracking-tight"
          >
            {t('reviews.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-7">
            {[
              { name: 'Sofia M.', text: 'El mejor sushi que he comido fuera de Japón. El ramen es espectacular y el ambiente es perfecto.', rating: 5 },
              { name: 'Lucas R.', text: 'Dim sum artesanal de verdad. Los camareros son súper amables y los precios muy razonables.', rating: 5 },
              { name: 'Julia T.', text: 'Lugar icónico en Tamraght. Volvemos cada semana, la calidad nunca defrauda.', rating: 4 },
            ].map((rv, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -5 }}
                className="relative rounded-[1.5rem] p-9 transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,.75)',
                  border: '1px solid rgba(26,46,26,0.07)',
                  boxShadow: '0 4px 24px rgba(0,0,0,.05)',
                }}
              >
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={14}
                      className={n <= rv.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <p className="text-[#444] leading-[1.75] text-[15px] mb-6 italic">
                  "{rv.text}"
                </p>
                <footer className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-[#1a2e1a]"
                    style={{ background: 'linear-gradient(135deg, rgba(245,158,11,.18), rgba(245,158,11,.08))' }}
                  >
                    {rv.name.charAt(0)}
                  </div>
                  <span className="text-[13px] font-semibold text-[#555]">{rv.name}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
