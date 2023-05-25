import React, { useState, useEffect } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";

import Header from "./Header.js";
import Menu from "./Menu.js";
import Dialogs from "./Dialogs.js";
import Images from "./Images.js";
import Avatars from "./Avatars";

import { players, listPlayers } from "./players";

let index = Math.floor(Math.random() * players.length);

function App() {
  const blur = 50;
  const [openModal, setOpenModal] = useState(false);
  const [blurLevel, setBlurLevel] = useState(blur);
  const [points, setPoints] = useState(1000);
  const [isOver, setIsOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [counter, setCounter] = useState(0);

  const handlePause = () => {
    console.log("enntrei");
    setIsPaused(!isPaused);
  };

  const [value, setValue] = useState("Player");

  const [selectedPlayer, setSelectedPlayer] = useState(players[index]);

  useEffect(() => {
    const blurTimer = setInterval(() => {
      if (blurLevel > 0 && !isOver && !isPaused) {
        setBlurLevel((prevBlur) => prevBlur - 1);
        setPoints((prevPoints) => prevPoints - 1);
      }
    }, 1000);

    return () => {
      clearInterval(blurTimer);
    };
  }, [blurLevel, isOver, isPaused]);

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  const handleClose = () => {
    if (counter === 4) {
      console.log("is over");
      setIsOver(true);
    } else {
      setOpenModal(false);
      const newIndex = Math.floor(Math.random() * players.length);
      setValue("");

      index = newIndex;
      setBlurLevel(blur);

      setTimeout(() => {
        setSelectedPlayer(players[newIndex]);
      }, 100);
    }
  };

  useEffect(() => {
    if (value === selectedPlayer.name) {
      setBlurLevel(0);
      setCounter((prevCounter) => prevCounter + 1);
      setOpenModal(true);
    } else if (value !== "Player" && value !== "") {
      setPoints((prevPoints) => prevPoints - 10);
    }
  }, [value, selectedPlayer]);

  return (
    <>
      <Header points={points} />

      <Box className="App-header">
        <Images
          counter={counter}
          blurLevel={blurLevel}
          selectedPlayer={selectedPlayer.name}
        />
        <Stack spacing={2}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ textAlign: "center", marginTop: "40px" }}
          >
            Adivinha o jogador
          </Typography>

          <Autocomplete
            size="small"
            style={{ backgroundColor: "white" }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            disablePortal
            id="size-small-outlined-multi"
            options={listPlayers}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
            ListboxProps={{
              style: {
                maxHeight: "250px",
              },
            }}
          />

          <Menu isPaused={isPaused} handlePause={handlePause} />

          <Dialogs
            points={points}
            selectedPlayer={selectedPlayer.name}
            openModal={openModal}
            counter={counter}
            handleClose={handleClose}
          />

          <Avatars selectedPlayer={selectedPlayer} value={value} />
        </Stack>
      </Box>
    </>
  );
}

export default App;
