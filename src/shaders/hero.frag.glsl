uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uResolution;
varying vec2  vUv;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
float fbm(vec2 p){ float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.;a*=.5;} return v; }

void main(){
  vec2 uv = vUv;
  float t = uTime * 0.12;
  // Mouse influence
  vec2 mouseOff = (uMouse - .5) * .4;
  vec2 q = uv * 1.4 + mouseOff;
  // FBM layers
  float f = fbm(q + t);
  float g = fbm(q * 1.5 - t * 0.7 + f);
  float h = fbm(q * 0.7 + t * 0.4 + g);
  // Color palette: kin-green → dark → amber streaks
  vec3 col = mix(vec3(0.04,0.10,0.09),   // fondo oscuro
                 vec3(0.10,0.18,0.10),   // verde bosque
                 clamp(f+g,0.,1.));
  col = mix(col, vec3(0.96,0.62,0.04),   // vetas doradas
            clamp(h*h*0.7,0.,1.));
  // Vignette
  float vig = 1. - length(uv-.5)*1.3;
  col *= clamp(vig,0.,1.);
  // Grano sutil
  col += (hash(uv+fract(t))-.5)*0.03;
  gl_FragColor = vec4(col,1.0);
}