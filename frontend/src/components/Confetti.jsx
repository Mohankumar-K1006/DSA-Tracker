import { useEffect, useRef } from 'react';

export default function Confetti() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const colors = ['#6366f1','#06b6d4','#22c55e','#f59e0b','#ef4444','#8b5cf6','#ec4899'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + '%';
      c.style.top = '-10px';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = Math.random() * 0.5 + 's';
      c.style.animationDuration = (1 + Math.random()) + 's';
      ref.current.appendChild(c);
    }
  }, []);
  return <div className="confetti-container" ref={ref} />;
}
