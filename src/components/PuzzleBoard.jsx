import React from 'react';

export default function PuzzleBoard({ revealed = [], onReveal, maxClicks = 5, disabled = false }) {
  const clicksUsed = revealed.length;

  return (
    <div
      className="absolute inset-0 grid gap-0.5"
      style={{ gridTemplateColumns: 'repeat(4,1fr)', gridTemplateRows: 'repeat(4,1fr)' }}
    >
      {Array.from({ length: 16 }, (_, i) => {
        const isRevealed = revealed.includes(i);
        return (
          <div
            key={i}
            onClick={() => {
              if (isRevealed || disabled || clicksUsed >= maxClicks) return;
              onReveal && onReveal(i);
            }}
            className={`puzzle-piece ${isRevealed ? 'revealed' : ''}`}
          />
        );
      })}
    </div>
  );
}
