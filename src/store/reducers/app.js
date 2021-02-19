import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import dictionary from '../../lib/dictionary';

const initialState = {
  dictionary,
  word: '',
  category: '',
  msg: '',
  lifePlayerPoints: 3,
  victoryPlayerPoints: 0,
  isPlayerGuessCorrect: false,
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

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GENERATE_RANDOM_WORD:
      return generateRandomWord(state, action);
    case actionTypes.CHECK_GUESS_WORD:
      return checkIfPlayerGuessTheWord(state, action);
    default:
      return state;
  }
}
