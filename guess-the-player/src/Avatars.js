import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { deepOrange, green } from "@mui/material/colors";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

import { players } from "./players";

const Avatars = ({ selectedPlayer, value }) => {
  const position = selectedPlayer.position;
  const nacionality = selectedPlayer.nacionality;
  const age = selectedPlayer.age;

  const [positionColor, setPositionColor] = useState("");
  const [nacionalityColor, setNacionalityColor] = useState("");
  const [ageColor, setAgeColor] = useState("");

  const foundPlayer = players.find((element) => element.name === value);

  const ageIcon = () => {
    if (age > foundPlayer?.age) {
      return <ArrowUpwardOutlinedIcon fontSize="small" />;
    }

    if (age < foundPlayer?.age) {
      return <ArrowDownwardOutlinedIcon />;
    }
  };

  useEffect(() => {
    if (foundPlayer) {
      setPositionColor(position === foundPlayer.position ? green : deepOrange);
      setNacionalityColor(
        nacionality === foundPlayer.nacionality ? green : deepOrange
      );
      setAgeColor(age === foundPlayer.age ? green : deepOrange);
    }
  }, [foundPlayer]);

  return (
    <>
      {value !== "" && value !== "Player" ? (
        <Stack direction="row" spacing={3} justifyContent="center">
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ py: 2 }}
          >
            <Typography variant="string" style={{ fontSize: "16px" }}>
              Posição
            </Typography>
            <Avatar sx={{ bgcolor: positionColor[500], width: 56, height: 56 }}>
              {foundPlayer?.position || undefined}
            </Avatar>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ py: 2 }}
          >
            <Typography variant="string" style={{ fontSize: "16px" }}>
              Nacionalidade
            </Typography>
            <Avatar
              sx={{ bgcolor: nacionalityColor[500], width: 56, height: 56 }}
            >
              {foundPlayer?.nacionality || undefined}
            </Avatar>
          </Stack>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ py: 2 }}
          >
            <Typography variant="string" style={{ fontSize: "16px" }}>
              Idade
            </Typography>
            <Avatar sx={{ bgcolor: ageColor[500], width: 56, height: 56 }}>
              <Stack direction="row" alignItems="center">
                {foundPlayer?.age || undefined}
                {ageIcon()}
              </Stack>
            </Avatar>
          </Stack>
        </Stack>
      ) : null}
    </>
  );
};

export default Avatars;
