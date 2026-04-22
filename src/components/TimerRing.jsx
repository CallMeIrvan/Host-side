import React from 'react';

export default function TimerRing({ timeLeft, maxTime, size = 120 }) {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const pct = maxTime > 0 ? timeLeft / maxTime : 0;
  const offset = circ * (1 - pct);
  const strokeColor = timeLeft <= 5 ? '#e63946' : timeLeft <= 10 ? '#f97316' : '#f5c518';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={strokeColor} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
      </svg>
      <div
        className="absolute text-center font-title"
        style={{ fontSize: '2.2rem', color: strokeColor, textShadow: `0 0 20px ${strokeColor}80` }}
      >
        {String(timeLeft).padStart(2, '0')}
      </div>
    </div>
  );
}
