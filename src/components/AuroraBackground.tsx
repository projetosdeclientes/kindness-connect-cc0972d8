import { useEffect, useRef, useState } from 'react';

const AuroraBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!mountRef.current || hasError) return;
    const currentMount = mountRef.current;

    let renderer: any;
    let animationFrameId: number;
    let handleResize: (() => void) | null = null;

    const init = async () => {
      try {
        const THREE = await import('three');

        // Check WebGL support
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          console.warn('WebGL not supported');
          setHasError(true);
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '0';
        renderer.domElement.style.pointerEvents = 'none';
        currentMount.appendChild(renderer.domElement);

        const material = new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0.0 },
            iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          },
          vertexShader: `
            void main() {
              gl_Position = vec4(position, 1.0);
            }
          `,
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
              float res = mix(
                mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
                mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
                u.y
              );
              return res * res;
            }

            float fbm(vec2 x) {
              float v = 0.0;
              float a = 0.3;
              vec2 shift = vec2(100.0);
              mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
              for (int i = 0; i < 3; i++) {
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

              for (int j = 1; j <= 35; j++) {
                float i = float(j);
                vec2 v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5;
                float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
                vec4 auroraColors = vec4(
                  0.05 + 0.15 * sin(i * 0.2 + iTime * 0.4),
                  0.4 + 0.4 * cos(i * 0.3 + iTime * 0.5),
                  0.3 + 0.3 * sin(i * 0.4 + iTime * 0.3),
                  1.0
                );
                float lenVal = length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
                if (lenVal < 0.001) lenVal = 0.001;
                vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / lenVal;
                float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
                o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
              }

              o = o / 100.0;
              o = pow(max(o, vec4(0.0)), vec4(1.6));
              // Manual tanh approximation for WebGL compatibility
              vec4 ex = exp(2.0 * o);
              o = (ex - vec4(1.0)) / (ex + vec4(1.0));
              gl_FragColor = o * 1.2;
            }
          `,
        });

        // Check shader compilation
        renderer.render(scene, camera);
        const glCtx = renderer.getContext();
        const program = (renderer as any).info?.programs?.[0]?.program;
        if (program) {
          const linked = glCtx.getProgramParameter(program, glCtx.LINK_STATUS);
          if (!linked) {
            console.warn('Shader program failed to link');
            setHasError(true);
            return;
          }
        }

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
          material.uniforms.iTime.value += 0.016;
          renderer.render(scene, camera);
        };

        handleResize = () => {
          if (renderer) {
            renderer.setSize(window.innerWidth, window.innerHeight);
            material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
          }
        };

        window.addEventListener('resize', handleResize);
        animate();
      } catch (err) {
        console.warn('AuroraBackground failed to initialize:', err);
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
  }, [hasError]);

  if (hasError) return null;

  return <div ref={mountRef} className="pointer-events-none" />;
};

export default AuroraBackground;
