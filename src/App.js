import { useState, useEffect, useRef } from 'react';

function App() {
  const STARTING_TIME = 5;

  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isActive, setIsActive] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const textRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const calculateWordCount = (txt) => {
    const wordsArray = txt.trim().split(' ');
    return wordsArray.filter((word) => word !== '').length;
  };

  const startGame = () => {
    setIsActive(true);
    setText('');
    setTimeRemaining(STARTING_TIME);
    textRef.current.disabled = false;
    textRef.current.focus();
  };

  const endGame = () => {
    setIsActive(false);
    setWordCount(calculateWordCount(text));
  };

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isActive]);

  return (
    <div className='App'>
      <h1>How fast can you type?</h1>
      <textarea
        value={text}
        disabled={!isActive}
        onChange={handleChange}
        ref={textRef}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isActive}>
        Start game
      </button>
      <h1>Word Count: {wordCount}</h1>
    </div>
  );
}

export default App;
