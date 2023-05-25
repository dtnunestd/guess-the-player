const Images = ({ selectedPlayer, counter, blurLevel }) => {
  return (
    <>
      {counter < 4 ? (
        <img
          src={`../players/${selectedPlayer}.jpg`}
          className="App-logo"
          style={{ filter: `blur(${blurLevel}px)` }}
          alt="logo"
        />
      ) : (
        <img src={`../campeao.jpeg`} className="App-logo" alt="logo" />
      )}
    </>
  );
};

export default Images;
