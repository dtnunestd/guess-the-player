const SuccessMessage = ({ currentImage, handleContinue, result }) => {
  return (
    <div className="success-message">
      <p>Acertaste! Parabéns!</p>
      <p>Pontuação: {result}</p>

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
      <button autoFocus className="button" onClick={handleContinue}>
        Continuar
      </button>
    </div>
  );
};

export default SuccessMessage;
