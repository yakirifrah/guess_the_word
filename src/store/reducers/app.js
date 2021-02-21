import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import dictionary from '../../lib/dictionary';
import { LIFE_PLAYER_POINTS } from '../../constants/game';
const initialState = {
  dictionary,
  word: '',
  category: '',
  msg: '',
  lifePlayerPoints: LIFE_PLAYER_POINTS,
  victoryPlayerPoints: 0,
  isPlayerGuessCorrect: false,
  scoreTable: JSON.parse(localStorage.getItem('scoreTable')) || [],
  scorePlayer: { name: null, phoneNumber: null, score: null },
  requestToInsertScoreTableFulfilled: false,
};

const generateRandomWord = (state, action) => {
  return updateObject(state, {
    ...action.payload,
  });
};

const checkIfPlayerGuessTheWord = (state, action) => {
  if (action.payload.isPlayerGuessCorrect) {
    return updateObject(state, {
      victoryPlayerPoints: state.victoryPlayerPoints + 1,
    });
  }
  return updateObject(state, {
    lifePlayerPoints: state.lifePlayerPoints - 1,
  });
};

const insertScorePlayerIntoScoreTable = (state, action) => {
  if (action.payload.hasOwnProperty('index')) {
    const copyScoreTable = [...state.scoreTable];
    const { score } = action.payload.scorePlayer;
    const { index } = action.payload;
    copyScoreTable[index] = { ...copyScoreTable[index], score };
    localStorage.setItem('scoreTable', JSON.stringify([...copyScoreTable]));

    return updateObject(state, {
      scoreTable: [...copyScoreTable],
      requestToInsertScoreTableFulfilled: true,
    });
  }

  localStorage.setItem('scoreTable', JSON.stringify([...state.scoreTable, action.payload.scorePlayer]));
  return updateObject(state, {
    scoreTable: [...state.scoreTable, action.payload.scorePlayer],
    requestToInsertScoreTableFulfilled: true,
  });
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GENERATE_RANDOM_WORD:
      return generateRandomWord(state, action);
    case actionTypes.CHECK_GUESS_WORD:
      return checkIfPlayerGuessTheWord(state, action);
    case actionTypes.SAVE_DATA_SCORE_PLAYER:
      return insertScorePlayerIntoScoreTable(state, action);
    default:
      return state;
  }
}
