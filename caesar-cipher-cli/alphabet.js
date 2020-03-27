const lowerCase = 'abcdefghijklmnopqrstuvwxyz';

const upperCase = lowerCase
  .split('')
  .map(i => i.toUpperCase())
  .join('');

const alphabet = {
  lettersLower: lowerCase,
  lettersUpper: upperCase
};

module.exports = alphabet;
