import './style.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IntroPage from '../IntroPage';
import GamePlayPage from '../GamePlayPage';
import GameOverPage from '../GameOverPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route path="/game" component={GamePlayPage} />
          <Route path="/game-over" component={GameOverPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
