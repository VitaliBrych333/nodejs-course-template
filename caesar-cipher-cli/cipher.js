const alphabet = require('./alphabet');

const cipher = (str, act, shift) => {
  const lettersLower = alphabet.lettersLower;
  const lettersUpper = alphabet.lettersUpper;
  const countLetters = alphabet.lettersLower.length;

  function processLettersDecode(string, letter) {
    const prevIndLetter = string.indexOf(letter);
    let newIndLetter = prevIndLetter - shift;

    if (newIndLetter < 0) {
      newIndLetter = (newIndLetter % countLetters) + countLetters;
    }

    return string[newIndLetter];
  }

  function processLettersEncode(string, letter) {
    const prevIndLetter = lettersLower.indexOf(letter);
    const newIndLetter = (prevIndLetter + shift) % countLetters;

    return lettersLower[newIndLetter];
  }

  if (act === 'decode') {
    return str.replace(/[a-z]/gi, letter => {
      if (/[a-z]/.test(letter)) {
        return processLettersDecode(lettersLower, letter);
      }

      return processLettersDecode(lettersUpper, letter);
    });
  }

  return str.replace(/\w/gi, letter => {
    if (/[a-z]/.test(letter)) {
      return processLettersEncode(lettersLower, letter);
    }

    return processLettersEncode(lettersUpper, letter);
  });
};

module.exports = cipher;
