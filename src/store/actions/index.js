import * as actionTypes from './actionTypes';

export const generateRandomWord = (dictionary = {}) => {
  if (!dictionary.length) {
    return {
      type: actionTypes.GENERATE_RANDOM_WORD,
      payload: {
        msg: 'You have successfully completed the game, there are no more words to guess',
      },
    };
  }

  const randomCategoryIndex = Math.floor(Math.random() * dictionary.length);
  const randomCategory = dictionary[randomCategoryIndex].category;
  const copyWords = [...dictionary[randomCategoryIndex].words];
  const randomWordIndex = Math.floor(Math.random() * copyWords.length);
  const randomWord = copyWords[randomWordIndex];
  return {
    type: actionTypes.GENERATE_RANDOM_WORD,
    payload: {
      word: randomWord,
      category: randomCategory,
    },
  };
};
export const checkIfPlayerGuessTheWord = (playerGuessWord, word) => {
  return {
    type: actionTypes.CHECK_GUESS_WORD,
    payload: {
      isPlayerGuessCorrect: playerGuessWord.toLowerCase() === word.toLowerCase(),
    },
  };
};

export const insertDataToTableScore = ({ name, phoneNumber, score }, index = -1) => {
  if (index !== -1) {
    return {
      type: actionTypes.SAVE_DATA_SCORE_PLAYER,
      payload: {
        index,
        scorePlayer: { name, phoneNumber, score },
      },
    };
  }
  return {
    type: actionTypes.SAVE_DATA_SCORE_PLAYER,
    payload: {
      scorePlayer: { name, phoneNumber, score },
    },
  };
};
