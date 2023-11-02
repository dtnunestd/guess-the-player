import React, { useState, useEffect } from "react";
import "./App.css";
import playerData from "./playerData.js";

function App() {
  const [points, setPoints] = useState(100);
  const [blurAmount, setBlurAmount] = useState(35);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * playerData.length)
  );
  const [attempts, setAttempts] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [displayedCircles, setDisplayedCircles] = useState([]);
  const [playerInputValue, setPlayerInputValue] = useState("");
  const [playerSuggestions, setPlayerSuggestions] = useState(
    playerData.map((player) => player.name)
  );

  const currentImage = new URL(
    `./assets/images/${currentImageIndex}.jpg`,
    import.meta.url
  ).href; // Replace with player image URLs

  useEffect(() => {
    if (points <= 0) {
      alert("Game Over! Your final score: " + points);
      // Reset the game or navigate to a different screen here
    }
  }, [points]);

  useEffect(() => {
    if (blurAmount > 0 && !showSuccessMessage) {
      const timer = setInterval(() => {
        setBlurAmount(blurAmount - 1);
        setPoints(points - 1); // Decrease points every second
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [blurAmount, points, showSuccessMessage]);

  const getPlayerInfoFromName = (name) => {
    const playerInfo = playerData.find((player) => player.name === name);
    return playerInfo || { nationality: "", position: "", age: 0 };
  };

  const handleGuess = () => {
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
    setDisplayedCircles([...displayedCircles, ...newAttempt]);

    if (selectedPlayer === currentPlayerInfo.name) {
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

  const handlePlayerInputChange = (event) => {
    const inputValue = event.target.value;
    setPlayerInputValue(inputValue);

    // Update suggestions based on input value
    const filteredSuggestions = playerData
      .map((player) => player.name)
      .filter((name) => doesNameContainInput(name, inputValue));
    setPlayerSuggestions(filteredSuggestions);
  };

  // Helper function to determine if any word in the name contains the input
  const doesNameContainInput = (name, input) => {
    const words = name.toLowerCase().split(" ");
    return words.some((word) => word.startsWith(input.toLowerCase()));
  };

  const handlePlayerInputSelect = (value) => {
    setPlayerInputValue(value);
    setSelectedPlayer(value);
    setPlayerSuggestions([]);
  };

  return (
    <div className="App">
      <h1>Guess the Blurred Player</h1>
      {showSuccessMessage ? (
        <div className="success-message">
          <p>Acertaste! Parabéns!</p>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="image-container" src={currentImage} />
          </div>

          <div className="attempt" style={{ width: "100%", display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={"circle green"} />
              <div className={"circle-label"}>Nationality</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={`circle green`} />
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
                className={`circle green`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></div>
              <div className={"circle-label"}>Age</div>
            </div>
          </div>
          <button onClick={handleContinue}>Continue</button>
        </div>
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

            <p>Points: {points}</p>

            <div
              className={`select-container ${
                playerInputValue ? "show-suggestions" : ""
              }`}
            >
              <input
                type="text"
                value={playerInputValue}
                onChange={handlePlayerInputChange}
                placeholder="Enter player's name"
              />
              <div className={`suggestions ${playerInputValue ? "show" : ""}`}>
                {playerSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handlePlayerInputSelect(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleGuess}>Submit</button>
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
    </div>
  );
}

export default App;
