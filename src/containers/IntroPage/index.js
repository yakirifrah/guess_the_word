import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header, Button } from '../../components/Shared';
import './style.scss';

const IntroPage = () => {
  const { scoreTable } = useSelector((state) => state.app);
  const getPlayerWithHighestScore = () => {
    if (!scoreTable.length) {
      return null;
    }
    return scoreTable.reduce((prev, curr) => (prev.score > curr.score ? prev : curr));
  };
  const [playerWithHighestScore] = useState(() => getPlayerWithHighestScore());
  const history = useHistory();
  const startNewGame = (e) => {
    e.preventDefault();
    history.push('/game', { from: 'IntroPage' });
  };
  return (
    <>
      <Header title="Guess the word" size="xlg" />
      {scoreTable.length > 0 && (
        <div className="maximum_score">
          <Header title={'The player with maximum points: '} />
          <h2>{playerWithHighestScore?.name}</h2>
          <h2>{playerWithHighestScore?.score}</h2>
        </div>
      )}

      <Button className={'start_new_game'} label="Start new game" handleOnClick={startNewGame} />
    </>
  );
};
export default IntroPage;
