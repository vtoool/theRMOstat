"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

interface ActiveLayers {
  canopy: boolean;
  heat: boolean;
  airQuality: boolean;
  incidents: boolean;
}

interface LayerToggleProps {
  label: string;
  active: boolean;
  onChange: (active: boolean) => void;
}

function LayerToggle({ label, active, onChange }: LayerToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={active}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
          active ? "bg-thermo-green" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
            active ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </div>
      <span className={`text-sm font-medium ${active ? "text-thermo-dark" : "text-gray-500"}`}>
        {label}
      </span>
    </label>
  );
}

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-thermo-surface">
      <p className="text-thermo-dark">Loading map...</p>
    </div>
  ),
});

export default function MapDashboard() {
  const [activeLayers, setActiveLayers] = useState<ActiveLayers>({
    canopy: true,
    heat: false,
    airQuality: false,
    incidents: false,
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MapComponent activeLayers={activeLayers} />
      <motion.aside
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-4 right-4 z-50 w-72 bg-white/90 backdrop-blur-md border border-[#E5E7EB] rounded-xl shadow-panel p-4"
      >
        <h2 className="text-lg font-semibold text-thermo-dark mb-4">Layers</h2>
        <div className="flex flex-col gap-4">
          <LayerToggle
            label="Tree Canopy"
            active={activeLayers.canopy}
            onChange={() => setActiveLayers((prev) => ({ ...prev, canopy: !prev.canopy }))}
          />
          <LayerToggle
            label="Urban Heat Island"
            active={activeLayers.heat}
            onChange={() => setActiveLayers((prev) => ({ ...prev, heat: !prev.heat }))}
          />
          <LayerToggle
            label="Live Air Quality"
            active={activeLayers.airQuality}
            onChange={() => setActiveLayers((prev) => ({ ...prev, airQuality: !prev.airQuality }))}
          />
          <LayerToggle
            label="Flood/Incident Alerts"
            active={activeLayers.incidents}
            onChange={() => setActiveLayers((prev) => ({ ...prev, incidents: !prev.incidents }))}
          />
        </div>
      </motion.aside>
    </div>
  );
}