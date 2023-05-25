import React, { useState } from "react";

import Fab from "@mui/material/Fab";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const Menu = ({ isPaused, handlePause }) => {
  const [changeSound, setChangeSound] = useState(false);

  const soundStyle = changeSound ? "visible" : "hidden";

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "10000",
        }}
        onClick={handlePause}
      >
        {isPaused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: "10000",
        }}
        onClick={() => {
          setChangeSound(!changeSound);
        }}
      >
        <VolumeUpOutlinedIcon />
      </Fab>
      <audio
        controls
        autoPlay
        style={{
          position: "fixed",
          bottom: "90px",
          right: "90px",
          zIndex: "10000",
          visibility: soundStyle,
        }}
      >
        <source src="fluffy.mp3" type="audio/mpeg" />
      </audio>

      <Dialog open={isPaused}>
        <DialogTitle>Está em pausa!</DialogTitle>
      </Dialog>
    </>
  );
};

export default Menu;
