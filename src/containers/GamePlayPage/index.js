import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateRandomWord } from '../../store/actions';
import { Header, Button } from '../../components/Shared';
import dictionary from '../../lib/dictionary';
import { getIndexOfMissingLetters } from '../../helpers';
import { Input } from '../../components';

import './style.scss';

const GamePlayPage = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.app);
  const [lettersArray, setLettersArray] = useState([]);
  const inputEl = useRef();
  const btnRef = useRef();
  const wordGuess = useRef([]);
  wordGuess.current = lettersArray;
  useEffect(() => {
    const {
      payload: { word },
    } = dispatch(generateRandomWord(dictionary));
    const arrIndexOfMissingLetters = getIndexOfMissingLetters(word);
    setLettersArray(Array.from(word).map((word, index) => (arrIndexOfMissingLetters.includes(index) ? null : word)));
  }, [dispatch]);

  const handleChange = ({ target }, index) => {
    if (target.value.match(RegExp('^[a-zA-Z]$'))) {
      focusNextChar(target);
    } else {
      target.value = null;
    }
    const copyWordGuess = [...wordGuess.current];
    copyWordGuess[index] =  target.value === '' ? null: target.value;
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

  const handleOnClick = (e) => {};

  const checkIfGuessAllLetters = () => {
    btnRef.current.disabled = wordGuess.current.includes(null);
  };
  return (
    <>
      <Header title={category} />
      <div className="Game">
        <div className="Game__guess-word">
          {lettersArray.map((letter, index) => {
            if (letter) {
              return (
                <h2 className="letter u-mr-4" key={index}>
                  {letter}
                </h2>
              );
            } else {
              return (
                <Input
                  key={index}
                  type="text"
                  style={`single__character`}
                  handleChange={handleChange}
                  index={index}
                  ref={inputEl}
                />
              );
            }
          })}
        </div>
        <div className="check-guess">
          <Button label="Check the guess" handleOnClick={handleOnClick} disableBtn={true} ref={btnRef} />
        </div>
      </div>
    </>
  );
};
export default GamePlayPage;
