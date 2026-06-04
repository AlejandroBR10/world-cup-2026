import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { Sede } from "../data/sede";

// Fix Leaflet default icon en Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Icono personalizado rojo para la sede activa
const activeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Mueve el mapa a la sede activa
function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 12, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

interface SedeMapProps {
  sedes: Sede[];
  activeSede: Sede;
  onSelect: (sede: Sede) => void;
}

export default function SedeMap({ sedes, activeSede, onSelect }: SedeMapProps) {
  return (
    <div className="sede-map">
      <MapContainer
        center={[activeSede.lat, activeSede.lng]}
        zoom={12}
        className="sede-map__container"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <FlyTo lat={activeSede.lat} lng={activeSede.lng} />

        {sedes.map((sede) => (
          <Marker
            key={sede.id}
            position={[sede.lat, sede.lng]}
            icon={sede.id === activeSede.id ? activeIcon : defaultIcon}
            eventHandlers={{ click: () => onSelect(sede) }}
          >
            <Popup>
              <div style={{ fontFamily: "sans-serif", minWidth: 140 }}>
                <strong>{sede.estadio}</strong>
                <br />
                {sede.ciudad}
                <br />
                <small>
                  {sede.capacidad.toLocaleString("es-MX")} espectadores
                </small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
