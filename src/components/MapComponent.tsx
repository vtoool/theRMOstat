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
          type="heatmap"
          paint={{
            "heatmap-weight": ["get", "pm25"],
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 10, 80, 15, 250],
            "heatmap-opacity": 0.5,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(56, 189, 248, 0)",
              0.2, "rgba(56, 189, 248, 0.4)",
              0.6, "rgba(251, 191, 36, 0.5)",
              1.0, "rgba(239, 68, 68, 0.6)",
            ],
          }}
          layout={{
            visibility: activeLayers.airQuality ? "visible" : "none",
          }}
        />
      </Source>
    </Map>
  );
}