import { useEffect, useRef } from "react";
import type { Ball } from "../interfaces/ball.interface";



function createBalls(): Ball[] {
  return [
    { radius: 48, opacity: 0.9, vx: 1.1, vy: 0.8, rotationSpeed: 0.012 },
    { radius: 30, opacity: 0.6, vx: -1.4, vy: 1.1, rotationSpeed: -0.018 },
    { radius: 22, opacity: 0.4, vx: 0.9, vy: -1.3, rotationSpeed: 0.022 },
    { radius: 16, opacity: 0.25, vx: -0.7, vy: -0.9, rotationSpeed: -0.03 },
    { radius: 12, opacity: 0.18, vx: 1.6, vy: 0.6, rotationSpeed: 0.025 },
  ].map((b) => ({
    ...b,
    x: Math.random() * (window.innerWidth - b.radius * 2) + b.radius,
    y: Math.random() * (window.innerHeight - b.radius * 2) + b.radius,
    rotation: Math.random() * Math.PI * 2,
  }));
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let balls: Ball[] = [];

    // ── Resize ──────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Load image ──────────────────────────────────────
    const img = new Image();
    img.src = "/ball.png";

    img.onload = () => {
      balls = createBalls();
      animate();
    };

    // Fallback: if image fails, still animate (balls invisible)
    img.onerror = () => {
      console.warn("HeroBackground: no se encontró /public/ball.png");
      balls = createBalls();
      animate();
    };

    // ── Draw one ball ────────────────────────────────────
    function drawBall(ball: Ball) {
      const { x, y, radius, rotation, opacity } = ball;

      ctx!.save();
      ctx!.globalAlpha = opacity;
      ctx!.translate(x, y);
      ctx!.rotate(rotation);

      // Soft glow behind the ball
      ctx!.shadowColor = "rgba(255,255,255,0.25)";
      ctx!.shadowBlur = radius * 1.2;

      if (img.complete && img.naturalWidth > 0) {
        ctx!.drawImage(img, -radius, -radius, radius * 2, radius * 2);
      }

      ctx!.restore();
    }

    // ── Animation loop ───────────────────────────────────
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const ball of balls) {
        // Bounce off walls
        if (ball.x - ball.radius <= 0) {
          ball.x = ball.radius;
          ball.vx = Math.abs(ball.vx);
        }
        if (ball.x + ball.radius >= canvas!.width) {
          ball.x = canvas!.width - ball.radius;
          ball.vx = -Math.abs(ball.vx);
        }
        if (ball.y - ball.radius <= 0) {
          ball.y = ball.radius;
          ball.vy = Math.abs(ball.vy);
        }
        if (ball.y + ball.radius >= canvas!.height) {
          ball.y = canvas!.height - ball.radius;
          ball.vy = -Math.abs(ball.vy);
        }

        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.rotation += ball.rotationSpeed;

        drawBall(ball);
      }

      animId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
