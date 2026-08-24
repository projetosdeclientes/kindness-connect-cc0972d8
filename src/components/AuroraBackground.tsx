import { useEffect, useRef } from "react";

/**
 * Camada de fundo global (fixa, atrás de todo o conteúdo).
 * Shader WebGL com fractal Brownian motion + "aurora" na paleta da marca
 * (rosa / roxo / azul / ciano — os mesmos tons de --gradient-brand).
 *
 * - Carregamento lazy do three.js (não bloqueia o first paint).
 * - Fallback silencioso: sem WebGL, nada é renderizado (a página não quebra).
 * - Densidade reduzida em mobile e respeito a prefers-reduced-motion.
 */
const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform float uDensity;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 p = vec2(uv.x * (uResolution.x / max(uResolution.y, 1.0)), uv.y);

  float t = uTime * 0.045;
  float n = fbm(p * (2.2 * uDensity) + vec2(t, -t * 0.6));
  n = fbm(p * 2.6 + vec2(n * 1.4, n - t));

  // Paleta da marca
  vec3 pink   = vec3(0.906, 0.286, 0.549);
  vec3 purple = vec3(0.639, 0.361, 0.851);
  vec3 blue   = vec3(0.239, 0.545, 0.929);
  vec3 cyan   = vec3(0.165, 0.749, 0.827);

  vec3 color = mix(pink, purple, smoothstep(0.15, 0.55, n));
  color = mix(color, blue, smoothstep(0.40, 0.80, n + uv.y * 0.25));
  color = mix(color, cyan, smoothstep(0.70, 1.00, n * 1.1));

  // Véu vertical: mais intenso no topo, dissolve embaixo
  float veil = smoothstep(0.05, 0.95, n) * (1.0 - uv.y * 0.65);
  float alpha = veil * 0.16;

  gl_FragColor = vec4(color * alpha, alpha);
}
`;

const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const AuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;

    // Respeita usuários que pedem menos movimento.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.Camera();

        const uniforms = {
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTime: { value: 0 },
          uDensity: { value: window.innerWidth < 768 ? 0.6 : 1.0 },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          uniforms,
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        mesh.frustumCulled = false;
        scene.add(mesh);

        const onResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
          uniforms.uDensity.value = window.innerWidth < 768 ? 0.6 : 1.0;
        };
        window.addEventListener("resize", onResize, { passive: true });

        let frame = 0;
        const start = performance.now();
        const loop = () => {
          uniforms.uTime.value = (performance.now() - start) / 1000;
          renderer.render(scene, camera);
          frame = requestAnimationFrame(loop);
        };
        loop();

        cleanup = () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("resize", onResize);
          mesh.geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // Sem WebGL / falha ao carregar three: fallback silencioso.
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AuroraBackground;
