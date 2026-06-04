import type { Sede } from "../data/sede";
import { useWeather } from "../hooks/useWeather";

interface SedeCardProps {
  sede: Sede;
  onClick: () => void;
}

export default function SedeCard({ sede, onClick }: SedeCardProps) {
  const { weather, loading } = useWeather(sede.lat, sede.lng);

  return (
    <div className="sede-card" onClick={onClick}>
      {/* Imagen */}
      <div className="sede-card__img-wrap">
        <img src={sede.imagen} alt={sede.estadio} className="sede-card__img" />
        <div className="sede-card__img-overlay" />

        {/* País badge */}
        <div className="sede-card__country">{sede.pais}</div>

        {/* Clima */}
        <div className="sede-card__weather">
          {loading ? (
            <span className="sede-card__weather-loading">···</span>
          ) : weather ? (
            <>
              <span>{weather.icon}</span>
              <span className="sede-card__weather-temp">{weather.temp}°C</span>
            </>
          ) : null}
        </div>

        {/* Hover overlay con descripción */}
        <div className="sede-card__hover-overlay">
          <p className="sede-card__hover-desc">{sede.descripcion}</p>
          <span className="sede-card__hover-cta">Ver detalle →</span>
        </div>
      </div>

      {/* Info */}
      <div className="sede-card__body">
        <h3 className="sede-card__city">{sede.ciudad}</h3>
        <p className="sede-card__stadium">{sede.estadio}</p>
        <div className="sede-card__stats">
          <div className="sede-card__stat">
            <span className="sede-card__stat-value">
              {sede.capacidad.toLocaleString("es-MX")}
            </span>
            <span className="sede-card__stat-label">Capacidad</span>
          </div>
          <div className="sede-card__stat">
            <span className="sede-card__stat-value">
              {sede.partidos.length}
            </span>
            <span className="sede-card__stat-label">Partidos</span>
          </div>
          {weather && (
            <div className="sede-card__stat">
              <span className="sede-card__stat-value">{weather.humidity}%</span>
              <span className="sede-card__stat-label">Humedad</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
