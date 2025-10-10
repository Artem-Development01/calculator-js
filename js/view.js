// Class for managing the calculator display (View in MVC architecture)
export class View {
  constructor() {
    // Initialize the DOM elements
    this.body = this.body = document.body;
    this.screenResult = document.querySelector("#screen-result-js");
    this.screenCalculator = document.querySelector("#screen-calculator-js");
    this.buttonsCalculator = document.querySelector("#buttons-calculator-js");
    this.errorMessage = document.querySelector("#error-message-js");
    this.buttonTheme = document.querySelector(".theme");
    // Инициализация темы при запуске
    const savedTheme = localStorage.getItem("calculator-theme");
    console.log(savedTheme);

    if (savedTheme === "light") {
      this.themeSwitching(); // сразу переключаем на светлую если сохранена
    }
    this.buttonTheme.addEventListener("click", (event) => {
      this.themeSwitching();
    });
  }

  // Method for delegating click events for calculator buttons
  handleEventButtons(callback, modelCalculator) {
    // Mapping to convert button text to internal model values
    const buttonMap = {
      "+": "+",
      "-": "-",
      "×": "×",
      "÷": "÷",
      "(": "(",
      ")": ")",
      "=": "=",
      C: "X",
      "⌫": "⌫",
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
      "√": "√",
      "%": "%",
      sin: "S",
      cos: "C",
      tan: "T",
      lg: "㏒",
      ln: "㏑",
    };
    this.buttonsCalculator.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") {
        return; // Ignore non-button clicks
      }

      const buttonText = event.target.textContent;
      const internalValue = buttonMap[buttonText] || buttonText;
      callback(internalValue);
      this.updateScreenCalculator(modelCalculator);
    });
  }

  // Processing keyboard input with mapping keys to calculator symbols
  handleKeyboardEvents(callback, modelCalculator) {
    document.addEventListener("keypress", (event) => {
      const key = event.key;

      // Mapping to convert physical keys to internal model values
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
        ",": ".",
        "-": "-",
        "+": "+",
        "*": "×",
        "/": "÷",
        "(": "(",
        ")": ")",
        Enter: "=",
        "=": "=",
        r: "√",
        R: "√",
        "%": "%",
        s: "S",
        S: "S",
        c: "C",
        C: "C",
        t: "T",
        T: "T",
        l: "㏒",
        L: "㏑",
      };

      // Get the corresponding internal value for the pressed key
      const internalValue = keyMap[key];
      if (internalValue) {
        callback(internalValue);
        this.updateScreenCalculator(modelCalculator);
      }
    });

    // ADDING PROCESSING FOR SPECIAL KEYS (keydown)
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      const specialKeyMap = {
        Backspace: "⌫",
        Delete: "⌫",
        Escape: "X",
        Clear: "X",
      };

      const internalValue = specialKeyMap[key];
      if (internalValue) {
        callback(internalValue);
        this.updateScreenCalculator(modelCalculator);
        // Prevent standard browser behavior (e.g., jumping back in history with Backspace)
        event.preventDefault();
      }
    });
  }

  // Update the calculator display contents based on the model state
  updateScreenCalculator(model) {
    const currentInput = model.currentInput.join("");
    const result = model.result;
    const isValid = model.isValid;
    this.screenCalculator.textContent = currentInput;
    if (!isValid) this.errorMessage.classList.add("show");
    if (isValid && this.errorMessage.classList.contains("show"))
      this.errorMessage.classList.remove("show");
    if (result !== null && !isNaN(result)) {
      this.screenResult.textContent = result;
    } else {
      this.screenResult.textContent = "";
    }
  }
  //Theme switching method
  themeSwitching() {
    if (this.body.getAttribute("data-theme") !== "light") {
      this.body.setAttribute("data-theme", "light");
      this.buttonTheme.textContent = "☀️ Light theme";
      localStorage.setItem("calculator-theme", "light");
    } else {
      this.body.setAttribute("data-theme", "dark");
      this.buttonTheme.textContent = "🌙 Dark theme";
      localStorage.setItem("calculator-theme", "dark");
    }
  }
}
