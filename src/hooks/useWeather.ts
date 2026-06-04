import { useState, useEffect } from "react";

interface Weather {
  temp: number;
  humidity: number;
  windspeed: number;
  description: string;
  icon: string;
}

const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: "Despejado", icon: "☀️" },
  1: { description: "Mayormente despejado", icon: "🌤️" },
  2: { description: "Parcialmente nublado", icon: "⛅" },
  3: { description: "Nublado", icon: "☁️" },
  45: { description: "Neblina", icon: "🌫️" },
  48: { description: "Neblina con hielo", icon: "🌫️" },
  51: { description: "Llovizna ligera", icon: "🌦️" },
  61: { description: "Lluvia ligera", icon: "🌧️" },
  63: { description: "Lluvia moderada", icon: "🌧️" },
  65: { description: "Lluvia intensa", icon: "🌧️" },
  80: { description: "Chubascos", icon: "🌦️" },
  95: { description: "Tormenta", icon: "⛈️" },
};

export function useWeather(lat: number, lng: number) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&timezone=auto`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const c = data.current;
        const code = c.weathercode as number;
        const meta = WMO_CODES[code] ?? { description: "Variable", icon: "🌡️" };
        setWeather({
          temp: Math.round(c.temperature_2m),
          humidity: c.relative_humidity_2m,
          windspeed: Math.round(c.windspeed_10m),
          description: meta.description,
          icon: meta.icon,
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [lat, lng]);

  return { weather, loading, error };
}
