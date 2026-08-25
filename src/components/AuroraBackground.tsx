import { useEffect, useRef } from "react";

/**
 * Camada de fundo global (fixa, atrás de todo o conteúdo).
 * Shader WebGL "aurora" — cópia literal do shader usado na referência.
 *
 * - Carregamento lazy do three.js (não bloqueia o first paint).
 * - Fallback silencioso: sem WebGL, nada é renderizado.
 * - NUM_LAYERS: 25 no desktop, 15 até 767px. Frame-rate limitado a ~20fps.
 */
const buildFragmentShader = (numLayers: number) => /* glsl */ `
precision mediump float;
uniform float iTime;
uniform vec2 iResolution;

#define NUM_LAYERS ${numLayers}

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  return mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 x) {
  float v = 0.0, a = 0.3;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 2; i++) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.4;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y;
  vec2 p = uv * mat2(6.0, -4.0, 4.0, 6.0);
  vec4 o = vec4(0.0);
  float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

  for (int j = 1; j <= NUM_LAYERS; j++) {
    float i = float(j);
    vec2 v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5;
    vec4 auroraColors = vec4(
      0.3 + 0.3 * sin(i * 0.3 + iTime * 0.4),
      0.15 + 0.2 * cos(i * 0.2 + iTime * 0.3),
      0.5 + 0.4 * sin(i * 0.15 + iTime * 0.5),
      1.0
    );
    float lenVal = max(length(max(v, vec2(v.x * f * 0.015, v.y * 1.5))), 0.001);
    o += auroraColors * exp(sin(i * i + iTime * 0.8)) / lenVal * smoothstep(0.0, 1.0, i / float(NUM_LAYERS)) * 0.6;
  }

  o = o / 80.0;
  o = pow(max(o, vec4(0.0)), vec4(1.6));
  vec4 ex = exp(2.0 * o);
  o = (ex - vec4(1.0)) / (ex + vec4(1.0));
  gl_FragColor = o * 1.2;
}
`;

const VERTEX_SHADER = /* glsl */ `
void main() {
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

    // Fallback silencioso quando não há WebGL.
    try {
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl")) return;
    } catch {
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const numLayers = window.innerWidth < 768 ? 15 : 25;

        const uniforms = {
          iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          iTime: { value: 0 },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: buildFragmentShader(numLayers),
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
          uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize, { passive: true });

        let frame = 0;
        let last = 0;
        const start = performance.now();
        const FRAME_INTERVAL = 50; // ~20fps

        const loop = (now: number) => {
          frame = requestAnimationFrame(loop);
          if (now - last < FRAME_INTERVAL) return;
          last = now;
          uniforms.iTime.value = (performance.now() - start) / 1000;
          renderer.render(scene, camera);
        };
        frame = requestAnimationFrame(loop);

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
