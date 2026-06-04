export interface Partido {
  fase: string;
  fecha: string;
}

export interface Sede {
  id: string;
  ciudad: string;
  pais: "México" | "EE.UU." | "Canadá";
  estadio: string;
  capacidad: number;
  imagen: string;
  lat: number;
  lng: number;
  descripcion: string;
  partidos: Partido[];
}

export const SEDES: Sede[] = [
  {
    id: "cdmx",
    ciudad: "Ciudad de México",
    pais: "México",
    estadio: "Estadio Azteca",
    capacidad: 87523,
    imagen: "/estadios/estadioAzteca.jpg",
    lat: 19.3029,
    lng: -99.1505,
    descripcion:
      "El Estadio Azteca es el único en el mundo en haber albergado dos finales de Copa del Mundo (1970 y 1986). Con capacidad para más de 87,000 espectadores, es uno de los recintos más icónicos del fútbol mundial.",
    partidos: [
      { fase: "Fase de Grupos", fecha: "12 jun 2026" },
      { fase: "Fase de Grupos", fecha: "15 jun 2026" },
      { fase: "Octavos de Final", fecha: "1 jul 2026" },
    ],
  },
  {
    id: "guadalajara",
    ciudad: "Guadalajara",
    pais: "México",
    estadio: "Estadio Akron",
    capacidad: 49850,
    imagen: "/estadios/estadioAkron.jpg",
    lat: 20.6817,
    lng: -103.4666,
    descripcion:
      "El Estadio Akron, casa de las Chivas del Guadalajara, es considerado uno de los estadios más modernos de América Latina. Su diseño inspirado en la arquitectura prehispánica lo hace único en el continente.",
    partidos: [
      { fase: "Fase de Grupos", fecha: "13 jun 2026" },
      { fase: "Fase de Grupos", fecha: "17 jun 2026" },
      { fase: "Fase de Grupos", fecha: "21 jun 2026" },
    ],
  },
  {
    id: "monterrey",
    ciudad: "Monterrey",
    pais: "México",
    estadio: "Estadio BBVA",
    capacidad: 53500,
    imagen: "/estadios/estadioBBVA.jpg",
    lat: 25.6693,
    lng: -100.2438,
    descripcion:
      "El Estadio BBVA, hogar de los Rayados de Monterrey, fue inaugurado en 2015 y es uno de los estadios más modernos de México. Su ubicación con vista a la Sierra Madre lo convierte en uno de los más espectaculares del mundo.",
    partidos: [
      { fase: "Fase de Grupos", fecha: "14 jun 2026" },
      { fase: "Fase de Grupos", fecha: "18 jun 2026" },
      { fase: "Octavos de Final", fecha: "2 jul 2026" },
    ],
  },
];

export const PAISES = ["Todos", "México", "EE.UU.", "Canadá"] as const;
export type PaisFilter = (typeof PAISES)[number];
