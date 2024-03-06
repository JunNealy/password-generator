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
const slider = document.getElementById('myRange');
const output = document.getElementById('slider-value');
const copyConfirm = document.querySelector('.copy-confirm');

console.log(strengthBars);

// state management
let state = {
  length: 12,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  strength: 6,
};

function updateState(option, value) {
  state[option] = value;
}

function getState() {
  return state;
}

//Initialize page
function initializePage() {
  // Checkbox visuals
  uppercase.checked = state.uppercase;
  lowercase.checked = state.lowercase;
  symbols.checked = state.symbols;
  numbers.checked = state.numbers;

  // Slider thumb position
  slider.value = state.length;
  characterLengthDisplay.innerText = state.length;
  output.innerText = state.length;

  updateStrength();
}

// Call initializePage function when the page loads
window.addEventListener('load', initializePage);

//Password Strength
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

//custom range
myRange.addEventListener('change', function () {
  let newState = myRange.value;
  updateState('length', newState);
  characterLengthDisplay.innerText = newState;
  updateStrength();
  console.log(newState);
  console.log(getState());
});

//build password generation string
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

copyButton.addEventListener('click', function () {
  const copyText = passwordOutputString.innerText;
  navigator.clipboard.writeText(copyText);
  copyConfirm.innerText = 'COPIED';
  console.log('copy click');
});

generate.addEventListener('click', function () {
  if (
    !state.uppercase &&
    !state.lowercase &&
    !state.numbers &&
    !state.symbols
  ) {
    updateStrength();
    passwordOutputString.className = 'no-copy';
    passwordOutputString.style.color = '#817d92';
    passwordOutputString.innerText = 'Select at least one option';
    state.strength = 0;
    return;
  }

  passwordOutputString.style.color = '#e6e5ea';
  passwordOutputString.className = '';
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

characterLengthDisplay.innerHTML = slider.value;

slider.oninput = function () {
  characterLengthDisplay.innerHTML = this.value;
  gradientValue = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    'linear-gradient(to right, #a4ffaf 0%, #a4ffaf ' +
    gradientValue +
    '%, #18171f ' +
    gradientValue +
    '%, #18171f 100%)';
};
