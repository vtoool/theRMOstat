import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENAQ_API_KEY;

  const response = await fetch(
    "https://api.openaq.org/v3/locations?bbox=28.72,46.93,28.98,47.09&parameters_id=2",
    {
      headers: {
        "X-API-Key": apiKey ?? "",
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch from OpenAQ" },
      { status: response.status }
    );
  }

  const json = await response.json();

  const features = (json.results ?? []).map((location: {
    name?: string;
    coordinates?: { latitude?: number; longitude?: number };
    latest?: { V?: { value?: number } };
  }) => {
    const pm25 =
      location?.latest?.V?.value ?? null;

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          location.coordinates?.longitude ?? 0,
          location.coordinates?.latitude ?? 0,
        ],
      },
      properties: {
        name: location.name ?? "Unknown Sensor",
        pm25,
      },
    };
  });

  return NextResponse.json({
    type: "FeatureCollection",
    features,
  });
}