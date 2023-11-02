import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";

import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import React, { useState } from "react";

const Menu = ({ isPaused, handlePause }) => {
  const [changeSound, setChangeSound] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const soundStyle = changeSound ? "visible" : "hidden";

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        style={{
          zIndex: "10000",
        }}
      >
        <SpeedDialAction
          icon={isPaused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
          tooltipTitle="Pause"
          onClick={handlePause}
        />
        <SpeedDialAction
          icon={<VolumeUpOutlinedIcon />}
          tooltipTitle="Music"
          onClick={() => setChangeSound(!changeSound)}
        />
      </SpeedDial>

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
