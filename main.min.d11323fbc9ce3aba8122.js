/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Variables

var display = document.querySelectorAll('.display')[0];
var modifierButtons = document.querySelectorAll('.modifier-btn');
var numberButtons = document.querySelectorAll('.number-btn');
var operatorButtons = document.querySelectorAll('.operator-btn');
var equalsButton = document.querySelectorAll('.equals-btn')[0];
var clearButton = document.querySelectorAll('.clear-btn')[0];

var nextNum = '';
var result = '';
var currentOperator;
var clearDisplay = false;
var operatorPressed = false;

// Events

for (var i = 0; i < modifierButtons.length; i++) {
  modifierButtons[i].onclick = modifyInput;
}

for (var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].onclick = inputNumberToDisplay;
}

for (var i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].onclick = setOperator;
}

equalsButton.onclick = function () {
  performCalculation();
  result = '';
};

clearButton.onclick = clear;

// Functions

/**
 * Modify numbers in the calculator display
 */
function modifyInput() {
  var modifier = this.getAttribute('data-mod');
  switch (modifier) {
    case 'posneg':
      display.value = parseFloat(display.value) * -1;
      break;
    case 'percentage':
      display.value = parseFloat(display.value) / 100;
      break;
  }
}

/**
 * Input numbers in calculator display
 */
function inputNumberToDisplay() {
  // Clear the display for new numbers
  if (clearDisplay) {
    // Store the display value as result when an operator is pressed
    if (operatorPressed) {
      result = display.value;
    }
    display.value = 0;
    clearDisplay = false;
  }

  // Validate our input
  var num = this.getAttribute('data-num');
  display.value = validateInput(num);

  // Our result is stored, so display value is the next number we need
  // to perform our calculation
  if (operatorPressed) {
    nextNum = display.value;
  }

  clearButton.innerHTML = 'C';
}

/**
 * Validate the input so that there is no leading zeroes and only
 * single decimal point is allowed
 */
function validateInput(num) {
  var newDisplay = display.value + num;

  // Restrict input to 10 characters
  if (newDisplay.length > 10) {
    return display.value;
  }

  // Allows only a single decimal point
  if (!newDisplay.match(/^([0-9]+.[0-9]*)$/)) {
    return display.value;
  }

  // Removes leading zeroes (0543 becomes 543)
  if (newDisplay.match(/^(0\d+.?\d*)$/)) {
    newDisplay = newDisplay.substring(1);
  }

  return newDisplay;
}

/**
 * Set operator for calculation
 */
function setOperator() {
  clearOperator();
  currentOperator = this;

  // Having both a stored result and newly inserted number performs a calculation
  // When pressing an operator
  if (result && nextNum) {
    performCalculation();
  }

  nextNum = undefined;
  operatorPressed = true;
  clearDisplay = true;
}

/**
 * Clear selected operator
 */
function clearOperator() {
  if (currentOperator) {
    currentOperator.className = 'btn operator-btn';
    currentOperator = undefined;
  }
}

/**
 * Perform the calculation and display the result
 */
function performCalculation() {
  if (!currentOperator) {
    return;
  }

  // Precautions from performing calculations with undefined
  if (!nextNum) {
    nextNum = display.value;
  }
  if (!result) {
    result = display.value;
  }

  // Convert the values from string to floats
  result = parseFloat(result);
  nextNum = parseFloat(nextNum);

  // Perform the calculation depending on operator set and store the result
  switch (currentOperator.getAttribute('data-op')) {
    case 'add':
      result += nextNum;
      break;
    case 'subtract':
      result -= nextNum;
      break;
    case 'multiply':
      result *= nextNum;
      break;
    case 'divide':
      result /= nextNum;
      break;
  }

  // The display value shows the result (with 10 character limit)
  display.value = result;
  display.value = display.value.substring(0, 10);
  operatorPressed = false;
  clearDisplay = true;
}

/**
 * Reset everything to default
 */
function clear() {
  clearOperator();
  display.value = '0';
  clearDisplay = false;
  nextNum = '';
  result = '';
  clearButton.innerHTML = 'AC';
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);