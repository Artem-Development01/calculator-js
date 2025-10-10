// Calculator model class for managing data and business logic (Model in MVC)
export class CalculatorModel {
  constructor() {
    // Initialize the calculator state
    this.model = {
      currentInput: [],
      parseInt: [],
      RPN: [],
      result: null,
      isValid: true,
    };
  }

  parenthesisCount = 0;

  // operators - all operators that are parsed separately:
  operators = [
    "+",
    "-",
    "×",
    "÷",
    "(",
    ")",
    "√",
    "%",
    "C",
    "S",
    "T",
    "㏒",
    "㏑",
  ];

  //unaryOperators - only unary operators
  unaryOperators = ["√", "%", "C", "S", "T", "㏒", "㏑"];

  // Main input handling method - determines the action type based on the value
  handlingInput(value) {
    if (value === "⌫") {
      this.backspaceEvent(this.model.currentInput);
      return;
    }
    if (value === "X") {
      this.clearEvent();
      return;
    }
    if (value === "=") {
      console.log(this.model.result);
      if (![null, "", NaN, undefined].includes(this.model.result)) {
        this.equalsEvent(this.model.result);
      }
      return;
    }
    this.isValidateCalculatorInput(value);
    if (this.model.isValid && value !== "Clear") {
      this.model.parseInt = this.parseArray(this.model.currentInput);
      this.model.parseInt = this.parseArrayMinus(this.model.parseInt);
      this.model.RPN = this.marshallingYard(this.model.parseInt);
      this.model.result = this.calculator(this.model.RPN);
    }
    console.log(this.model);
  }

  //input validation for the calculator
  isValidateCalculatorInput(value) {
    const lastInput = this.model.currentInput.at(-1);
    switch (true) {
      // CASE 1: INVALID CHARACTERS
      case value === "":
      case !/[0-9.]/.test(value) &&
        !this.operators.includes(value) &&
        !this.unaryOperators.includes(value):
        this.model.isValid = false;
        return;

      // CASE 2: OPENING BRACKET "("
      case value === "(":
        // Possible: after operators, opening parentheses, unary operators, or at the beginning
        if (
          ["+", "-", "×", "÷"].includes(lastInput) ||
          lastInput === "(" ||
          this.unaryOperators.includes(lastInput) ||
          lastInput === undefined
        ) {
          this.model.currentInput.push(value);
          //we count the number of staples for their correct validation
          this.parenthesisCount++;
          this.model.isValid = true;
        } else {
          this.model.isValid = false;
        }
        return;

      // CASE 3: CLOSING BRACKET ")"
      case value === ")":
        // Possible: after numbers, closing brackets AND if there are open brackets
        if (
          (/[0-9]/.test(lastInput) || lastInput === ")") &&
          this.parenthesisCount > 0
        ) {
          this.model.currentInput.push(value);
          //we count the number of parentheses for their correct validation
          this.parenthesisCount--;
          this.model.isValid = true;
        } else {
          this.model.isValid = false;
        }
        return;

      // CASE 4: BINARY OPERATORS (+, -, ×, ÷)
      case ["+", "-", "×", "÷"].includes(value):
        if (value === "-" && lastInput === "-") break;
        // Можно: после чисел или закрывающих скобок или %
        if (/[0-9%]/.test(lastInput) || lastInput === ")") {
          this.model.currentInput.push(value);
          this.model.isValid = true;
        }
        // Possible: after numbers or closing brackets or %
        else if (
          value === "-" &&
          (lastInput === undefined ||
            ["+", "-", "×", "÷", "("].includes(lastInput) ||
            this.unaryOperators.includes(lastInput))
        ) {
          this.model.currentInput.push(value);
          this.model.isValid = true;
        } else {
          this.model.isValid = false;
        }
        return;

      // CASE 5: UNARY OPERATORS WITH RIGHT-HAND OPERAND (√, C, S, T,"㏒", "㏑")
      case ["√", "C", "S", "T", "㏒", "㏑"].includes(value):
        // Possible: after operators, opening parentheses or at the beginning
        if (
          ["+", "-", "×", "÷"].includes(lastInput) ||
          lastInput === "(" ||
          lastInput === undefined
        ) {
          this.model.currentInput.push(value);
          this.model.isValid = true;
        } else {
          this.model.isValid = false;
        }
        return;

      // CASE 6: UNARY OPERATORS WITH LEFT OPERAND (%)
      case ["%"].includes(value):
        // Possible: after numbers OR closing brackets
        if (/[0-9]/.test(lastInput) || lastInput === ")") {
          this.model.currentInput.push(value);
          this.model.isValid = true;
        } else {
          this.model.isValid = false;
        }
        return;

      // CASE 7: NUMBERS (0-9)
      case /[0-9]/.test(value):
        // You can always
        this.model.currentInput.push(value);
        this.model.isValid = true;
        return;

      // CASE 8: DECIMAL POINT "."
      case value === ".":
        // Possible: if the current number does not yet have a dot AND after the number or at the beginning of the number
        const currentNumber = this.getCurrentNumber();
        if (
          !currentNumber.includes(".") &&
          (/[0-9]/.test(lastInput) || lastInput === undefined)
        ) {
          this.model.currentInput.push(value);
          this.model.isValid = true;
        } else {
          this.model.isValid = false;
        }
        return;

      // CASE 9: ANY OTHER VALID SYMBOL (fallback)
      default:
        if (
          this.operators.includes(value) ||
          this.unaryOperators.includes(value)
        ) {
          this.model.currentInput.push(value);
          this.model.isValid = true;
        } else {
          this.model.isValid = false;
        }
    }
  }

