function Hangman({ errors, maxErrors }) {
  return (
    <div className="hangman-container">

      <div className="hangman">

        <div className="gallows-base" />

        <div className="gallows-pole" />

        <div className="gallows-top" />

        <div className="gallows-rope" />


        {errors >= 1 && (
          <div className="hangman-head">
            <div className="eye left" />
            <div className="eye right" />
            <div className="mouth" />
          </div>
        )}


        {errors >= 2 && (
          <div className="hangman-body" />
        )}


        {errors >= 3 && (
          <div className="hangman-arm left-arm" />
        )}


        {errors >= 4 && (
          <div className="hangman-arm right-arm" />
        )}


        {errors >= 5 && (
          <div className="hangman-leg left-leg" />
        )}


        {errors >= 6 && (
          <div className="hangman-leg right-leg" />
        )}

      </div>


      <div className="lives">

        <span>
          Vidas
        </span>

        <strong>
          {Math.max(0, maxErrors - errors)}
        </strong>

      </div>

    </div>
  );
}

export default Hangman;