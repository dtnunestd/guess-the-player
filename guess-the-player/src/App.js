import React, { useState, useEffect, wait } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

import { useTheme } from "@mui/material/styles";

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
  const [openModal, setOpenModal] = useState(false);
  const [blurLevel, setBlurLevel] = useState(50);
  const [isDisabled, setIsDisabled] = useState(false);
  const [points, setPoints] = useState(1000);
  const [isOver, setIsOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [value, setValue] = useState("Player");

  const [selectedPlayer, setSelectedPlayer] = useState(players[index]);

  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  useEffect(() => {
    const blurTimer = setInterval(() => {
      if (blurLevel > 0 && !isOver && !isPaused) {
        setBlurLevel((prevBlur) => prevBlur - 1);
        setPoints((prevPoints) => prevPoints - 1);
      }
    }, 300);

    return () => {
      clearInterval(blurTimer);
    };
  }, [blurLevel, isOver, isPaused]);

  const handleClose = () => {
    setOpenModal(false);

    players.splice(index, 1);

    if (players.length === 0) {
      setIsOver(true);
      setOpenModal(true);
    } else {
      const newIndex = Math.floor(Math.random() * players.length);
      setValue("");

      index = newIndex;
      setBlurLevel(50);

      setIsDisabled(false);

      setTimeout(() => {
        setSelectedPlayer(players[newIndex]);
      }, 100);
    }
  };

  useEffect(() => {
    if (value === selectedPlayer) {
      setBlurLevel(0);
      setOpenModal(true);
    } else if (value !== "Player" && value != "") {
      setPoints((prevPoints) => prevPoints - 50);
    }
  }, [value]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ py: 2 }}
      >
        <EmojiEventsOutlinedIcon size="" />
        <Typography variant="h5">Pontuação: {points}</Typography>
      </Stack>
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
          <Typography
            variant="h5"
            gutterBottom
            style={{ textAlign: "center", marginTop: "16px" }}
          >
            Guess the Player
          </Typography>
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={() => {
              blurLevel > 25
                ? setBlurLevel((prevBlur) => prevBlur - 25)
                : setBlurLevel(0);

              setIsDisabled(true);
            }}
          >
            Extra Help
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
          <Fab
            color="primary"
            aria-label="add"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "10000",
            }}
            onClick={() => {
              setIsPaused(!isPaused);
              setIsDisabled(true);
            }}
          >
            {isPaused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
          </Fab>
          <Dialog open={openModal} onClose={handleClose}>
            <DialogTitle>
              {players.length === 0
                ? `Ganhou o jogo parabens! Pontuação ${points}`
                : `Acertou! O jogador era o ${selectedPlayer}`}
            </DialogTitle>
          </Dialog>
          <Dialog open={isPaused}>
            <DialogTitle>Está em pausa!</DialogTitle>
          </Dialog>
        </Stack>
      </Box>
    </>
  );
}

export default App;
