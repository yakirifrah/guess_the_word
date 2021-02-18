export function getIndexOfMissingLetters(word) {
  let arrIndexOfMissingLetters = [];

  while (arrIndexOfMissingLetters.length !== Math.floor(word.length / 2)) {
    let randomIndex = Math.floor(Math.random() * word.length);
    if (arrIndexOfMissingLetters.includes(randomIndex)) {
      arrIndexOfMissingLetters.splice(randomIndex, 1);
    } else {
      arrIndexOfMissingLetters.push(randomIndex);
    }
  }
  return arrIndexOfMissingLetters;
}