  // Helper method for getting the current number
  getCurrentNumber() {
    let number = "";
    for (let i = this.model.currentInput.length - 1; i >= 0; i--) {
      if (/[0-9.]/.test(this.model.currentInput[i])) {
        number = this.model.currentInput[i] + number;
      } else {
        break;
      }
    }
    return number;
  }
  //Method for converting an array of strings to an array of numbers and operators
  parseArray(arr) {
    const result = [];
    let currentNumber = "";

    arr.forEach((element, index, array) => {
      // If it's a digit or a dot, add it to the number
      if (/[0-9.]/.test(element)) {
        currentNumber += element;
        // If the next element is not a digit or a period, we store the number
        const nextElement = array[index + 1];
        if (nextElement && !/[0-9.]/.test(nextElement)) {
          result.push(Number(currentNumber));
          currentNumber = "";
        }
      }
      // If there is an operator, we add it immediately
      else if (this.operators.includes(element)) {
        result.push(element);
      }
    });

    // Add the last number if there is one left
    if (currentNumber !== "") {
      result.push(Number(currentNumber));
    }

    return result;
  }

  //parsing unary minus
  parseArrayMinus(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const next = arr[i + 1];

      // Check for unary minus
      if (current === "-" && next !== undefined && !isNaN(Number(next))) {
        const prev = result[result.length - 1];
        const isUnary = i === 0 || (prev && this.operators.includes(prev));

        if (isUnary) {
          result.push(Number(current + next));
          i++; // Skip the next element
          continue;
        }
      }

      // Regular element
      result.push(current);
    }

    return result;
  }
  // Marshalling yard algorithm

  marshallingYard(arr) {
    let result = [];
    let stack = [];

    const precedence = {
      "+": 1,
      "-": 1,
      "×": 2,
      "÷": 2,
      "√": 3,
      "%": 3,
      C: 3,
      S: 3,
      T: 3,
      "㏒": 3,
      "㏑": 3,
    };

    arr.forEach((element) => {
      if (!isNaN(Number(element))) {
        result.push(element);
      } else if (element === "(") {
        stack.push(element);
      } else if (element === ")") {
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          result.push(stack.pop());
        }
        stack.pop();
      } else {
        // Process operators by priority
        while (
          stack.length > 0 &&
          precedence[stack[stack.length - 1]] >= precedence[element]
        ) {
          result.push(stack.pop());
        }
        stack.push(element);
      }
    });

    // Add the remaining operators from the stack
    result.push(...stack.reverse());
    return result;
  }
  // Calculation method
  calculator(arr) {
    let stack = [];

    arr.forEach((element) => {
      if (!isNaN(Number(element))) {
        stack.push(element);
      } else {
        // Determine whether the operation is unary or binary
        const isUnary = this.unaryOperators.includes(element);

        if (isUnary) {
          // Unary operations: take only one operand
          const a = stack.pop();
          switch (element) {
            case "√":
              stack.push(Math.sqrt(a));
              break;
            case "%":
              stack.push(a / 100);
              break;
            case "S":
              stack.push(Math.sin(a));
              break;
            case "C":
              stack.push(Math.cos(a));
              break;
            case "T":
              stack.push(Math.tan(a));
              break;
            case "㏒":
              stack.push(Math.log10(a));
              break;
            case "㏑":
              stack.push(Math.log(a));
              break;
          }
        } else {
          // Binary operations: take two operands
          const b = stack.pop();
          const a = stack.pop();
          switch (element) {
            case "+":
              stack.push(a + b);
              break;
            case "-":
              stack.push(a - b);
              break;
            case "×":
              stack.push(a * b);
              break;
            case "÷":
              //division by zero test
              if (b === 0) {
                this.model.isValid = false;
                return;
              }
              stack.push(a / b);
              break;
          }
        }
      }
    });

    return stack[0];
  }

  //method to remove the last element
  backspaceEvent() {
    if (this.model.currentInput.length > 0) {
      const lastChar = this.model.currentInput.pop();

      // Update the bracket counter
      if (lastChar === "(") this.parenthesisCount--;
      else if (lastChar === ")") this.parenthesisCount++;

      // Recalculate the result
      if (this.model.currentInput.length > 0) {
        this.model.parseInt = this.parseArray(this.model.currentInput);
        this.model.parseInt = this.parseArrayMinus(this.model.parseInt);
        this.model.RPN = this.marshallingYard(this.model.parseInt);
        this.model.result = this.calculator(this.model.RPN);
      } else {
        this.model.result = null;
      }
    }
  }

  //complete cleaning
  clearEvent() {
    this.model.currentInput = [];
    this.model.parseInt = [];
    this.model.RPN = [];
    this.model.result = null;
    this.parenthesisCount = 0;
    this.model.isValid = true;
  }

  //processing method "="
  equalsEvent(result) {
    this.model.currentInput = [result?.toString() || ""];
    this.model.parseInt = [];
    this.model.RPN = [];
    this.model.result = result;
    this.parenthesisCount = 0;
  }
}
