"use client";

import { Map, Source, Layer, NavigationControl } from "react-map-gl/mapbox";

interface ActiveLayers {
  canopy: boolean;
  heat: boolean;
  airQuality: boolean;
  incidents: boolean;
}

interface MapComponentProps {
  activeLayers: ActiveLayers;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapComponent({ activeLayers }: MapComponentProps) {
  return (
    <Map
      initialViewState={{
        latitude: 47.0105,
        longitude: 28.8638,
        zoom: 12,
      }}
      style={{ width: "100%", height: "100%" }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v11"
      attributionControl={false}
    >
      <NavigationControl position="bottom-right" />
      <Source id="canopy-source" type="geojson" data="/data/canopy.geojson">
        <Layer
          id="canopy-layer"
          type="fill"
          paint={{
            "fill-color": "#10B981",
            "fill-opacity": 0.4,
          }}
          layout={{
            visibility: activeLayers.canopy ? "visible" : "none",
          }}
        />
      </Source>
      <Source id="air-quality-source" type="geojson" data="/api/air">
        <Layer
          id="air-quality-layer"
          type="circle"
          paint={{
            "circle-radius": 8,
            "circle-color": [
              "case",
              ["<", ["get", "pm25"], 12],
              "#38BDF8",
              ["<", ["get", "pm25"], 35],
              "#FBBF24",
              "#EF4444",
            ],
            "circle-stroke-color": "#FFFFFF",
            "circle-stroke-width": 2,
          }}
          layout={{
            visibility: activeLayers.airQuality ? "visible" : "none",
          }}
        />
      </Source>
    </Map>
  );
}