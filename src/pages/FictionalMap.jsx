import React, { useEffect, useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";

// Bounds for the fictional map
const bounds = [
  [0, 0],
  [1000, 1000],
];

const FictionalMap = () => {
  const [userPosition, setUserPosition] = useState([500, 500]); // Initial position in the center of the fictional map
  const [watchId, setWatchId] = useState(null); // State to store the watchId

  const pointsOfInterest = [
    {
      id: 1,
      position: [400, 500],
      placeName: "Keshmiyek Falls",
      name: "Waterfall",
      description:
        "A cascading waterfall nestled in a lush forest, perfect for explorers.",
    },
    {
      id: 2,
      position: [350, 600],
      placeName: "Gondural Haven",
      name: "Campsite",
      description:
        "A great place to camp under the stars and enjoy the serenity of nature.",
    },
    {
      id: 3,
      position: [450, 660],
      placeName: "Trondhelm Peaks",
      name: "Mountain View",
      description:
        "A scenic mountain offering breathtaking views of the valley below.",
    },
    {
      id: 4,
      position: [550, 730],
      placeName: "Medovir Heights",
      name: "Mountain View",
      description:
        "A rugged mountain trail for the bold and adventurous hikers.",
    },
    {
      id: 5,
      position: [660, 760],
      placeName: "Crendyke Cliffs",
      name: "Mountain View",
      description:
        "Dramatic cliffs with stunning panoramic views of the surrounding wilderness.",
    },
  ];

  const trekkingRoute = [
    [400, 500],
    [350, 600],
    [450, 660],
    [550, 730],
    [660, 760],
  ];

  // Function to simulate geolocation tracking
  //   const trackGeolocation = () => {
  //     // Check if geolocation is available
  //     if (navigator.geolocation) {
  //       const id = navigator.geolocation.watchPosition(
  //         (position) => {
  //           const lat = position.coords.latitude;
  //           const lon = position.coords.longitude;

  //           // Simulate converting real-world coordinates to fictional map coordinates
  //           // For simplicity, assume we're mapping real-world latitude and longitude to your fictional map
  //           const fictionalPosition = [lat * 100, lon * 100]; // This is just an example conversion
  //           console.log("fictionalPosition", fictionalPosition);
  //           setUserPosition(fictionalPosition); // Update the user's position on the map
  //         },
  //         (error) => {
  //           console.log("Error getting geolocation", error);
  //         },
  //         { enableHighAccuracy: true, timeout: 5000 }
  //       );

  //       // Save the watchId in state for cleanup
  //       setWatchId(id);
  //     } else {
  //       console.log("Geolocation not supported");
  //     }
  //   };

  const scaleToBounds = (value, min, max, newMin, newMax) => {
    return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
  };
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const trackGeolocation = () => {
    const MIN_LAT = 0; // Adjust based on the real-world region
    const MAX_LAT = 90; // Adjust based on the real-world region
    const MIN_LON = 0; // Adjust based on the real-world region
    const MAX_LON = 180; // Adjust based on the real-world region

    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Scale geolocation to the fictional map bounds
          const fictionalLat = scaleToBounds(lat, MIN_LAT, MAX_LAT, 0, 1000);
          const fictionalLon = scaleToBounds(lon, MIN_LON, MAX_LON, 0, 1000);
          const fictionalPosition = [
            clamp(fictionalLat, 0, 1000),
            clamp(fictionalLon, 0, 1000),
          ];

          //   console.log("fictionalPosition:", fictionalPosition);
          setUserPosition(fictionalPosition);
        },
        (error) => {
          console.log("Error getting geolocation", error);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );

      setWatchId(id);
    } else {
      console.log("Geolocation not supported");
    }
  };

  useEffect(() => {
    // Start tracking the user's geolocation when the component mounts
    trackGeolocation();

    // Cleanup geolocation tracking on component unmount
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId); // Pass the watchId to clearWatch
      }
    };
  }, []); // No dependency array issue anymore; runs only once on mount

  return (
    <MapContainer
      center={[500, 500]}
      zoom={1}
      style={{ height: "100vh", width: "100%" }}
      crs={L.CRS.Simple} // Use a simple CRS for fictional maps
    >
      {/* Image overlay for the fictional map */}
      <ImageOverlay bounds={bounds} url="assets/fictional-map-image.jpg" />

      {/* Add markers for points of interest */}
      {/* {pointsOfInterest.map((point) => (
        <Marker key={point.id} position={point.position}>
          <Popup>
            <h3>{point.name}</h3>
            <p>{point.description}</p>
          </Popup>
        </Marker>
      ))} */}

      {pointsOfInterest.map((point, index) => (
        <CircleMarker
          key={index}
          center={point.position} // Correctly pass the coordinates
          radius={8} // Circle size
          //   color="pink"
          //   fillColor=""
          color="#7B1FA2"
          fillColor="pink"
          fillOpacity={0.7}
        >
          <Popup>
            <div
              style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}
            >
              <h2 style={{ margin: "0", color: "#4CAF50" }}>
                {point.placeName}
              </h2>
              <h4 style={{ margin: "0", color: "#FF5722" }}>{point.name}</h4>
              <p style={{ fontSize: "14px", margin: "10px 0", color: "#333" }}>
                {point.description}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {/* Trekking route */}
      <Polyline positions={trekkingRoute} color="blue" />

      {/* Add a marker for the user's current position */}
      {/* <Marker position={userPosition}>
        <Popup>Current Position: {userPosition.join(", ")}</Popup>
      </Marker> */}
      <Marker position={userPosition}>
        <Popup>
          <h2 style={{ margin: "0", color: "#4CAF50" }}>You are here</h2>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default FictionalMap;
