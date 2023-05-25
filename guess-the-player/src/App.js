import React, { useState, useEffect } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

const players = ["Aimar", "Saviola", "Cardozo"];
let index = Math.floor(Math.random() * players.length);

function App() {
  const [stopImage, setStopImage] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const [value, setValue] = useState(" ");

  let classes = stopImage || openModal ? `App-logo` : `App-logo animate-logo`;

  const [selectedPlayer, setSelectedPlayer] = useState(players[index]);

  const handleClose = () => {
    setopenModal(false);

    players.splice(index, 1);

    if (players.length === 0) {
      setopenModal(true);
    }

    const newIndex = Math.floor(Math.random() * players.length);
    console.log("newIndex", newIndex);
    setSelectedPlayer(players[newIndex]);

    index = newIndex;
  };

  useEffect(() => {
    console.log("value", value);
    console.log("selectedPlayer", selectedPlayer);

    if (value === selectedPlayer) {
      setopenModal(true);
    }
  }, [value]);

  return (
    <Box className="App-header">
      {players.length > 0 ? (
        <img src={`../${selectedPlayer}.jpeg`} className={classes} alt="logo" />
      ) : (
        <img src={`../campeao.jpeg`} className={classes} alt="logo" />
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
          style={{ backgroundColor: "white" }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          disablePortal
          id="combo-box-demo"
          options={players}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Player" />}
        />
        <Dialog selectedValue={""} open={openModal} onClose={handleClose}>
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
