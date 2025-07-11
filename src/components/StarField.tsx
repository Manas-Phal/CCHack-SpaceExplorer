
import React, { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      brightness: number;
      twinklePhase: number;
    }> = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random() * 0.8 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    const createShootingStar = () => {
      if (Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 4 + 2,
          life: 0,
          maxLife: Math.random() * 60 + 40
        });
      }
    };

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw and update stars
      stars.forEach((star, index) => {
        // Twinkling effect
        star.twinklePhase += 0.02;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        
        // Slow movement
        star.x += Math.sin(time + index) * 0.1;
        star.y += Math.cos(time + index * 0.5) * 0.1;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.save();
        ctx.globalAlpha = star.brightness * twinkle;
        
        // Create star glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.4, 'rgba(147, 197, 253, 0.6)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw star center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      // Create shooting stars
      createShootingStar();

      // Draw and update shooting stars
      shootingStars.forEach((shootingStar, index) => {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life++;

        if (shootingStar.life > shootingStar.maxLife) {
          shootingStars.splice(index, 1);
          return;
        }

        const alpha = 1 - (shootingStar.life / shootingStar.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;

        // Draw trail
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.vx * 5, shootingStar.y - shootingStar.vy * 5);
        ctx.stroke();

        // Draw shooting star head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
    />
  );
};

export default StarField;
