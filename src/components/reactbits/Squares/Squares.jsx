import { useRef, useEffect, useCallback } from 'react';
import './Squares.css';

export const Squares = ({
  direction = 'diagonal', // 'diagonal' | 'up' | 'down' | 'left' | 'right'
  speed = 0.4,
  borderColor = 'rgba(245, 158, 11, 0.12)',
  squareSize = 44,
  hoverFillColor = 'rgba(245, 158, 11, 0.2)',
  className = '',
}) => {
  const canvasRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const startX = Math.floor(offsetRef.current.x % squareSize);
    const startY = Math.floor(offsetRef.current.y % squareSize);

    const hoveredCol = Math.floor((mouseX - startX) / squareSize);
    const hoveredRow = Math.floor((mouseY - startY) / squareSize);

    hoveredSquareRef.current = { col: hoveredCol, row: hoveredRow };
  }, [squareSize]);

  const handleMouseLeave = useCallback(() => {
    hoveredSquareRef.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const updateAnimation = () => {
      const { width, height } = canvas;
      if (!width || !height) {
        animationId = requestAnimationFrame(updateAnimation);
        return;
      }

      // Drift calculation
      switch (direction) {
        case 'diagonal':
          offsetRef.current.x = (offsetRef.current.x - speed + squareSize) % squareSize;
          offsetRef.current.y = (offsetRef.current.y - speed + squareSize) % squareSize;
          break;
        case 'up':
          offsetRef.current.y = (offsetRef.current.y - speed + squareSize) % squareSize;
          break;
        case 'down':
          offsetRef.current.y = (offsetRef.current.y + speed) % squareSize;
          break;
        case 'left':
          offsetRef.current.x = (offsetRef.current.x - speed + squareSize) % squareSize;
          break;
        case 'right':
          offsetRef.current.x = (offsetRef.current.x + speed) % squareSize;
          break;
        default:
          break;
      }

      ctx.clearRect(0, 0, width, height);

      const startX = Math.floor(offsetRef.current.x % squareSize);
      const startY = Math.floor(offsetRef.current.y % squareSize);

      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;

      const numCols = Math.ceil((width - startX) / squareSize) + 1;
      const numRows = Math.ceil((height - startY) / squareSize) + 1;

      for (let col = -1; col < numCols; col++) {
        for (let row = -1; row < numRows; row++) {
          const x = startX + col * squareSize;
          const y = startY + row * squareSize;

          if (
            hoveredSquareRef.current &&
            hoveredSquareRef.current.col === col &&
            hoveredSquareRef.current.row === row
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }

          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      animationId = requestAnimationFrame(updateAnimation);
    };

    animationId = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`squares-canvas ${className}`}
    />
  );
};

export default Squares;
