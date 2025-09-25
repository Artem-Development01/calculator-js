// Importing View and Model classes for MVC architecture
import { View } from "./view.js";
import { CalculatorModel } from "./Model.js";

// The main application class that binds Model and View
class App {
  constructor() {
    // Initialization of MVC architecture components
    this.calculatorModel = new CalculatorModel();
    this.view = new View();
    // Processing clicks on calculator buttons
    this.view.handleEventButtons(
      this.bindEvent.bind(this),
      this.calculatorModel.model
    );
    // Processing keyboard input
    this.view.handleKeyboardEvents(
      this.bindEvent.bind(this),
      this.calculatorModel.model
    );
  }

  // Bridge method between View and Model
  // Receives events from View and passes them to Model for processing
  bindEvent(buttonText) {
    this.calculatorModel.checkingEvents(buttonText);
  }
  // Helper method for getting the current state of the model (for debugging)
  getCalculatorModel() {
    return this.calculatorModel.model;
  }
}

// Create and launch an application instance
const app = new App();
