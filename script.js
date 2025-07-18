let firstOperand = '';
let currentOperator = null;
let secondOperand = '';
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('#number');
const operatorButtons = document.querySelectorAll('#operator');
const equalsBtn = document.querySelector('#equalsBtn');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn')
const pointBtn = document.querySelector('#pointBtn')
const previousOperationScreen = document.querySelector('#previousOperation');
const currentOperationScreen = document.querySelector('#currentOperation');

// equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
pointBtn.addEventListener('click', appendPoint);

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent))
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent))
})

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = '0';
    previousOperationScreen.textContent = '';
    firstOperand = '';
    currentOperator = null;
    secondOperand = '';
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentOperationScreen === '') currentOperationScreen.textContent = '0';
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function setOperator(operator) {
    if (!currentOperationScreen.textContent.includes(operator)) 
        currentOperationScreen.textContent += operator;
}

// function operate(firstOperand, currentOperator, secondOperand) {
//     const a = parseFloat(firstOperand);
//     const b = parseFloat(secondOperand);
//     let result;

//     switch (currentOperator) {
//         case '+':
//             result = a + b;
//             break;
//         case '-':
//             result = a - b;
//             break;
//         case '×':
//             result = a * b;
//             break;
//         case '÷':
//             result = b === 0 ? 'Error' : a / b;
//             break;
//         default:
//             result = 0;
//     }
//     return result;
// }
