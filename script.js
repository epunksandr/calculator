let firstOperand = '';
let currentOperation = null;
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

equalsBtn.addEventListener('click', evaluate);
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
        resetScreen()
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
    currentOperation = null;
    secondOperand = '';
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentOperationScreen.textContent === '') currentOperationScreen.textContent = '0';
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function setOperator(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    previousOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperationScreen.textContent === '0' && currentOperation === '÷') {
        alert("Can't divide by 0");
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(operate(firstOperand, currentOperation, secondOperand))
    previousOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;

}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(firstOperand, currentOperation, secondOperand) {
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
    let result;

    switch (currentOperation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '×':
            result = a * b;
            break;
        case '÷':
            result = b === 0 ? 'Error' : a / b;
            break;
        default:
            result = 0;
    }
    return result;
}
