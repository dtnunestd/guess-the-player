import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import SuccesMessage from "./SuccessMessage";
import "./App.css";
import playerData from "./playerData.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function App() {
  const [points, setPoints] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [blurAmount, setBlurAmount] = useState(35);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * playerData.length)
  );
  const [attempts, setAttempts] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [result, setResult] = useState(0);

  const [displayedCircles, setDisplayedCircles] = useState([]);
  const [playerSuggestions, setPlayerSuggestions] = useState(
    playerData.map((player) => player.name)
  );

  useEffect(() => {
    console.log("selectedplayer", selectedPlayer === "");
  }, [selectedPlayer]);

  const currentImage = new URL(
    `./assets/images/${currentImageIndex}.jpg`,
    import.meta.url
  ).href; // Replace with player image URLs

  useEffect(() => {
    if (points <= 0) {
      setGameOver(true);
    }
  }, [points]);

  useEffect(() => {
    if (blurAmount > 0 && !showSuccessMessage) {
      const timer = setInterval(() => {
        setBlurAmount(blurAmount - 2);
        setPoints(points - 1); // Decrease points every second
      }, 500);
      return () => clearInterval(timer);
    }
  }, [blurAmount, points, showSuccessMessage]);

  const getPlayerInfoFromName = (name) => {
    const playerInfo = playerData.find((player) => player.name === name);
    return playerInfo || { nationality: "", position: "", age: 0 };
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const playerInfo = getPlayerInfoFromName(selectedPlayer);
    const currentPlayerInfo = playerData[currentImageIndex];

    console.log("Image");
    console.log("NAÇÃO:", currentPlayerInfo.nationality);
    console.log("Posiçao:", currentPlayerInfo.position);
    console.log("Idade:", currentPlayerInfo.age);

    console.log("Guess");
    console.log("NAÇÃO:", playerInfo.nationality);
    console.log("Posiçao:", playerInfo.position);
    console.log("Idade:", playerInfo.age);

    const getAgeArrow = (playerAge, imageAge) => {
      if (playerAge < imageAge) {
        return `${playerAge} ↑`; // Down arrow for younger
      } else if (playerAge > imageAge) {
        return `${playerAge} ↓`; // Up arrow for older
      } else {
        return "↔"; // Equal sign for same age
      }
    };

    const getInitial = (str) => {
      console.log("str", str);
      const words = str.split(" ");
      const firstLetters = words.map((word) => word[0]);
      console.log("tratado", firstLetters);
      return firstLetters.join("");
    };

    const newAttempt = [
      {
        name: playerInfo.name,
        nationality: playerInfo.nationality === currentPlayerInfo.nationality,
        position: playerInfo.position === currentPlayerInfo.position,
        age: playerInfo.age === currentPlayerInfo.age,
        arrow: getAgeArrow(playerInfo.age, currentPlayerInfo.age),
        IPosition: getInitial(playerInfo.position),
        INationality: getInitial(playerInfo.nationality),
      },
    ];

    console.log("attempt", newAttempt);

    setAttempts(attempts + 1);
    setDisplayedCircles([...newAttempt, ...displayedCircles]);

    if (selectedPlayer === currentPlayerInfo.name) {
      setResult(result + 1);
      setBlurAmount(20);
      setSelectedPlayer("");
      setDisplayedCircles([]);
      setShowSuccessMessage(true);
    } else {
      setPoints(points - 30);
      setSelectedPlayer("");
    }
  };

  const handleContinue = () => {
    setCurrentImageIndex(Math.floor(Math.random() * playerData.length)); // Randomize the next image
    setBlurAmount(35);
    setSelectedPlayer("");
    setDisplayedCircles([]);
    setShowSuccessMessage(false);
  };

  if (gameOver) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Fim do jogo!</h1>
        <h2>Pontuação: {result}</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Adivinha o jogador</h1>
      {showSuccessMessage ? (
        <SuccesMessage
          result={result}
          currentImage={currentImage}
          handleContinue={handleContinue}
        />
      ) : (
        <div className="game-container">
          <div>
            <img
              className="image-container"
              src={currentImage}
              style={{
                backgroundImage: currentImage,
                filter: `blur(${blurAmount}px)`,
              }}
            />

            <div className="info">
              <p>Pontos: {points}</p>

              <form onSubmit={handleGuess}>
                <Autocomplete
                  className="input"
                  disablePortal
                  options={playerSuggestions}
                  onChange={(e, value) => setSelectedPlayer(value)}
                  value={selectedPlayer}
                  renderInput={(params) => (
                    <TextField {...params} autoFocus label="Jogador" />
                  )}
                  componentsProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "flip",
                          enabled: false,
                        },
                      ],
                    },
                  }}
                />

                <button
                  className="button"
                  type="submit"
                  disabled={selectedPlayer === ""}
                >
                  Confirmar
                </button>
              </form>
            </div>
          </div>

          {attempts > 0 && (
            <div className="attempts guess-container">
              {displayedCircles.map((attempt, index) => (
                <>
                  <p className="guess-name">{attempt.name}</p>

                  <div key={index} className="attempt">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={`circle ${
                          attempt.nationality ? "green" : "red"
                        }`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {attempt.INationality}
                      </div>
                      <div className={"circle-label"}>Nationality</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={`circle ${
                          attempt.position ? "green" : "red"
                        }`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {attempt.IPosition}
                      </div>
                      <div className={"circle-label"}>Position</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={`circle ${attempt.age ? "green" : "red"}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {attempt.arrow}
                      </div>
                      <div className={"circle-label"}>Age</div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      )}
      {/* <Menu /> */}
    </div>
  );
}

export default App;
