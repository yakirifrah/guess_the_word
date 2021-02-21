import './style.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IntroPage from '../IntroPage';
import GamePlayPage from '../GamePlayPage';
import GameOverPage from '../GameOverPage';
import ScoreTablePage from '../ScoreTablePage';
import * as routes from '../../constants/routes';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={routes.HOME} component={IntroPage} />
          <Route path={routes.GAME_PAGE} component={GamePlayPage} />
          <Route path={routes.GAME_OVER_PAGE} component={GameOverPage} />
          <Route path={routes.SCORE_TABLE_page} component={ScoreTablePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
