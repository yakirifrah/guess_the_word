import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import dictionary from '../../lib/dictionary';

const initialState = {
  dictionary,
  word: '',
  category: '',
  msg: '',
};

const generateRandomWord = (state, action) => {
  return updateObject(state, {
    ...action.payload,
  });
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GENERATE_RANDOM_WORD:
      return generateRandomWord(state, action);

    default:
      return state;
  }
}
