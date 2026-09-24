const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

function Keyboard({
  guessedLetters,
  word,
  onLetterClick,
  disabled
}) {
  return (
    <div className="keyboard">

      {keyboardRows.map(
        (row, rowIndex) => (

          <div
            className="keyboard-row"
            key={rowIndex}
          >

            {row.map(letter => {

              const used =
                guessedLetters.includes(letter);

              const correct =
                used &&
                word.includes(letter);

              const incorrect =
                used &&
                !word.includes(letter);

              return (
                <button
                  key={letter}
                  className={`
                    key
                    ${used ? "used" : ""}
                    ${correct ? "correct" : ""}
                    ${incorrect ? "incorrect" : ""}
                  `}
                  disabled={
                    disabled || used
                  }
                  onClick={() =>
                    onLetterClick(letter)
                  }
                >
                  {letter}
                </button>
              );
            })}

          </div>
        )
      )}

    </div>
  );
}

export default Keyboard;