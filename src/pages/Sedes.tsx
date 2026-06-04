import { useState } from "react";
import { SEDES, PAISES, type Sede, type PaisFilter } from "../data/sede";
import SedeCard from "../components/SedeCard";
import SedeModal from "../components/SedeModal";

const FLAG: Record<string, string> = {
  Todos: "🌎",
  México: "🇲🇽",
  "EE.UU.": "🇺🇸",
  Canadá: "🇨🇦",
};

export default function Sedes() {
  const [filtro, setFiltro] = useState<PaisFilter>("Todos");
  const [selected, setSelected] = useState<Sede | null>(null);

  const sedesFiltradas =
    filtro === "Todos" ? SEDES : SEDES.filter((s) => s.pais === filtro);

  return (
    <div className="sedes-root">
      {/* Header */}
      <div className="sedes-header">
        <p className="sedes-header__pre">MUNDIAL FIFA 2026</p>
        <h1 className="sedes-header__title">Sedes</h1>
        <p className="sedes-header__sub">
          {SEDES.length} estadios · 3 países · 1 Copa del Mundo
        </p>
      </div>

      {/* Filtros */}
      <div className="sedes-filters">
        {PAISES.map((pais) => (
          <button
            key={pais}
            className={`sedes-filter-btn ${filtro === pais ? "sedes-filter-btn--active" : ""}`}
            onClick={() => setFiltro(pais)}
          >
            <span>{FLAG[pais]}</span>
            {pais}
          </button>
        ))}
      </div>

      {/* Contador */}
      <p className="sedes-count">
        {sedesFiltradas.length} {sedesFiltradas.length === 1 ? "sede" : "sedes"}
        {filtro !== "Todos" ? ` en ${filtro}` : ""}
      </p>

      {/* Grid */}
      <div className="sedes-grid">
        {sedesFiltradas.map((sede) => (
          <SedeCard
            key={sede.id}
            sede={sede}
            onClick={() => setSelected(sede)}
          />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <SedeModal sede={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
