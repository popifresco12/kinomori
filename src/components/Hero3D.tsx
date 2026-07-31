'use client';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Instanced Sparkles (single draw call) ──────────────────────────────
function InstancedSparkles({
  count = 40,
  scale = 10,
  size = 0.8,
  speed = 0.3,
  color = '#f59e0b',
  opacity = 0.4,
}: {
  count?: number;
  scale?: number;
  size?: number;
  speed?: number;
  color?: string;
  opacity?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  // Create instanced geometry once
  const geometry = useMemo(() => {
    const geo = new THREE.InstancedBufferGeometry();
    const baseGeo = new THREE.SphereGeometry(size * 0.5, 8, 8);
    geo.index = baseGeo.index;
    geo.attributes.position = baseGeo.attributes.position;
    geo.attributes.normal = baseGeo.attributes.normal;
    geo.attributes.uv = baseGeo.attributes.uv;

    // Per-instance attributes
    const offsets = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random position in sphere
      const radius = Math.random() * scale * 0.8 + scale * 0.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      offsets[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      offsets[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      offsets[i * 3 + 2] = radius * Math.cos(phi);

      scales[i] = 0.5 + Math.random() * 0.8;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    geo.setAttribute('instanceOffset', new THREE.InstancedBufferAttribute(offsets, 3));
    geo.setAttribute('instanceScale', new THREE.InstancedBufferAttribute(scales, 1));
    geo.setAttribute('instancePhase', new THREE.InstancedBufferAttribute(phases, 1));
    geo.setAttribute('instanceSpeed', new THREE.InstancedBufferAttribute(speeds, 1));

    return geo;
  }, [count, scale, size]);

  // Shader material for instanced sparkles
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: opacity },
      },
      vertexShader: `
        attribute vec3 instanceOffset;
        attribute float instanceScale;
        attribute float instancePhase;
        attribute float instanceSpeed;
        uniform float uTime;
        varying float vOpacity;
        void main() {
          vec3 pos = position * instanceScale + instanceOffset;
          float t = uTime * instanceSpeed + instancePhase;
          pos.y += sin(t) * 2.0;
          pos.x += cos(t * 0.7) * 1.5;
          pos.z += sin(t * 0.5) * 1.0;
          vOpacity = smoothstep(0.0, 1.0, sin(t) * 0.5 + 0.5);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (50.0 * instanceScale) / -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vOpacity;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, dist) * vOpacity * uOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
  }, [color, opacity]);

  // Update time uniform
  useFrame(({ clock }) => {
    if (material && pointsRef.current) {
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}

// ── Morphing Torus with throttled frame (30fps) ────────────────────────
function MorphingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const lastFrameTime = useRef(0);
  const frameInterval = 1000 / 30; // 30fps = 33.33ms

  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(1, 0.35, 160, 20),
    []
  );

  const materialProps = useMemo(
    () => ({
      color: '#1a2e1a',
      metalness: 0.2,
      roughness: 0.25,
      emissive: '#f59e0b',
      emissiveIntensity: 0.08,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15,
      distort: 0.25,
      speed: 1.5,
    }),
    []
  );

  const onFrame = useCallback(({ clock }: { clock: THREE.Clock }) => {
    const now = performance.now();
    if (now - lastFrameTime.current < frameInterval) return;
    lastFrameTime.current = now;

    if (!meshRef.current || !materialRef.current) return;
    const t = clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;

    materialRef.current.emissiveIntensity =
      0.06 + Math.sin(t * 0.6) * 0.04;
  }, []);

  useFrame(onFrame);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.6} geometry={geometry}>
        <MeshDistortMaterial ref={materialRef} {...materialProps} />
      </mesh>
    </Float>
  );
}

// ── Reduced Motion Detection ───────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ── Hero3D Main Component ──────────────────────────────────────────────
export default function Hero3D() {
  const reducedMotion = useReducedMotion();
  const position: [number, number, number] = [0, 0, 4.5];

  const canvasCamera = useMemo(
    () => ({ position, fov: 50 }),
    [position]
  );

  const canvasGl = useMemo(
    () => ({ alpha: true, antialias: true, powerPreference: 'high-performance' } as const),
    []
  );

  const lights = useMemo(() => (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={0.8} />
      <pointLight position={[-3, -2, -3]} intensity={0.6} color="#f59e0b" />
    </>
  ), []);

  if (reducedMotion) {
    // Static fallback for reduced motion
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

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" role="img" aria-label="Animación 3D decorativa: toroide flotante con partículas doradas">
      <Canvas
        camera={canvasCamera}
        gl={canvasGl}
        style={{ background: 'transparent' }}
      >
        {lights}
        <MorphingTorus />
        <InstancedSparkles
          count={40}
          scale={10}
          size={0.8}
          speed={0.3}
          color="#f59e0b"
          opacity={0.4}
        />
      </Canvas>
    </div>
  );
}