import React, { useState, useEffect } from "react";
import "./App.css";

const playerData = [
  {
    name: "Bah",
    nationality: "Argentina",
    position: "Defender",
    age: 34,
  },
  {
    name: "Antonio",
    nationality: "Argentina",
    position: "Defender",
    age: 33,
  },
  { name: "Andre", nationality: "Argentina", position: "Midfielder", age: 27 },
  // ... Add other player data
];

function App() {
  const [points, setPoints] = useState(100);
  const [blurAmount, setBlurAmount] = useState(20);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [displayedCircles, setDisplayedCircles] = useState([]);
  const [playerInputValue, setPlayerInputValue] = useState("");
  const [playerSuggestions, setPlayerSuggestions] = useState(
    playerData.map((player) => player.name)
  );

  const currentImage = `url(images/${currentImageIndex}.jpg)`; // Replace with player image URLs

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

    const newAttempt = [
      {
        nationality: playerInfo.nationality === currentPlayerInfo.nationality,
        position: playerInfo.position === currentPlayerInfo.position,
        age: playerInfo.age > currentPlayerInfo.age,
      },
    ];

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
    setCurrentImageIndex(currentImageIndex + 1);
    setBlurAmount(20);
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
      .filter((name) =>
        name.toLowerCase().startsWith(inputValue.toLowerCase())
      ); // Check for startsWith
    setPlayerSuggestions(filteredSuggestions);
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
            <div
              className="image-container"
              style={{
                backgroundImage: currentImage,
              }}
            />
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
                  width: "100%",
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
            <div
              className="image-container"
              style={{
                backgroundImage: currentImage,
                filter: `blur(${blurAmount}px)`,
              }}
            ></div>
            <p>Points: {points}</p>
          </div>

          <div className="guess-container">
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
        </div>
      )}
      {attempts > 0 && (
        <div className="attempts">
          {displayedCircles.map((attempt, index) => (
            <div key={index} className="attempt">
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
                <div
                  className={`circle ${attempt.position ? "green" : "red"}`}
                />
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
                    width: "100%",
                  }}
                >
                  {attempt.age ? "↑" : "↓"}
                </div>
                <div className={"circle-label"}>Age</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
