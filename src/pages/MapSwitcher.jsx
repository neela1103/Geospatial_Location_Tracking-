import React, { useState } from "react";
import { Button, Stack, Typography, Box } from "@mui/material";

const MapSwitcher = ({ children }) => {
  const [currentMap, setCurrentMap] = useState("fictional");

  const handleSwitch = (mapType) => {
    setCurrentMap(mapType);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#333",
          marginBottom: "30px",
        }}
      >
        {currentMap === "fictional"
          ? "Fictional Map Tracking"
          : "Real-World Map Tracking"}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          fontStyle: "italic",
          color: "dimgray",
        }}
      >
        {currentMap === "fictional" ? (
          <>
            This is the tracking route of <b>ZIRN</b>, featuring beautiful and
            adventurous tracking points!
          </>
        ) : (
          "This is Real World Map showing your current location"
        )}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color={currentMap === "fictional" ? "primary" : "secondary"}
          onClick={() => handleSwitch("fictional")}
        >
          Fictional Map
        </Button>
        <Button
          variant="contained"
          color={currentMap === "realworld" ? "primary" : "secondary"}
          onClick={() => handleSwitch("realworld")}
        >
          Real-World Map
        </Button>
      </Stack>

      <Box
        sx={{
          width: "80%",
          //   maxWidth: "600px",
          minHeight: "300px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {currentMap === "fictional" ? children[0] : children[1]}
      </Box>
    </Box>
  );
};

export default MapSwitcher;
