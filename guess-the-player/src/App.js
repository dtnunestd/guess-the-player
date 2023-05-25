import React, { useState, useEffect } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

const players = [
  "Moreira",
  "Quim",
  "Julio Cesar",
  "Moretto",
  "Aimar",
  "Saviola",
  "Cardozo",
];
let index = Math.floor(Math.random() * players.length);

function App() {
  const [stopImage, setStopImage] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [blurLevel, setBlurLevel] = useState(50);

  const [value, setValue] = useState("Player");

  const [selectedPlayer, setSelectedPlayer] = useState(players[index]);

  useEffect(() => {
    const blurTimer = setInterval(() => {
      if (blurLevel > 0) {
        setBlurLevel((prevBlur) => prevBlur - 1);
      }
    }, 300);

    return () => {
      clearInterval(blurTimer);
    };
  }, [blurLevel]);

  const handleClose = () => {
    setopenModal(false);

    players.splice(index, 1);

    if (players.length === 0) {
      setopenModal(true);
    }

    const newIndex = Math.floor(Math.random() * players.length);
    setSelectedPlayer(players[newIndex]);
    setValue("");

    index = newIndex;
    setBlurLevel(50);
  };

  useEffect(() => {
    if (value === selectedPlayer) {
      setBlurLevel(0);
      setopenModal(true);
    }
  }, [value]);

  return (
    <Box className="App-header">
      {players.length > 0 ? (
        <img
          src={`../${selectedPlayer}.jpeg`}
          className="App-logo"
          style={{ filter: `blur(${blurLevel}px)` }}
          alt="logo"
        />
      ) : (
        <img src={`../campeao.jpeg`} className="App-logo" alt="logo" />
      )}
      <Stack spacing={2}>
        <p>Guess the player</p>
        <Button
          variant="contained"
          onClick={() => {
            setStopImage(!stopImage);
          }}
        >
          {stopImage ? "Run image" : "Stop Image"}
        </Button>
        <Autocomplete
          size="small"
          style={{ backgroundColor: "white" }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          disablePortal
          id="size-small-outlined-multi"
          options={players}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Dialog open={openModal} onClose={handleClose}>
          <DialogTitle>
            {players.length === 0
              ? "Ganhou o jogo parabens!"
              : `Acertou! O jogador era o ${selectedPlayer}`}
          </DialogTitle>
        </Dialog>
      </Stack>
    </Box>
  );
}

export default App;
