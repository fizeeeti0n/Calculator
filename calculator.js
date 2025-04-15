let currentOperand = '';
let previousOperand = '';
let operation = null;

const currentDisplay = document.getElementById("currentOperand");
const previousDisplay = document.getElementById("previousOperand");

// Function to append number to current operand
function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand += number;
  updateDisplay();
}

// Function to append operator
function appendOperator(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
}

// Function to clear all values
function clearAll() {
  currentOperand = '';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

// Function to delete the last character
function deleteChar() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

// Function to perform calculations
function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/': result = prev / current; break;
    default: return;
  }

  currentOperand = result;
  operation = null;
  previousOperand = '';
  updateDisplay();
}

// Function to update the calculator display
function updateDisplay() {
  currentDisplay.innerText = currentOperand || '0';
  previousDisplay.innerText = operation ? `${previousOperand} ${operation}` : '';
}

// Scientific Mode Toggle
function toggleScientific() {
  const sci = document.getElementById('scientificButtons');
  const calc = document.querySelector('.calculator');
  sci.classList.toggle('hidden');
  calc.style.width = sci.classList.contains('hidden') ? '270px' : '300px';
}

// Function to apply scientific functions
function applyFunction(func) {
  let val = parseFloat(currentOperand);
  if (isNaN(val)) return;

  switch (func) {
    case 'sin': val = Math.sin(val); break;
    case 'cos': val = Math.cos(val); break;
    case 'tan': val = Math.tan(val); break;
    case 'log': val = Math.log10(val); break;
    case 'sqrt': val = Math.sqrt(val); break;
    case 'square': val = val * val; break;
    case 'pi': val = Math.PI; break;
    case 'e': val = Math.E; break;
  }

  currentOperand = val.toFixed(6);
  updateDisplay();
}

// Theme Customizer (Color Palette Picker)
const colorPicker = document.getElementById('themeColor');
colorPicker.addEventListener('input', () => {
  const color = colorPicker.value;
  const hover = lightenColor(color, 20);
  document.documentElement.style.setProperty('--btn-bg', color);
  document.documentElement.style.setProperty('--btn-text', '#fff');
  document.documentElement.style.setProperty('--btn-hover', hover);
  document.documentElement.style.setProperty('--calc-bg', lightenColor(color, 10)); // Background change
  document.querySelector('.calculator').setAttribute('data-theme', 'custom');
});

// Function to lighten a hex color for hover effect
function lightenColor(hex, percent) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
  g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
  b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));

  return `rgb(${r}, ${g}, ${b})`;
}
