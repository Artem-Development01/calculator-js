// Calculator model class for managing data and business logic (Model in MVC)
export class CalculatorModel {
  constructor() {
    // Initialize the calculator state
    this.model = {
      currentValue: "",
      previousValue: null,
      operation: null,
      result: false,
    };
  }

  // Main input handling method - determines the action type based on the value
  checkingEvents(value) {
    //Processing numeric input (0-9)
    if (/[0-9]/.test(value)) {
      if (this.model.result === true) {
        this.reset();
      }

      this.updateCurrentValue(value);
    }

    // Handling negative number input
    if (value === "-") {
      if (this.model.result === true) {
        this.reset();
      }

      if (
        this.model.currentValue === "" ||
        (this.model.currentValue.startsWith("-") &&
          this.model.currentValue.length === 1)
      ) {
        this.updateCurrentValue(value);
      }
    }

    // Handling the decimal point
    if (value === ".") {
      if (this.model.result === true) {
        this.reset();
      }
      this.processingDot(value);
    }

    // Processing mathematical operations (+, -, ×, ÷)
    if (/[+\-×÷]/.test(value) && this.model.currentValue !== "-") {
      if (this.model.result === true) {
        this.model.currentValue = "";
        this.model.result = false;
      }
      this.updateOperation(value);
    }

    // Handling special actions
    if (value === "⌫") {
      this.resetCurrentValue();
    }
    if (value === "C") {
      this.reset();
    }
    if (value === "=") {
      this.equals();
    }

    if (value === "%") {
      this.interestProcessing();
    }
  }

  // Method for adding numbers or symbols to the current value
  updateCurrentValue(digit) {
    if (digit === "-") {
      this.model.currentValue = "-";
    } else {
      this.model.currentValue = this.model.currentValue + digit;
    }
  }

  // Processing mathematical operations
  updateOperation(operation) {
    if (this.model.operation && this.model.currentValue === "") {
      this.model.operation = operation;
    }

    if (
      this.model.operation &&
      this.model.previousValue !== null &&
      this.model.currentValue !== ""
    ) {
      this.calculator();
    } else if (this.model.currentValue) {
      this.model.previousValue = parseFloat(this.model.currentValue);
    }
    this.model.currentValue = "";
    this.model.operation = operation;
  }

  // Basic method of mathematical calculations with error handling
  calculator() {
    try {
      switch (this.model.operation) {
        case "+":
          this.model.previousValue =
            parseFloat(this.model.previousValue) +
            parseFloat(this.model.currentValue);
          break;
        case "-":
          this.model.previousValue =
            parseFloat(this.model.previousValue) -
            parseFloat(this.model.currentValue);
          break;
        case "×":
          this.model.previousValue =
            parseFloat(this.model.previousValue) *
            parseFloat(this.model.currentValue);
          break;
        case "÷":
          if (parseFloat(this.model.currentValue) === 0) {
            throw new Error("Division by zero");
          }
          this.model.previousValue =
            parseFloat(this.model.previousValue) /
            parseFloat(this.model.currentValue);
          break;
        default:
          this.model.previousValue = "Unknown Operation";
      }
    } catch (error) {
      this.model.previousValue = "Error";
      this.model.result = true;
    }
  }

  // Remove the last character from the current value (Backspace)
  resetCurrentValue() {
    this.model.currentValue = this.model.currentValue.slice(0, -1);
  }

  // Handle decimal point input
  processingDot(dot) {
    if (
      this.model.currentValue !== "" &&
      this.model.currentValue !== "-" &&
      !this.model.currentValue.includes(".")
    ) {
      this.updateCurrentValue(dot);
    }
  }

  // Method for calculating percentage values
  interestProcessing() {
    if (this.model.operation === null) {
      this.model.previousValue = parseFloat(this.model.currentValue / 100);
    } else {
      switch (this.model.operation) {
        case "+":
          this.model.previousValue =
            (this.model.previousValue / 100) *
              parseFloat(this.model.currentValue) +
            this.model.previousValue;

          break;
        case "-":
          this.model.previousValue =
            this.model.previousValue -
            (this.model.previousValue / 100) *
              parseFloat(this.model.currentValue);
          break;
        case "×":
          this.model.previousValue =
            (this.model.previousValue * parseFloat(this.model.currentValue)) /
            100;
          break;
        case "÷":
          this.model.previousValue =
            (this.model.previousValue / parseFloat(this.model.currentValue)) *
            100;
      }
    }
    this.model.currentValue = "";
    this.model.operation = null;
  }

  // method reset
  reset() {
    this.model.currentValue = "";
    this.model.previousValue = null;
    this.model.operation = null;
    this.model.result = false;
  }
  // method equals
  equals() {
    if (this.model.operation && this.model.currentValue !== "") {
      this.calculator();
      this.model.result = true;
      this.model.currentValue = "";
    }
  }
}
