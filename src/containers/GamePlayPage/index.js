import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { generateRandomWord, checkIfPlayerGuessTheWord } from '../../store/actions';
import { Header, Button } from '../../components/Shared';
import dictionary from '../../lib/dictionary';
import { getIndexOfMissingLetters, generateKey } from '../../helpers';
import { Input } from '../../components';

import './style.scss';

const GamePlayPage = () => {
  const dispatch = useDispatch();
  const { category, word, lifePlayerPoints, victoryPlayerPoints } = useSelector((state) => state.app);
  const [lettersArray, setLettersArray] = useState([]);
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
  }, [victoryPlayerPoints, dispatch]);

  useEffect(() => {
    console.log({ lifePlayerPoints });
    if (lifePlayerPoints === 0) {
      history.push('/game-over');
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
                />
              );
            }
          })}
        </div>
        <div className="check-guess">
          <Button label="Check the guess" handleOnClick={handleOnClick} ref={btnRef} className="check-guess__btn" />
        </div>
        <footer>
          <div className="GuessesLeft">
            <div className="GuessesLeft__header">
              <h6>Life: {lifePlayerPoints}</h6>
            </div>
          </div>
          <div className="VictoryPoint">
            <div className="VictoryPoint__header">
              <h6>points: {victoryPlayerPoints}</h6>
            </div>
          </div>
          <h1>Test: {word}</h1>
        </footer>
      </div>
    </>
  );
};
export default GamePlayPage;
