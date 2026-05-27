import { NextResponse } from "next/server";

const CHISINAU_SECTORS = [
  { name: "Centru", lat: 47.0105, lon: 28.8638 },
  { name: "Botanica", lat: 46.98, lon: 28.86 },
  { name: "Rîșcani", lat: 47.04, lon: 28.85 },
  { name: "Ciocana", lat: 47.03, lon: 28.89 },
  { name: "Buiucani", lat: 47.03, lon: 28.81 },
  { name: "Telecentru", lat: 46.995, lon: 28.825 },
  { name: "Poșta Veche", lat: 47.06, lon: 28.845 },
  { name: "Sculeanca", lat: 47.04, lon: 28.815 },
];

interface OpenWeatherAirPollutionResponse {
  list: Array<{
    components: {
      pm2_5: number;
    };
  }>;
}

export async function GET() {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  const requests = CHISINAU_SECTORS.map(({ name, lat, lon }) =>
    fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => res.json() as Promise<OpenWeatherAirPollutionResponse>)
      .then((data) => {
        const pm25 = data.list?.[0]?.components?.pm2_5 ?? 0;
        return {
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [lon, lat],
          },
          properties: {
            name,
            pm25,
          },
        };
      })
      .catch(() => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [lon, lat],
        },
        properties: {
          name,
          pm25: 0,
        },
      }))
  );

  const features = await Promise.all(requests);

  return NextResponse.json({ type: "FeatureCollection", features });
}