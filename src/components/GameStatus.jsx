function GameStatus({
  status,
  word,
  score,
  timeLeft
}) {
  if (status === "playing") {
    return (
      <div className="game-status playing">

        <span className="status-dot" />

        <span>
          Encuentra la palabra
        </span>

      </div>
    );
  }

  if (status === "won") {
    return (
      <div className="game-status won">

        <div className="status-icon">
          🎉
        </div>

        <div>
          <h2>¡Ganaste!</h2>

          <p>
            Has descubierto la palabra
            <strong> {word}</strong>
          </p>

          <div className="earned-score">
            +{score} puntos
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="game-status lost">

      <div className="status-icon">
        💀
      </div>

      <div>
        <h2>Fin de la partida</h2>

        <p>
          La palabra era
          <strong> {word}</strong>
        </p>

        {timeLeft <= 0 && (
          <span className="timeout">
            Se acabó el tiempo
          </span>
        )}
      </div>

    </div>
  );
}

export default GameStatus;