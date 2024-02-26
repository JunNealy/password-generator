// character collections
const alphabetChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '1234567890';
const symbolChars = '!"#$%&()*+,-./:;<>=?@[]^_`{}|~';

// event listeners
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const symbols = document.getElementById('symbols');
const numbers = document.getElementById('numbers');

// state management
let state = {
  length: 0,
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
};

function updateState(option, value) {
  state[option] = value;
}

function getState() {
  return state;
}

//
uppercase.addEventListener('click', function () {
  updateState(uppercase, uppercase.checked);
  console.log(getState());
});
