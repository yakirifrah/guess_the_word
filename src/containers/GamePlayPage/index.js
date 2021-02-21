import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { generateRandomWord, checkIfPlayerGuessTheWord, decreaseLifePlayer } from '../../store/actions';
import { Header, Button } from '../../components/Shared';
import { getIndexOfMissingLetters, generateKey } from '../../helpers';
import { Input } from '../../components/Shared/Form';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { TIMER_FOR_EACH_LEVEL } from '../../constants/game';
import dictionary from '../../lib/dictionary';

import './style.scss';

const GamePlayPage = ({ location }) => {
  const dispatch = useDispatch();
  const { category, word, lifePlayerPoints, victoryPlayerPoints } = useSelector((state) => state.app);
  const [lettersArray, setLettersArray] = useState([]);
  const [resetTimer, setResetTimer] = useState(0);
  const btnRef = useRef();
  const wordGuess = useRef([]);
  const history = useHistory();
  wordGuess.current = lettersArray;

  useEffect(() => {
    const {
      payload: { word },
    } = dispatch(generateRandomWord(dictionary));
    const arrIndexOfMissingLetters = getIndexOfMissingLetters(word);
    btnRef.current.disabled = true;
    setLettersArray(Array.from(word).map((word, index) => (arrIndexOfMissingLetters.includes(index) ? null : word)));
    setResetTimer((prevState) => prevState + 1);
  }, [victoryPlayerPoints, dispatch]);

  useEffect(() => {
    if (lifePlayerPoints === 0) {
      return history.push('/game-over');
    }
  }, [history, lifePlayerPoints]);

  const handleChange = ({ target }, index) => {
    if (target.value.match(RegExp('^[a-zA-Z]$'))) {
      focusNextChar(target);
    } else {
      target.value = null;
    }
    const copyWordGuess = [...wordGuess.current];
    copyWordGuess[index] = target.value === '' ? null : target.value;
    wordGuess.current = copyWordGuess;
    checkIfGuessAllLetters();
  };

  const focusNextChar = (target) => {
    let nextEl = target.nextElementSibling;
    while (nextEl !== null) {
      if (nextEl.localName === 'input') break;
      else {
        nextEl = nextEl.nextElementSibling;
      }
    }
    if (nextEl !== null) {
      nextEl.focus();
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const playerGuessWord = wordGuess.current.join('');
    dispatch(checkIfPlayerGuessTheWord(playerGuessWord, word));
  };

  const checkIfGuessAllLetters = () => {
    btnRef.current.disabled = wordGuess.current.includes(null);
    if (!wordGuess.current.includes(null)) btnRef.current.focus();
  };

  return (
    <>
      <Header title={category} />
      <div className="Game">
        <div className="Game__guess-word">
          {lettersArray.map((letter, index) => {
            if (letter) {
              return (
                <h2 className="letter u-mr-4" key={generateKey('h2')}>
                  {letter}
                </h2>
              );
            } else {
              return (
                <Input
                  key={generateKey('input')}
                  type="text"
                  style={`single__character`}
                  handleChange={handleChange}
                  index={index}
                  name="letter"
                  maxLength={'1'}
                />
              );
            }
          })}
        </div>
        <div className="check_guess">
          <Button label="Check the guess" handleOnClick={handleOnClick} ref={btnRef} className="check_guess" />
        </div>
        <footer className="Footer">
          <div className="Counter_timer">
            <CountdownCircleTimer
              isPlaying
              key={resetTimer}
              duration={TIMER_FOR_EACH_LEVEL}
              colors={[
                ['#004777', 0.33],
                ['#F7B801', 0.33],
                ['#A30000', 0.33],
              ]}
              size={90}
              onComplete={() => {
                dispatch(decreaseLifePlayer());
                setResetTimer(prev=>prev+1);
                // history.push('/game-over');
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>

          <div className="GuessesLeft">
            <div className="GuessesLeft__header">
              <h6 className="text">Life: {lifePlayerPoints}</h6>
            </div>
          </div>
          <div className="VictoryPoint">
            <div className="VictoryPoint__header">
              <h6 className="text">points: {victoryPlayerPoints}</h6>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default GamePlayPage;
