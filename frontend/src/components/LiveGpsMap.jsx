import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';

export const LiveGpsMap = ({
  pickupLocation = 'Karnal Farm, Haryana',
  destinationLocation = 'Azadpur Mandi, Delhi',
  currentLocation = 'Panipat Toll Plaza (NH-44)',
  currentLat = 29.3909,
  currentLng = 76.9635,
  pickupLat = 29.6857,
  pickupLng = 76.9905,
  destLat = 28.7159,
  destLng = 77.1789,
  status = 'IN_TRANSIT',
  vehicleNumber = 'HR-05-AB-1234',
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Only initialize map if window.L (Leaflet) is available
    if (!window.L || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = window.L.map(mapContainerRef.current, {
      center: [currentLat, currentLng],
      zoom: 9,
      zoomControl: false,
    });

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Custom Icons using Leaflet divIcon
    const createMarkerIcon = (color, emoji) => {
      return window.L.divIcon({
        className: 'custom-gps-marker',
        html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white;">${emoji}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    const pickupMarker = window.L.marker([pickupLat, pickupLng], {
      icon: createMarkerIcon('#059669', '🌾'),
    }).addTo(map).bindPopup(`<b>Farm Pickup:</b><br/>${pickupLocation}`);

    const destMarker = window.L.marker([destLat, destLng], {
      icon: createMarkerIcon('#2563EB', '🏢'),
    }).addTo(map).bindPopup(`<b>Destination:</b><br/>${destinationLocation}`);

    const vehicleMarker = window.L.marker([currentLat, currentLng], {
      icon: createMarkerIcon('#D97706', '🚚'),
    }).addTo(map).bindPopup(`<b>Vehicle:</b> ${vehicleNumber}<br/><b>Current Location:</b> ${currentLocation}`);

    // Route polyline connecting points
    const latlngs = [
      [pickupLat, pickupLng],
      [currentLat, currentLng],
      [destLat, destLng],
    ];
    const polyline = window.L.polyline(latlngs, {
      color: '#059669',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.8,
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
    };
  }, [currentLat, currentLng, pickupLat, pickupLng, destLat, destLng, currentLocation, destinationLocation, pickupLocation, vehicleNumber]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-bold text-slate-800">Live GPS Telemetry</span>
          <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[10px]">
            {status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 font-medium text-[11px]">
          <span className="flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-amber-600" />
            <span>{vehicleNumber}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>ETA: 2h 15m</span>
          </span>
        </div>
      </div>

      {/* Leaflet Container */}
      <div ref={mapContainerRef} className="h-64 w-full relative"></div>

      {/* Waypoint details */}
      <div className="p-3 bg-white grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs border-t border-slate-100">
        <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-700 uppercase">Origin (Farm)</p>
          <p className="font-semibold text-slate-800 truncate">{pickupLocation}</p>
        </div>
        <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
          <p className="text-[10px] font-bold text-amber-700 uppercase">Current Position</p>
          <p className="font-semibold text-slate-800 truncate">{currentLocation}</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-100">
          <p className="text-[10px] font-bold text-blue-700 uppercase">Destination (Mandi)</p>
          <p className="font-semibold text-slate-800 truncate">{destinationLocation}</p>
        </div>
      </div>
    </div>
  );
};
