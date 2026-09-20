import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./CursorTrail.module.css";

const TRAIL_LENGTH = 3;
const HEAD_RADIUS = 6;
const COLOR = "#5b3fa0";

interface Point {
  x: number;
  y: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouse = useRef<Point>({ x: -100, y: -100 });
  const started = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!started.current) {
        started.current = true;
        pointsRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({
          x: e.clientX,
          y: e.clientY,
        }));
      }
      canvas.style.opacity = "1";
    };
    const handleLeave = () => {
      canvas.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleMove);

    let frame: number;
    const draw = () => {
      const points = pointsRef.current;
      if (started.current) {
        points.push({ x: mouse.current.x, y: mouse.current.y });
        while (points.length > TRAIL_LENGTH) points.shift();
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.strokeStyle = COLOR;
      ctx.fillStyle = COLOR;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < points.length - 1; i++) {
        const taper = (i + 1) / points.length;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.lineWidth = HEAD_RADIUS * 2 * taper;
        ctx.stroke();
      }

      if (started.current) {
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, HEAD_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    // Without this, a hot-reload leaves the old loop running and edits appear to do nothing.
    import.meta.hot?.dispose(() => cancelAnimationFrame(frame));

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return createPortal(
    <canvas
      ref={canvasRef}
      className={styles.cursorLayer}
      aria-hidden="true"
    />,
    document.body,
  );
}
