import React, { useEffect, useRef, useMemo } from 'react';
import { useRouter } from '../../context/RouterContext';

interface StarFieldProps {
  density?: 'sparse' | 'normal' | 'dense';
  className?: string;
  showHUD?: boolean;
  isWarping?: boolean;
}

interface StarNode {
  x: number;
  y: number;
  z: number;
  pz: number;
  size: number;
  color: string;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hasSpikes: boolean;
}

interface DarkMatterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulsePhase: number;
}

interface OrbitNode {
  rx: number;
  ry: number;
  angle: number;
  speed: number;
  nodeSize: number;
  label: string;
  color: string;
}

export function StarField({
  density = 'normal',
  className = '',
  showHUD = true,
  isWarping: isWarpingProp,
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isWarping: routerWarping } = useRouter();
  const isWarping = isWarpingProp ?? routerWarping;

  // Check reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette for realistic star spectroscopy
    const starColors = [
      '#ffffff', // O/B class white
      '#e0f2fe', // Soft cyan
      '#38bdf8', // Electric cyan
      '#818cf8', // Ionized violet/indigo
      '#c084fc', // Nebula magenta
      '#fde047', // G-class solar gold
      '#f97316', // M-class warm orange
    ];

    // Star Count
    const starCount = density === 'sparse' ? 140 : density === 'normal' ? 240 : 360;
    const stars: StarNode[] = [];

    for (let i = 0; i < starCount; i++) {
      const z = Math.random() * 1000 + 1;
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z,
        pz: z,
        size: Math.random() * 1.8 + 0.6,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseOpacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        hasSpikes: Math.random() > 0.92, // Rare bright stars get diffraction spikes
      });
    }

    // Dark Matter Gravitational Particles
    const darkMatterParticles: DarkMatterParticle[] = [];
    const dmCount = 35;
    for (let i = 0; i < dmCount; i++) {
      darkMatterParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.4 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Solar System Planetary Orbits
    const orbits: OrbitNode[] = [
      { rx: 260, ry: 75, angle: 0.3, speed: 0.0012, nodeSize: 3.5, label: 'SECTOR-I', color: '#38bdf8' },
      { rx: 420, ry: 120, angle: 1.8, speed: 0.0008, nodeSize: 4.5, label: 'SECTOR-II', color: '#818cf8' },
      { rx: 640, ry: 175, angle: 3.4, speed: 0.0005, nodeSize: 6.0, label: 'SECTOR-III', color: '#c084fc' },
      { rx: 880, ry: 240, angle: 4.9, speed: 0.0003, nodeSize: 4.0, label: 'WARP-GATE', color: '#22d3ee' },
    ];

    let warpVelocity = 1.0;
    let targetWarpVelocity = 1.0;
    let clock = 0;

    const render = () => {
      clock += 0.016;

      // Handle Warp Speed Interpolation
      targetWarpVelocity = isWarping ? 32.0 : 1.0;
      warpVelocity += (targetWarpVelocity - warpVelocity) * 0.12;

      // Deep space clear with slight accumulation during warp
      ctx.fillStyle = isWarping ? 'rgba(2, 4, 9, 0.45)' : 'rgba(2, 4, 9, 1)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Procedural Milky Way Galactic Dust Lane & Spiral Galaxy
      const mwGrad = ctx.createLinearGradient(0, height * 0.2, width, height * 0.8);
      mwGrad.addColorStop(0, 'rgba(2, 4, 9, 0)');
      mwGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.035)');
      mwGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.055)');
      mwGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.04)');
      mwGrad.addColorStop(1, 'rgba(2, 4, 9, 0)');

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.25);
      ctx.fillStyle = mwGrad;
      ctx.fillRect(-width, -height * 0.5, width * 2, height);
      ctx.restore();

      // 1B. Upper-Left Spiral Galaxy (Matching Reference Image)
      if (!isWarping) {
        ctx.save();
        const galX = width * 0.16;
        const galY = height * 0.22;
        ctx.translate(galX, galY);
        ctx.rotate(clock * 0.015);

        // Galactic Core Glow
        const galCore = ctx.createRadialGradient(0, 0, 2, 0, 0, 60);
        galCore.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        galCore.addColorStop(0.2, 'rgba(56, 189, 248, 0.45)');
        galCore.addColorStop(0.6, 'rgba(129, 140, 248, 0.15)');
        galCore.addColorStop(1, 'transparent');
        ctx.fillStyle = galCore;
        ctx.beginPath();
        ctx.ellipse(0, 0, 60, 32, -0.35, 0, Math.PI * 2);
        ctx.fill();

        // Spiral Arms
        for (let a = 0; a < 2; a++) {
          ctx.beginPath();
          for (let r = 8; r < 90; r += 2) {
            const theta = (r * 0.08) + (a * Math.PI);
            const x = Math.cos(theta) * r;
            const y = Math.sin(theta) * (r * 0.52);
            if (r === 8) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = a === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(192, 132, 252, 0.25)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
        ctx.restore();

        // 1C. Upper-Right Ringed Celestial Gas Giant (Matching Reference Image)
        ctx.save();
        const planetX = width * 0.84;
        const planetY = height * 0.24;
        const planetRadius = 24;
        ctx.translate(planetX, planetY);

        // Planet Body
        const planetGrad = ctx.createRadialGradient(-planetRadius * 0.35, -planetRadius * 0.35, 2, 0, 0, planetRadius);
        planetGrad.addColorStop(0, '#bae6fd');
        planetGrad.addColorStop(0.3, '#38bdf8');
        planetGrad.addColorStop(0.7, '#1e3a8a');
        planetGrad.addColorStop(1, '#020617');
        ctx.fillStyle = planetGrad;
        ctx.beginPath();
        ctx.arc(0, 0, planetRadius, 0, Math.PI * 2);
        ctx.fill();

        // Atmospheric Rim Glow
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Planetary Rings
        ctx.save();
        ctx.rotate(-0.35);
        ctx.beginPath();
        ctx.ellipse(0, 0, planetRadius * 2.3, planetRadius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.5)';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(0, 0, planetRadius * 2.7, planetRadius * 0.72, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        ctx.restore();
      }

      // 2. Solar System Orbital Lines & Planetary Nodes
      if (!isWarping && !prefersReducedMotion) {
        ctx.save();
        ctx.translate(cx, cy - 60);

        orbits.forEach((orb) => {
          orb.angle += orb.speed;

          // Draw orbital ellipse
          ctx.beginPath();
          ctx.ellipse(0, 0, orb.rx, orb.ry, -0.15, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 10]);
          ctx.stroke();

          // Calculate planetary node position on ellipse
          const px = Math.cos(orb.angle) * orb.rx;
          const py = Math.sin(orb.angle) * orb.ry;

          // Planetary glow
          const nodeGlow = ctx.createRadialGradient(px, py, 0, px, py, orb.nodeSize * 3);
          nodeGlow.addColorStop(0, orb.color);
          nodeGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(px, py, orb.nodeSize * 3, 0, Math.PI * 2);
          ctx.fill();

          // Planetary Core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, orb.nodeSize * 0.6, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }

      // 3. Dark Matter Gravitational Particles
      if (!prefersReducedMotion) {
        darkMatterParticles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Slight gravitational pull towards center
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 50) {
            p.vx += (dx / dist) * 0.002;
            p.vy += (dy / dist) * 0.002;
          }

          p.pulsePhase += 0.02;
          const currentAlpha = p.alpha * (0.8 + 0.2 * Math.sin(p.pulsePhase));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha * 0.4})`;
          ctx.fill();
        });
      }

      // 4. Stellar Field with 3D Warp Perspective
      const baseSpeed = prefersReducedMotion ? 0 : 0.6;
      const speed = baseSpeed * warpVelocity;

      stars.forEach((star) => {
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = 1000;
          star.pz = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 280 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px < 0 || px >= width || py < 0 || py >= height) return;

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.75 + 0.25 * Math.sin(star.twinklePhase);
        const depthAlpha = Math.min(1, (1000 - star.z) / 400);
        const finalAlpha = star.baseOpacity * twinkle * depthAlpha;

        if (warpVelocity > 2.0) {
          // Light-Speed Warp Streaks
          const pk = 280 / star.pz;
          const prevPx = star.x * pk + cx;
          const prevPy = star.y * pk + cy;

          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.max(1, (1 - star.z / 1000) * 3);
          ctx.globalAlpha = Math.min(1, finalAlpha * 1.5);
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        } else {
          // Normal Space Pinprick & Flare
          const r = Math.max(0.6, (1 - star.z / 1000) * star.size * 2);

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = finalAlpha;
          ctx.fill();

          // Diffraction Spikes for rare high-magnitude stars
          if (star.hasSpikes && r > 1.8 && !prefersReducedMotion) {
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = finalAlpha * 0.6;
            ctx.beginPath();
            ctx.moveTo(px - r * 3.5, py);
            ctx.lineTo(px + r * 3.5, py);
            ctx.moveTo(px, py - r * 3.5);
            ctx.lineTo(px, py + r * 3.5);
            ctx.stroke();
          }

          ctx.globalAlpha = 1.0;
        }
      });

      // 5. Warp Conduit Burst during light-speed transition
      if (warpVelocity > 10.0) {
        const tunnelGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.7);
        tunnelGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
        tunnelGrad.addColorStop(0.3, 'rgba(99, 102, 241, 0.15)');
        tunnelGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.05)');
        tunnelGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = tunnelGrad;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, isWarping, prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
    >
      {/* HTML5 High-Performance Deep Space Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Cockpit Viewport Vignette and Scanlines */}
      <div className="absolute inset-0 cockpit-view-lines pointer-events-none opacity-80" />

      {/* Cockpit Canopy Struts & Aerospace Bulkhead Brackets */}
      <div className="absolute top-0 left-0 w-48 h-20 border-t-2 border-l-2 border-cyan-500/20 pointer-events-none rounded-br-[40px] bg-gradient-to-br from-cyan-500/5 to-transparent" />
      <div className="absolute top-0 right-0 w-48 h-20 border-t-2 border-r-2 border-cyan-500/20 pointer-events-none rounded-bl-[40px] bg-gradient-to-bl from-cyan-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-32 h-12 border-b border-l border-slate-700/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-12 border-b border-r border-slate-700/30 pointer-events-none" />

      {/* Spacecraft Avionics HUD Frame Overlays */}
      {showHUD && (
        <div className="absolute inset-0 pointer-events-none p-3 md:p-6 flex flex-col justify-between font-mono text-[9px] text-cyan-400/50">
          {/* Top Edge HUD telemetry */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>ORBITAL SECTOR: 09-CYGNUS</span>
              <span className="text-slate-600">//</span>
              <span>GRID: 42.88.109</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span>WARP FACTOR: {isWarping ? '9.88 [ACTIVE]' : 'STANDBY 1.0'}</span>
              <span className="text-slate-600">//</span>
              <span>GRAV-LENS: NOMINAL</span>
            </div>
          </div>

          {/* Center Subtle Gimbal Reticles */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-1 text-[8px] text-slate-600">
            <span>+15°</span>
            <span>+00°</span>
            <span>-15°</span>
          </div>

          {/* Bottom Edge HUD telemetry */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>AVIONICS: V2.0-DARK-MATTER</span>
              <span className="text-slate-600">//</span>
              <span>COCKPIT SYNC: LOCKED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">EVENT HORIZON DISTANCE:</span>
              <span className="text-cyan-300">0.42 AU</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
