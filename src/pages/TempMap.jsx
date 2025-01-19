import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const TempMap = () => {
  const [mapType, setMapType] = useState("real-world");
  const [position, setPosition] = useState([51.505, -0.09]); // Default position
  const [trekkingRoute, setTrekkingRoute] = useState([]); // Store selected trekking route

  // Example markers for virtual trekking spots
  const trekkingSpots = [
    { position: [51.505, -0.09], name: "Trek Start Point" },
    { position: [51.51, -0.1], name: "Scenic Viewpoint" },
    { position: [51.515, -0.11], name: "Rest Area" },
    { position: [51.52, -0.12], name: "Trek End Point" },
  ];

  const realWorldTileLayer =
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const fictionalTileLayer = "path/to/your/fictional/tiles/{z}/{x}/{y}.png"; // Replace with actual path

  // Geolocation tracking
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // Handle route selection for virtual trekking
  const handleSelectRoute = () => {
    const route = trekkingSpots.map((spot) => spot.position); // Example route from markers
    setTrekkingRoute(route);
  };

  return (
    <div>
      <button onClick={() => setMapType("real-world")}>Real World Map</button>
      <button onClick={() => setMapType("fictional")}>Fictional Map</button>
      <button onClick={handleSelectRoute}>Explore Trekking Route</button>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url={
            mapType === "real-world" ? realWorldTileLayer : fictionalTileLayer
          }
        />

        {/* Markers for Trekking Spots */}
        {/* {trekkingSpots.map((spot, index) => (
          <Marker key={index} position={spot.position}>
            <Popup>{spot.name}</Popup>
          </Marker>
        ))} */}

        {/* Polyline for Selected Trekking Route */}
        {trekkingRoute.length > 0 && (
          <Polyline positions={trekkingRoute} color="blue" />
        )}

        {/* Current Position Marker */}
        <Marker position={position}>
          <Popup>Your current location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TempMap;
