function ScoreBoard({
  stats,
  onReset
}) {
  const winRate =
    stats.games === 0
      ? 0
      : Math.round(
          (stats.wins / stats.games) * 100
        );

  return (
    <aside className="scoreboard">

      <div className="scoreboard-header">

        <h2>
          Estadísticas
        </h2>

        <button
          onClick={onReset}
          title="Reiniciar estadísticas"
        >
          ↻
        </button>

      </div>


      <div className="stats-grid">

        <div className="stat">
          <span>Partidas</span>
          <strong>{stats.games}</strong>
        </div>

        <div className="stat">
          <span>Victorias</span>
          <strong>{stats.wins}</strong>
        </div>

        <div className="stat">
          <span>Derrotas</span>
          <strong>{stats.losses}</strong>
        </div>

        <div className="stat">
          <span>Victoria</span>
          <strong>{winRate}%</strong>
        </div>

        <div className="stat">
          <span>Mejor racha</span>
          <strong>{stats.bestStreak}</strong>
        </div>

        <div className="stat">
          <span>Mejor puntuación</span>
          <strong>{stats.bestScore}</strong>
        </div>

      </div>


      <div className="total-score">

        <span>
          Puntuación total
        </span>

        <strong>
          {stats.totalScore.toLocaleString()}
        </strong>

      </div>

    </aside>
  );
}

export default ScoreBoard;