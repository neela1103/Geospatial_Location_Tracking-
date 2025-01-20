import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// Fix for the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const RealWorldMap = () => {
  const [position, setPosition] = useState([28.6139, 77.209]); // Default position: India
  const [center, setCenter] = useState([28.6139, 77.209]); // Default map center: India

  useEffect(() => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    // Set the initial center of the map to the user's current location
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        setCenter([latitude, longitude]);
      },
      () => {
        alert(
          "Unable to retrieve your location. Defaulting to a fallback location."
        );
      }
    );

    // Watch the user's location for real-time updates
    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]); // Update marker position dynamically
      },
      () => {
        alert("Unable to retrieve location updates");
      }
    );

    // Cleanup geolocation watcher on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <MapContainer
      center={center} // Center the map dynamically
      zoom={10}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Marker for the user's position */}
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default RealWorldMap;
