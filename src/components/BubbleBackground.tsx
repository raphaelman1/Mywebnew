import React, { useEffect, useRef } from 'react';

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Bubble class definition
    class Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      scaleSpeed: number;
      color: string;

      constructor() {
        this.radius = Math.random() * 25 + 5; // size of 5px to 30px
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100; // start off-screen below
        this.speedY = -(Math.random() * 0.8 + 0.3); // drift upwards
        this.speedX = (Math.random() - 0.5) * 0.4; // slight sway
        this.maxOpacity = Math.random() * 0.25 + 0.05; // delicate ambient translucency
        this.opacity = 0;
        this.scaleSpeed = 0.005 + Math.random() * 0.01;
        
        // Soft gradient colors (emerald green, amber, gold, teal sky blue, matching Tanzania colors)
        const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
        const colors = isDark ? [
          'rgba(52, 211, 153, ',  // Vivid amber/emerald
          'rgba(245, 158, 11, ',  // Amber
          'rgba(56, 189, 248, ',  // Sky Blue
          'rgba(253, 224, 71, ',  // Gold yellow
          'rgba(110, 231, 183, '  // Magical Mint
        ] : [
          'rgba(27, 67, 50, ',   // Emerald
          'rgba(245, 158, 11, ',  // Amber
          'rgba(14, 165, 233, ',  // Sky Blue
          'rgba(234, 179, 8, ',   // Gold yellow
          'rgba(16, 185, 129, '   // Mint green
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Fade in as they rise, fade out as they reach the top
        if (this.y > height - 100) {
          if (this.opacity < this.maxOpacity) {
            this.opacity += 0.005;
          }
        } else if (this.y < 150) {
          this.opacity -= 0.005;
        }

        // Slight drift adjustments
        if (this.x < -20 || this.x > width + 20 || this.y < -20 || this.opacity <= 0) {
          this.reset();
        }
      }

      reset() {
        this.radius = Math.random() * 25 + 5;
        this.x = Math.random() * width;
        this.y = height + 10;
        this.speedY = -(Math.random() * 0.8 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.25 + 0.05;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        
        // Radial gradient for 3D sphere shine effect
        const gradient = context.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.1,
          this.x,
          this.y,
          this.radius
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 1.5})`);
        gradient.addColorStop(0.4, `${this.color}${this.opacity})`);
        gradient.addColorStop(1, `${this.color}${this.opacity * 0.25})`);
        
        context.fillStyle = gradient;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        
        // Bubble ring highlight
        context.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
        context.lineWidth = 0.5;
        context.stroke();
      }
    }

    // Initialize bubble army
    const bubbleCount = Math.min(Math.floor(width / 35), 45); // adaptive sizing
    const bubbles: Bubble[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = new Bubble();
      // stagger initial heights so they don't all rise together on load
      bubble.y = Math.random() * height;
      bubble.opacity = Math.random() * bubble.maxOpacity;
      bubbles.push(bubble);
    }

    // Mouse interactive force fields
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((bubble) => {
        bubble.update();

        // Mouse avoidance factor
        if (mouse.active) {
          const dx = bubble.x - mouse.x;
          const dy = bubble.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120; // 0 (weak) to 1 (strong)
            const angle = Math.atan2(dy, dx);
            bubble.x += Math.cos(angle) * force * 2.5;
            bubble.y += Math.sin(angle) * force * 2.5;
          }
        }

        bubble.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-linear-to-b from-slate-50/70 via-white/80 to-[#1b4332]/5 dark:from-[#060e0a] dark:via-[#091510] dark:to-[#040806]"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
