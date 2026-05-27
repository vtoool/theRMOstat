"use client";

import { Map, Source, Layer, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const canopyLayerStyle = {
  id: "canopy-fill",
  type: "fill" as const,
  paint: {
    "fill-color": "#10B981",
    "fill-opacity": 0.4,
  },
};

export default function MapComponent() {
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
      <Source
        id="canopy-source"
        type="geojson"
        data="/data/canopy.geojson"
      >
        <Layer {...canopyLayerStyle} />
      </Source>
    </Map>
  );
}
