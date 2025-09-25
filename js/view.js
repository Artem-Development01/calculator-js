// Class for managing the calculator display (View in MVC architecture)
export class View {
  constructor() {
    // initialize the DOM elements

    this.screenCalculator = document.querySelector("#screen-calculator-js");
    this.buttonsCalculator = document.querySelector("#buttons-calculator-js");
  }

  // Method for delegating click events for calculator buttons
  handleEventButtons(callback, modelCalculator) {
    this.buttonsCalculator.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") {
        return; // Ignore non-button clicks
      }

      // Pass the button text to the callback and update the display
      callback(event.target.textContent);

      this.updateScreenCalculator(modelCalculator);
    });
  }

  // Processing keyboard input with mapping keys to calculator symbols
  handleKeyboardEvents(callback, modelCalculator) {
    document.addEventListener("keypress", (event) => {
      const key = event.key;

      // Object for mapping keyboard keys to calculator symbols

      const keyMap = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        ".": ".",
        "-": "-",
        "+": "+",
        "*": "×",
        "/": "÷",
        Enter: "=",
        Backspace: "⌫",
        Escape: "C",
      };

      // Get the corresponding button value for the pressed key
      const buttonValue = keyMap[key];

      // If the key is supported, call the callback and update the display
      if (buttonValue) {
        callback(buttonValue);
        this.updateScreenCalculator(modelCalculator);
      }
    });
  }

  // Update the calculator display contents based on the model state
  updateScreenCalculator(model) {
    let result = model.result;
    let current = model.currentValue;
    let previous = model.previousValue;
    let operation = model.operation;

    if (result) {
      // Result display mode: show only the previous value
      this.screenCalculator.textContent = previous;
    } else {
      // Input mode: show the full expression (previous value + operation + current value)
      this.screenCalculator.textContent =
        `${previous === 0 ? 0 : previous || ""} ${operation || ""} ${
          current || ""
        }`.trim() || "0";
    }
  }
}
