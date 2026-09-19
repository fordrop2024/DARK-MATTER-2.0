import React, { useEffect, useRef } from 'react';

export function OscilloscopeWave({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const width = (canvas.width = canvas.parentElement?.clientWidth || 200);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 45);

      ctx.clearRect(0, 0, width, height);

      const midY = height / 2;

      // Draw baseline grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Primary Harmonic Sine Wave
      ctx.beginPath();
      ctx.moveTo(0, midY);

      for (let x = 0; x < width; x++) {
        // Compound wave simulating quantum tensor pulse
        const freq1 = Math.sin(x * 0.06 + t * 2);
        const freq2 = Math.sin(x * 0.12 - t * 3) * 0.4;
        const envelope = Math.sin((x / width) * Math.PI); // Pinched at edges
        const y = midY + (freq1 + freq2) * (height * 0.38) * envelope;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = 'var(--dm-accent, #38bdf8)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = 'var(--dm-accent, #38bdf8)';
      ctx.shadowBlur = 8;
      ctx.stroke();

      // Draw Secondary Faint Harmonic
      ctx.beginPath();
      ctx.moveTo(0, midY);
      for (let x = 0; x < width; x++) {
        const freq = Math.cos(x * 0.04 + t * 1.5) * Math.sin((x / width) * Math.PI);
        const y = midY + freq * (height * 0.22);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`relative w-full h-11 flex items-center overflow-hidden rounded-lg bg-slate-950/70 border border-slate-800/80 p-1 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <span className="absolute right-2 top-1 text-[7.5px] font-mono text-cyan-400/80">
        48.2 THz // FLUX
      </span>
    </div>
  );
}
