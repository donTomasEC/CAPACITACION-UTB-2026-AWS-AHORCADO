//import { useState } from 'react'
//import heroImg from './assets/hero.png'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import './App.css'

import GameHeader from "./components/GameHeader";
import GameStatus from "./components/GameStatus";
import Hangman from "./components/Hangman";
import Keyboard from "./components/Keyboard";
import ScoreBoard from "./components/ScoreBoard";
import Word from "./components/Word";

import { useHangman } from "./hooks/useHangman";

import "./App.css";

function App() {
  const game = useHangman();

  const handleCategoryChange = event => {
    const newCategory = event.target.value;

    game.startGame(
      newCategory,
      game.difficulty
    );
  };

  const handleDifficultyChange = event => {
    const newDifficulty = event.target.value;

    game.startGame(
      game.category,
      newDifficulty
    );
  };

  return (
    <div className="app">

      <GameHeader
        category={game.category}
        difficulty={game.difficulty}
        onCategoryChange={handleCategoryChange}
        onDifficultyChange={handleDifficultyChange}
        onNewGame={() =>
          game.startGame(
            game.category,
            game.difficulty
          )
        }
      />


      <main className="main">

        <section className="game-card">

          <div className="game-top">

            <div className="category-info">

              <span className="category-icon">
                {game.category === "programacion" && "💻"}

                {game.category === "animales" && "🐾"}

                {game.category === "paises" && "🌎"}

                {game.category === "tecnologia" && "🚀"}
              </span>

              <div>

                <span>
                  Categoría
                </span>

                <strong>
                  {game.category === "programacion" &&
                    "Programación"}

                  {game.category === "animales" &&
                    "Animales"}

                  {game.category === "paises" &&
                    "Países"}

                  {game.category === "tecnologia" &&
                    "Tecnología"}
                </strong>

              </div>

            </div>


            <div className="timer">

              <span>
                ⏱
              </span>

              <strong>
                {String(
                  Math.floor(game.timeLeft / 60)
                ).padStart(2, "0")}
                :
                {String(
                  game.timeLeft % 60
                ).padStart(2, "0")}
              </strong>

            </div>

          </div>


          <div className="game-content">

            <div className="hangman-section">

              <Hangman
                errors={game.errors}
                maxErrors={
                  game.currentDifficulty.maxErrors
                }
              />

            </div>


            <div className="word-section">

              <GameStatus
                status={game.status}
                word={game.word}
                score={game.score}
                timeLeft={game.timeLeft}
              />


              <Word
                word={game.word}
                guessedLetters={
                  game.guessedLetters
                }
                status={game.status}
              />


              <p className="keyboard-label">
                Usa el teclado o haz clic en una letra
              </p>


              <Keyboard
                guessedLetters={
                  game.guessedLetters
                }
                word={game.word}
                onLetterClick={
                  game.guessLetter
                }
                disabled={
                  game.status !== "playing"
                }
              />


              {game.status !== "playing" && (
                <button
                  className="play-again"
                  onClick={() =>
                    game.startGame(
                      game.category,
                      game.difficulty
                    )
                  }
                >
                  🔄 Jugar otra vez
                </button>
              )}

            </div>

          </div>

        </section>


        <ScoreBoard
          stats={game.stats}
          onReset={game.resetStats}
        />

      </main>


      <footer className="footer">

        <p>
          AHORCADO EN REACT UTB - FAFI - CARRERA DE SISTEMAS DE INFORMACION
        </p>

        <span>
          Desarrollado con React + Vite
        </span>

        <p><span>
          Tomas Echeverria, 
        </span></p>
        

      </footer>

    </div>
  );
}

export default App;
