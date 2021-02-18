import { Header, Button } from '../../components/Shared';
import { useHistory } from 'react-router-dom';

const IntroPage = () => {
  const history = useHistory();
  const startNewGame = (e) => {
    e.preventDefault();
    history.push('/game');
  };
  return (
    <>
      <Header title="Guess the word" size="xlg" />
      <div className="Button">
        <Button label="Start new game" handleOnClick={startNewGame} />
      </div>
    </>
  );
};
export default IntroPage;
