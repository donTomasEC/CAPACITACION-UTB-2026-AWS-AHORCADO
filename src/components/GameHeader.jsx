function GameHeader({
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
  onNewGame
}) {
  return (
    <header className="game-header">

    
     <div>
        <h1>ACTIVIDAD CAPACITACION UTB 2026 - AHORCADO</h1>
        <p>
          Adivina la palabra antes de quedarte
          sin intentos.
        </p>
      </div>



      <div className="controls">

        <select
          value={category}
          onChange={event =>
            onCategoryChange(event.target.value)
          }
        >
          <option value="programacion">
            💻 Programación
          </option>
{/* 
          <option value="animales">
            🐾 Animales
          </option>

          <option value="paises">
            🌎 Países
          </option>

          <option value="tecnologia">
            🚀 Tecnología
          </option>*/}
        </select>


        <select
          value={difficulty}
          onChange={event =>
            onDifficultyChange(event.target.value)
          }
        >
          {/*<option value="easy">
            🟢 Fácil
          </option>*/}

          <option value="medium">
            🟡 Normal
          </option>

          {/*<option value="hard">
            🔴 Difícil
          </option>*/}
        </select>


        <button
          className="new-game-button"
          onClick={onNewGame}
        >
          Nueva partida
        </button>

      </div>

    </header>
  );
}

export default GameHeader;