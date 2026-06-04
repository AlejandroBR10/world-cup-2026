import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Sede } from "../data/sede";
import { useWeather } from "../hooks/useWeather";

// Fix Leaflet icon en Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface SedeModalProps {
  sede: Sede;
  onClose: () => void;
}

export default function SedeModal({ sede, onClose }: SedeModalProps) {
  const { weather, loading } = useWeather(sede.lat, sede.lng);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="sede-modal-backdrop" onClick={onClose}>
      <div className="sede-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          className="sede-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Imagen hero */}
        <div className="sede-modal__hero">
          <img
            src={sede.imagen}
            alt={sede.estadio}
            className="sede-modal__hero-img"
          />
          <div className="sede-modal__hero-overlay" />
          <div className="sede-modal__hero-info">
            <span className="sede-modal__country">{sede.pais}</span>
            <h2 className="sede-modal__city">{sede.ciudad}</h2>
            <p className="sede-modal__stadium">{sede.estadio}</p>
          </div>
        </div>

        {/* Contenido */}
        <div className="sede-modal__body">
          {/* Stats */}
          <div className="sede-modal__stats">
            <div className="sede-modal__stat">
              <span className="sede-modal__stat-value">
                {sede.capacidad.toLocaleString("es-MX")}
              </span>
              <span className="sede-modal__stat-label">Capacidad</span>
            </div>
            <div className="sede-modal__stat">
              <span className="sede-modal__stat-value">
                {sede.partidos.length}
              </span>
              <span className="sede-modal__stat-label">Partidos</span>
            </div>
            {!loading && weather && (
              <>
                <div className="sede-modal__stat">
                  <span className="sede-modal__stat-value">
                    {weather.icon} {weather.temp}°C
                  </span>
                  <span className="sede-modal__stat-label">
                    {weather.description}
                  </span>
                </div>
                <div className="sede-modal__stat">
                  <span className="sede-modal__stat-value">
                    💨 {weather.windspeed}
                  </span>
                  <span className="sede-modal__stat-label">km/h viento</span>
                </div>
                <div className="sede-modal__stat">
                  <span className="sede-modal__stat-value">
                    💧 {weather.humidity}%
                  </span>
                  <span className="sede-modal__stat-label">Humedad</span>
                </div>
              </>
            )}
          </div>

          {/* Descripción */}
          <p className="sede-modal__desc">{sede.descripcion}</p>

          {/* Partidos */}
          <div className="sede-modal__section">
            <h3 className="sede-modal__section-title">Partidos</h3>
            {sede.partidos.map((p, i) => (
              <div key={i} className="sede-modal__match">
                <span className="sede-modal__match-phase">{p.fase}</span>
                <span className="sede-modal__match-date">{p.fecha}</span>
              </div>
            ))}
          </div>

          {/* Mapa */}
          <div className="sede-modal__section">
            <h3 className="sede-modal__section-title">Ubicación</h3>
            <div className="sede-modal__map">
              <MapContainer
                center={[sede.lat, sede.lng]}
                zoom={14}
                className="sede-modal__map-container"
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution="&copy; OpenStreetMap"
                />
                <Marker position={[sede.lat, sede.lng]} icon={redIcon}>
                  <Popup>{sede.estadio}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
