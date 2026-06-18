import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AuroraBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!mountRef.current || hasError) return;
    const currentMount = mountRef.current;

    let renderer: any;
    let animationFrameId: number;
    let handleResize: (() => void) | null = null;

    const init = async () => {
      try {
        const THREE = await import('three');

        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          setHasError(true);
          return;
        }

        const pixelRatio = isMobile ? 0.5 : Math.min(window.devicePixelRatio, 1);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(pixelRatio);
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '0';
        renderer.domElement.style.pointerEvents = 'none';
        currentMount.appendChild(renderer.domElement);

        // Fewer iterations on mobile for performance
        const loopCount = isMobile ? 15 : 25;

        const material = new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0.0 },
            iResolution: { value: new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio) },
          },
          vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
          fragmentShader: `
            precision mediump float;
            uniform float iTime;
            uniform vec2 iResolution;

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

              for (int j = 1; j <= ${loopCount}; j++) {
                float i = float(j);
                vec2 v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5;
                vec4 auroraColors = vec4(
                  0.3 + 0.3 * sin(i * 0.3 + iTime * 0.4),
                  0.15 + 0.2 * cos(i * 0.2 + iTime * 0.3),
                  0.5 + 0.4 * sin(i * 0.15 + iTime * 0.5),
                  1.0
                );
                float lenVal = max(length(max(v, vec2(v.x * f * 0.015, v.y * 1.5))), 0.001);
                o += auroraColors * exp(sin(i * i + iTime * 0.8)) / lenVal * smoothstep(0.0, 1.0, i / ${loopCount}.0) * 0.6;
              }

              o = o / 80.0;
              o = pow(max(o, vec4(0.0)), vec4(1.6));
              vec4 ex = exp(2.0 * o);
              o = (ex - vec4(1.0)) / (ex + vec4(1.0));
              gl_FragColor = o * 1.2;
            }
          `,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Throttle to ~30fps for smoothness without GPU strain
        const targetInterval = isMobile ? 50 : 33; // 20fps mobile, 30fps desktop
        let lastTime = 0;

        const animate = (time: number) => {
          animationFrameId = requestAnimationFrame(animate);
          if (time - lastTime < targetInterval) return;
          lastTime = time;
          material.uniforms.iTime.value += targetInterval * 0.001;
          renderer.render(scene, camera);
        };

        handleResize = () => {
          if (renderer) {
            renderer.setSize(window.innerWidth, window.innerHeight);
            material.uniforms.iResolution.value.set(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
          }
        };

        window.addEventListener('resize', handleResize);
        animationFrameId = requestAnimationFrame(animate);
      } catch (err) {
        console.warn('AuroraBackground failed:', err);
        setHasError(true);
      }
    };

    init();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (renderer) {
        if (currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, [hasError, isMobile]);

  if (hasError) return null;

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none overflow-hidden absolute inset-0 z-0" />;
};

export default AuroraBackground;
