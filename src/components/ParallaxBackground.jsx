import React, { useEffect, useState } from 'react';

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Top Left Violet Blob */}
      <div 
        className="glow-blob" 
        style={{
          width: '500px',
          height: '500px',
          background: 'var(--accent-violet)',
          top: '-10%',
          left: '-10%',
          transform: `translateY(${scrollY * 0.12}px)`,
          opacity: 0.22
        }}
      />
      {/* Middle Right Cyan Blob */}
      <div 
        className="glow-blob" 
        style={{
          width: '600px',
          height: '600px',
          background: 'var(--accent-cyan)',
          top: '35%',
          right: '-15%',
          transform: `translateY(${scrollY * -0.08}px)`,
          opacity: 0.18
        }}
      />
      {/* Bottom Left Rose/Gold Blob */}
      <div 
        className="glow-blob" 
        style={{
          width: '500px',
          height: '500px',
          background: 'var(--accent-rose)',
          bottom: '-10%',
          left: '10%',
          transform: `translateY(${scrollY * 0.05}px)`,
          opacity: 0.15
        }}
      />
    </div>
  );
}
