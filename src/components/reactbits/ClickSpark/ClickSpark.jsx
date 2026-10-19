import { useRef, useEffect, useCallback } from 'react';
import './ClickSpark.css';

export const ClickSpark = ({
  sparkColor = '#f59e0b',
  sparkSize = 10,
  sparkCount = 8,
  duration = 450,
  children,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startAnimRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeObserver;

    // Canvas is position:fixed (viewport-sized) — no need to track the
    // document-sized parent, which used to cost tens of MB of GPU memory.
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(document.documentElement);
    resizeCanvas();

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const createSparks = useCallback((x, y) => {
    const newSparks = [];
    for (let i = 0; i < sparkCount; i++) {
      const angle = (2 * Math.PI * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 2 + 1.5;
      newSparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * sparkSize * 0.5 + sparkSize * 0.5,
        alpha: 1,
        startTime: performance.now(),
      });
    }
    sparksRef.current.push(...newSparks);
  }, [sparkCount, sparkSize]);

  useEffect(() => {
    let animId = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Respect reduced-motion: never start the loop; clicks won't spawn sparks.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const currentAlpha = 1 - progress;

        spark.x += spark.vx;
        spark.y += spark.vy;

        ctx.save();
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * (1 - progress * 0.5), 0, 2 * Math.PI);
        ctx.fillStyle = sparkColor;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = sparkColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();

        return true;
      });

      // Stop the loop when no sparks remain (idle cost: 0).
      if (sparksRef.current.length === 0) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(animate);
    };

    // Called on click to (re)start the loop only when it isn't already running.
    startAnimRef.current = () => {
      if (animId === null) {
        animId = requestAnimationFrame(animate);
      }
    };

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      startAnimRef.current = null;
    };
  }, [duration, sparkColor]);

  const handleClick = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createSparks(x, y);
    startAnimRef.current?.();
  };

  return (
    <div className={`click-spark-container ${className}`} onClick={handleClick}>
      <canvas ref={canvasRef} className="click-spark-canvas" />
      {children}
    </div>
  );
};

export default ClickSpark;
