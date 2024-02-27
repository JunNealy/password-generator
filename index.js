// character collections
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '1234567890';
const symbolChars = '!"#$%&()*+,-./:;<>=?@[]^_`{}|~';

//Option Elements
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const symbols = document.getElementById('symbols');
const numbers = document.getElementById('numbers');
const characterLength = document.getElementById('character-length');
const generate = document.getElementById('generate');

// state management
let state = {
  length: 12,
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

//State Change
function addListenerAndUpdate(element, option) {
  element.addEventListener('click', function () {
    let newState = element.checked;
    updateState(option, newState);
    console.log(getState());
  });
}

addListenerAndUpdate(uppercase, 'uppercase');
addListenerAndUpdate(lowercase, 'lowercase');
addListenerAndUpdate(symbols, 'symbols');
addListenerAndUpdate(numbers, 'numbers');

characterLength.addEventListener('change', function () {
  let newState = characterLength.value;
  updateState('length', newState);
  console.log(getState());
});

function concat(state) {
  let { uppercase, lowercase, symbols, numbers } = state;
  let potentialChars = '';
  if (lowercase) {
    potentialChars += lowercaseChars;
  }
  if (uppercase) {
    potentialChars += uppercaseChars;
  }
  if (symbols) {
    potentialChars += symbolChars;
  }
  if (numbers) {
    potentialChars += numberChars;
  }
  return potentialChars;
}

generate.addEventListener('click', function () {
  let passwordLength = state['length'];
  let charString = concat(state);
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    let character = Math.floor(Math.random() * charString.length);
    password += charString[character];
  }
  console.log(password);
});
