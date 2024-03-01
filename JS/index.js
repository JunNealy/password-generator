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
const characterLengthDisplay = document.getElementById(
  'character-length-display'
);
const generate = document.getElementById('generate');
const passwordOutput = document.getElementById('password-output');
const passwordOutputString = document.getElementById('password-output-string');
const copyButton = document.getElementById('copy-btn');
const strengthBarContainer = document.getElementById('strength-bar-container');
const strengthBars = strengthBarContainer.children;

console.log(strengthBars);

// state management
let state = {
  length: 10,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  strength: 6,
};

function calcStrength(state) {
  let str = 0;
  if (state.uppercase) {
    str += 1;
  }
  if (state.lowercase) {
    str += 1;
  }
  if (state.numbers) {
    str += 1;
  }
  if (state.symbols) {
    str += 1;
  }
  if (state.length >= 5) {
    str += 1;
  }
  if (state.length >= 10) {
    str += 1;
  }
  if (state.length >= 15) {
    str += 1;
  }
  if (state.length >= 20) {
    str += 1;
  }
  return str;
}

function updateStrength() {
  state.strength = calcStrength(state);
  for (let i = 0; i < strengthBars.length; i++) {
    strengthBars[i].style.backgroundColor = '';
    strengthBars[i].style.border = '';
  }
  if (state.strength <= 2) {
    strengthBars[0].style.backgroundColor = '#f64a4a';
    strengthBars[0].style.border = '2px solid #f64a4a';
  } else if (state.strength <= 4) {
    for (let i = 0; i < 2; i++) {
      strengthBars[i].style.backgroundColor = '#fb7c58';
      strengthBars[i].style.border = '2px solid #fb7c58';
    }
  } else if (state.strength <= 6) {
    for (let i = 0; i < 3; i++) {
      strengthBars[i].style.backgroundColor = '#ffd966';
      strengthBars[i].style.border = '2px solid #ffd966';
    }
  } else if (state.strength <= 8) {
    for (let i = 0; i < 4; i++) {
      strengthBars[i].style.backgroundColor = '#a4ffaf';
      strengthBars[i].style.border = '2px solid #a4ffaf';
    }
  }
}

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
    updateStrength();
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
  characterLengthDisplay.innerText = newState;
  updateStrength();
  console.log(newState);
  console.log(getState());
});

copyButton.addEventListener('click', function () {
  const copyText = passwordOutputString.innerText;
  navigator.clipboard.writeText(copyText);
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
  updateStrength();
  passwordOutputString.innerText = password;
});
