import { useCountdown } from "../hooks/useCountDown";
import CountdownUnit from "./CountdownUnit";
import HeroBackground from "./Herobackground";
import ShareButton from "./ShareButton";

// ─── Flag SVGs ───────────────────────────────────────
function FlagUSA() {
  return (
    <svg viewBox="0 0 60 40" className="flag-svg" aria-label="Estados Unidos">
      {/* Stripes */}
      {[...Array(13)].map((_, i) => (
        <rect
          key={i}
          x="0"
          y={i * (40 / 13)}
          width="60"
          height={40 / 13}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      {/* Canton */}
      <rect x="0" y="0" width="24" height={40 * (7 / 13)} fill="#3C3B6E" />
      {/* Stars (simplified grid) */}
      {[...Array(5)].map((_, row) =>
        [...Array(row % 2 === 0 ? 6 : 5)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={row % 2 === 0 ? 2 + col * 4 : 4 + col * 4}
            cy={2.2 + row * 2.8}
            r={0.7}
            fill="#FFFFFF"
          />
        )),
      )}
    </svg>
  );
}

function FlagMEX() {
  return (
    <svg viewBox="0 0 60 40" className="flag-svg" aria-label="México">
      <rect x="0" y="0" width="20" height="40" fill="#006847" />
      <rect x="20" y="0" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" y="0" width="20" height="40" fill="#CE1126" />
      {/* Eagle (simplified emblem) */}
      <ellipse cx="30" cy="20" rx="5" ry="6" fill="#8B6914" opacity="0.85" />
      <circle cx="30" cy="16" r="3" fill="#5C4A1E" opacity="0.9" />
      <path
        d="M25 22 Q30 28 35 22"
        stroke="#5C4A1E"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

function FlagCAN() {
  return (
    <svg viewBox="0 0 60 40" className="flag-svg" aria-label="Canadá">
      <rect x="0" y="0" width="60" height="40" fill="#FFFFFF" />
      <rect x="0" y="0" width="15" height="40" fill="#FF0000" />
      <rect x="45" y="0" width="15" height="40" fill="#FF0000" />
      {/* Maple leaf (simplified) */}
      <path
        d="M30 6 L32 14 L40 13 L35 18 L38 26 L30 22 L22 26 L25 18 L20 13 L28 14 Z"
        fill="#FF0000"
      />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────
export default function Countdown() {
  const { days, hours, minutes, seconds, over } = useCountdown();
  const urgent = days < 30;

  return (
    <div className="countdown-root">
      <HeroBackground />

      <div className="countdown-glow countdown-glow--top" />
      <div className="countdown-glow countdown-glow--bottom" />

      {/* Flags */}
      <div className="countdown-flags">
        <div className="flag-item">
          <FlagUSA />
          <span className="flag-label">EE.UU.</span>
        </div>
        <div className="flag-divider" />
        <div className="flag-item">
          <FlagMEX />
          <span className="flag-label">México</span>
        </div>
        <div className="flag-divider" />
        <div className="flag-item">
          <FlagCAN />
          <span className="flag-label">Canadá</span>
        </div>
      </div>

      <h1 className="countdown-title">MUNDIAL FIFA 2026</h1>
      <p className="countdown-subtitle">CUENTA REGRESIVA OFICIAL</p>

      {over ? (
        <p className="countdown-over">⚽ ¡El Mundial ha comenzado!</p>
      ) : (
        <div className="countdown-grid">
          <CountdownUnit
            value={days}
            label="Días"
            width={days >= 100 ? 3 : 2}
            urgent={urgent}
          />
          <span className="countdown-sep">:</span>
          <CountdownUnit value={hours} label="Horas" />
          <span className="countdown-sep">:</span>
          <CountdownUnit value={minutes} label="Minutos" />
          <span className="countdown-sep">:</span>
          <CountdownUnit value={seconds} label="Segundos" />
        </div>
      )}

      <p className="countdown-date">
        Inicio: 11 de junio de 2026 · EE.UU., México y Canadá
      </p>
      <div className="countdown-badge">
        {over
          ? "¡El Mundial ha comenzado!"
          : days === 0
            ? "¡Hoy comienza el Mundial!"
            : days === 1
              ? "Falta 1 día"
              : `Faltan ${days} días`}
      </div>
      <ShareButton days={days} hours={hours} minutes={minutes} />
    </div>
  );
}
