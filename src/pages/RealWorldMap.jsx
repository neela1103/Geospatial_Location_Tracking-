import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const RealWorldMap = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position: London
  const [center, setCenter] = useState([51.505, -0.09]); // Default map center: London

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

  const bounds = [
    [-90, -180], // Southwest corner
    [90, 180], // Northeast corner
  ];

  return (
    <MapContainer
    //   bounds={bounds}
      center={center} // Center the map dynamically
      zoom={13}
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
