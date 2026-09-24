function Word({
  word,
  guessedLetters,
  status
}) {
  return (
    <div className="word-container">

      {word.split("").map(
        (letter, index) => {

          const visible =
            guessedLetters.includes(letter);

          const show =
            visible || status === "lost";

          return (
            <div
              key={`${letter}-${index}`}
              className={`word-letter ${
                visible ? "revealed" : ""
              } ${
                status === "lost" &&
                !visible
                  ? "missed"
                  : ""
              }`}
            >
              {show ? letter : ""}
            </div>
          );
        }
      )}

    </div>
  );
}

export default Word;