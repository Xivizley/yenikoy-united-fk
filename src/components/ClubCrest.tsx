import React from 'react';

interface ClubCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ClubCrest: React.FC<ClubCrestProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-9',
    md: 'w-12 h-14',
    lg: 'w-24 h-28',
    xl: 'w-36 h-40',
  };

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 120 140"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]"
        aria-label="Yeniköy United FK Resmi Arması"
      >
        <defs>
          <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcedba" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#997514" />
          </linearGradient>
          <linearGradient id="crestBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a4b8c" />
            <stop offset="100%" stopColor="#071326" />
          </linearGradient>
        </defs>
        {/* Shield Path */}
        <path
          d="M 60 5 Q 110 5 112 50 C 112 95 60 135 60 135 C 60 135 8 95 8 50 Q 10 5 60 5 Z"
          fill="url(#crestBlue)"
          stroke="url(#crestGold)"
          strokeWidth="4"
        />
        {/* Inner Shield Border */}
        <path
          d="M 60 14 Q 100 14 102 52 C 102 88 60 123 60 123 C 60 123 18 88 18 52 Q 20 14 60 14 Z"
          fill="none"
          stroke="rgba(212,175,55,0.4)"
          strokeWidth="1.5"
        />
        {/* Soccer Ball Emblem in Center */}
        <circle cx="60" cy="55" r="22" fill="#ffffff" stroke="#0b1d3a" strokeWidth="2" />
        <polygon points="60,42 68,48 65,58 55,58 52,48" fill="#0b1d3a" />
        <line x1="60" y1="42" x2="60" y2="33" stroke="#0b1d3a" strokeWidth="2" />
        <line x1="68" y1="48" x2="77" y2="44" stroke="#0b1d3a" strokeWidth="2" />
        <line x1="65" y1="58" x2="72" y2="67" stroke="#0b1d3a" strokeWidth="2" />
        <line x1="55" y1="58" x2="48" y2="67" stroke="#0b1d3a" strokeWidth="2" />
        <line x1="52" y1="48" x2="43" y2="44" stroke="#0b1d3a" strokeWidth="2" />
        {/* Star */}
        <polygon
          points="60,20 62,25 67,25 63,28 65,33 60,30 55,33 57,28 53,25 58,25"
          fill="#f3e5ab"
        />
        {/* Text Banner */}
        <path d="M 22 92 Q 60 84 98 92 L 94 106 Q 60 98 26 106 Z" fill="url(#crestGold)" />
        <text
          x="60"
          y="101"
          fontFamily="'Outfit', sans-serif"
          fontSize="9"
          fontWeight="900"
          fill="#071326"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          YENİKÖY UNITED
        </text>
        <text
          x="60"
          y="117"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="7.5"
          fontWeight="800"
          fill="#f3e5ab"
          textAnchor="middle"
          letterSpacing="1"
        >
          KARACABEY • 2025
        </text>
      </svg>
    </div>
  );
};
