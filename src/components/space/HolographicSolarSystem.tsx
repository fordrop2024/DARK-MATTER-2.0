import React, { useRef, useEffect } from 'react';

interface Planet {
  name: string;
  stage: string;
  orbitRadiusX: number;
  orbitRadiusY: number;
  size: number;
  color: string;
  speed: number;
  initialAngle: number;
  ring?: boolean;
}

export function HolographicSolarSystem({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const planets: Planet[] = [
      {
        name: 'IDEA',
        stage: 'Stage 01',
        orbitRadiusX: 42,
        orbitRadiusY: 18,
        size: 3,
        color: '#38bdf8',
        speed: 0.024,
        initialAngle: 0.5,
      },
      {
        name: 'STORY',
        stage: 'Stage 02',
        orbitRadiusX: 72,
        orbitRadiusY: 30,
        size: 4.5,
        color: '#818cf8',
        speed: 0.016,
        initialAngle: 2.1,
      },
      {
        name: 'SCRIPT',
        stage: 'Stage 03',
        orbitRadiusX: 106,
        orbitRadiusY: 44,
        size: 5,
        color: '#c084fc',
        speed: 0.011,
        initialAngle: 4.2,
      },
      {
        name: 'MEDIA',
        stage: 'Stage 04',
        orbitRadiusX: 142,
        orbitRadiusY: 58,
        size: 6.5,
        color: '#38bdf8',
        speed: 0.0075,
        initialAngle: 1.4,
        ring: true,
      },
      {
        name: 'LAUNCH',
        stage: 'Stage 05',
        orbitRadiusX: 178,
        orbitRadiusY: 72,
        size: 5.5,
        color: '#f97316',
        speed: 0.005,
        initialAngle: 5.0,
      },
    ];

    let t = 0;

    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle background grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 10);
      ctx.lineTo(cx, height - 10);
      ctx.moveTo(10, cy);
      ctx.lineTo(width - 10, cy);
      ctx.stroke();

      // Draw planetary orbits (ellipses tilted to match spacecraft perspective)
      planets.forEach((p) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, p.orbitRadiusX, p.orbitRadiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.setLineDash([2, 5]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Central Star / Sun with Corona Flare
      const sunPulse = Math.sin(t * 0.04) * 2;
      const sunGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 26 + sunPulse);
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.2, '#fef08a');
      sunGrad.addColorStop(0.5, '#f97316');
      sunGrad.addColorStop(0.85, 'rgba(234, 88, 12, 0.4)');
      sunGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 26 + sunPulse, 0, Math.PI * 2);
      ctx.fill();

      // Sun core
      ctx.fillStyle = '#fff7ed';
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();

      // Draw Planets along orbits
      planets.forEach((p) => {
        const angle = p.initialAngle + t * p.speed;
        const px = cx + Math.cos(angle) * p.orbitRadiusX;
        const py = cy + Math.sin(angle) * p.orbitRadiusY;

        // Planet Glow
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 2.8);
        glowGrad.addColorStop(0, p.color);
        glowGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Optional planetary ring (like Saturn)
        if (p.ring) {
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2.2, p.size * 0.8, -0.3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Planet body
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Planet highlight
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px - p.size * 0.3, py - p.size * 0.3, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw radar sweep line
      const sweepAngle = t * 0.015;
      const sweepLen = 175;
      const sweepX = cx + Math.cos(sweepAngle) * sweepLen;
      const sweepY = cy + Math.sin(sweepAngle) * (sweepLen * 0.4);

      const sweepGrad = ctx.createLinearGradient(cx, cy, sweepX, sweepY);
      sweepGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      sweepGrad.addColorStop(1, 'transparent');

      ctx.strokeStyle = sweepGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Telemetry Corner Tags */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[8.5px] font-mono text-cyan-400/90 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>ORBITAL SECTOR // 5 BODIES</span>
      </div>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500 pointer-events-none">
        HELIOS VECTOR 1.0
      </div>
    </div>
  );
}
