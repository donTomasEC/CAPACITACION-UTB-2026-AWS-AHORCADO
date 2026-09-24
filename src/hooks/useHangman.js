import { useCallback, useEffect, useState } from "react";

import {
  categories,
  difficulties
} from "../data/words";

const STORAGE_KEY = "hangman-statistics";

const defaultStats = {
  games: 0,
  wins: 0,
  losses: 0,
  totalScore: 0,
  bestScore: 0,
  currentStreak: 0,
  bestStreak: 0
};

function getStoredStats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultStats;
    }

    return {
      ...defaultStats,
      ...JSON.parse(saved)
    };
  } catch {
    return defaultStats;
  }
}

function getRandomWord(category) {
  const categoryWords = categories[category].words;

  const index = Math.floor(
    Math.random() * categoryWords.length
  );

  return categoryWords[index];
}

export function useHangman() {
  const [category, setCategory] = useState("programacion");

  const [difficulty, setDifficulty] = useState("medium");

  const [word, setWord] = useState(
    getRandomWord("programacion")
  );

  const [guessedLetters, setGuessedLetters] = useState([]);

  const [status, setStatus] = useState("playing");

  const [timeLeft, setTimeLeft] = useState(
    difficulties.medium.time
  );

  const [score, setScore] = useState(0);

  const [stats, setStats] = useState(getStoredStats);

  const currentDifficulty = difficulties[difficulty];

  const errors = guessedLetters.filter(
    letter => !word.includes(letter)
  ).length;

  const remainingLives =
    currentDifficulty.maxErrors - errors;

  const wordCompleted = word
    .split("")
    .every(letter =>
      guessedLetters.includes(letter)
    );

  const startGame = useCallback(
    (newCategory = category, newDifficulty = difficulty) => {
      const selectedDifficulty =
        difficulties[newDifficulty];

      setCategory(newCategory);
      setDifficulty(newDifficulty);

      setWord(getRandomWord(newCategory));

      setGuessedLetters([]);

      setStatus("playing");

      setTimeLeft(selectedDifficulty.time);

      setScore(0);
    },
    [category, difficulty]
  );

  const finishGame = useCallback(
    (result) => {
      setStatus(result);

      const isWin = result === "won";

      let earnedScore = 0;

      if (isWin) {
        const remainingLetters =
          word.length - guessedLetters.length;

        earnedScore = Math.max(
          100,
          Math.round(
            (word.length * 100 +
              remainingLives * 50 +
              timeLeft * 2) *
              currentDifficulty.multiplier
          )
        );
      }

      setScore(earnedScore);

      setStats(previous => {
        const newStats = {
          ...previous,

          games: previous.games + 1,

          wins:
            previous.wins + (isWin ? 1 : 0),

          losses:
            previous.losses + (isWin ? 0 : 1),

          totalScore:
            previous.totalScore + earnedScore,

          bestScore:
            Math.max(
              previous.bestScore,
              earnedScore
            ),

          currentStreak:
            isWin
              ? previous.currentStreak + 1
              : 0,

          bestStreak:
            isWin
              ? Math.max(
                  previous.bestStreak,
                  previous.currentStreak + 1
                )
              : previous.bestStreak
        };

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(newStats)
        );

        return newStats;
      });
    },
    [
      word,
      guessedLetters.length,
      remainingLives,
      timeLeft,
      currentDifficulty
    ]
  );

  const guessLetter = useCallback(
    letter => {
      if (status !== "playing") {
        return;
      }

      if (guessedLetters.includes(letter)) {
        return;
      }

      const newGuessedLetters = [
        ...guessedLetters,
        letter
      ];

      setGuessedLetters(newGuessedLetters);

      const isCompleted = word
        .split("")
        .every(character =>
          newGuessedLetters.includes(character)
        );

      if (isCompleted) {
        setStatus("won");

        const earnedScore = Math.max(
          100,
          Math.round(
            (word.length * 100 +
              remainingLives * 50 +
              timeLeft * 2) *
              currentDifficulty.multiplier
          )
        );

        setScore(earnedScore);

        setStats(previous => {
          const newStats = {
            ...previous,

            games: previous.games + 1,

            wins: previous.wins + 1,

            totalScore:
              previous.totalScore + earnedScore,

            bestScore:
              Math.max(
                previous.bestScore,
                earnedScore
              ),

            currentStreak:
              previous.currentStreak + 1,

            bestStreak:
              Math.max(
                previous.bestStreak,
                previous.currentStreak + 1
              )
          };

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(newStats)
          );

          return newStats;
        });

        return;
      }

      const newErrors = newGuessedLetters.filter(
        character =>
          !word.includes(character)
      ).length;

      if (
        newErrors >=
        currentDifficulty.maxErrors
      ) {
        setStatus("lost");

        setStats(previous => {
          const newStats = {
            ...previous,

            games: previous.games + 1,

            losses: previous.losses + 1,

            currentStreak: 0
          };

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(newStats)
          );

          return newStats;
        });
      }
    },
    [
      status,
      guessedLetters,
      word,
      remainingLives,
      timeLeft,
      currentDifficulty
    ]
  );

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    if (timeLeft <= 0) {
      setStatus("lost");

      setStats(previous => {
        const newStats = {
          ...previous,

          games: previous.games + 1,

          losses: previous.losses + 1,

          currentStreak: 0
        };

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(newStats)
        );

        return newStats;
      });

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(previous => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status]);

  useEffect(() => {
    const handleKeyDown = event => {
      const letter =
        event.key.toUpperCase();

      if (/^[A-ZÑ]$/.test(letter)) {
        guessLetter(letter);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [guessLetter]);

  const resetStats = () => {
    localStorage.removeItem(STORAGE_KEY);

    setStats(defaultStats);
  };

  return {
    category,
    difficulty,
    word,
    guessedLetters,
    status,
    timeLeft,
    score,
    errors,
    remainingLives,
    stats,
    currentDifficulty,

    setCategory,
    setDifficulty,

    guessLetter,

    startGame,

    resetStats
  };
}