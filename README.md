## ✨ About the Project

This calculator was created as a demonstration of skills acquired during 10 months of web development study. Main focus - clean architecture, accessibility, and responsive design.

### 🌟 Key Features

- **🎯 Full accessibility** (ARIA attributes, keyboard input, screen readers)
- **📱 Responsive design** (Mobile-first approach)
- **🏗 MVC Architecture** (Clean separation of concerns)
- **⚡ Vanilla JavaScript** (ES6+ no dependencies)
- **🎨 Custom design** (CSS variables, gradients)

## 🚀 Functionality

### Basic Operations
- ✅ Addition, subtraction, multiplication, division
- ✅ Working with negative numbers
- ✅ Decimal fractions
- ✅ Percentage calculations
- ✅ Clear and backspace

### Implementation Features
- Error handling (division by zero)
- Keyboard input support
- Dynamic display updates
- Input validation

## 🛠 Technologies

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 (Grid, Flexbox, Custom Properties)
- **Architecture**: MVC Pattern
- **Accessibility**: ARIA, Semantic HTML
- **Build Tool**: Native ES Modules

## 📁 Project Structure
calculator/
├── index.html # Main HTML with semantic markup
├── style.css # Styles with CSS variables
├── js/
│ ├── app.js # Main application file
│ ├── view.js # View component
│ └── model.js # Data model component
└── README.md # Documentation

text

## 🎯 MVC Architecture
Model (CalculatorModel) → Data management and logic
View (View) → Display and event handling
Controller (App) → Coordination between Model and View

text

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/ArtemSergeevich/calculator.git
2. Open in browser
bash
# Simply open index.html in browser
# Or use Live Server in VS Code
3. Use the calculator
Mouse clicks on buttons

Keyboard input (0-9, +, -, *, /, Enter, Escape)

Full mobile device support

⌨️ Keyboard Controls
Key	Action
0-9	Digits
+ - * /	Operations
.	Decimal point
Enter	Equals
Escape	Clear (C)
Backspace	Delete (⌫)
📱 Responsive Design
Mobile devices (up to 500px) - compact layout

Tablets (500px-1000px) - enlarged buttons

Desktop (1000px+) - fixed width 600px

🌈 Code Features
Accessibility
html
<main role="application" aria-label="Calculator">
<section aria-live="polite" aria-atomic="true">
Architecture
javascript
// Clean separation into Model-View
class CalculatorModel { /* Logic */ }
class View { /* Display */ }
class App { /* Coordination */ }
Styling
css
/* CSS variables for theming */
:root {
    --primary-color: #0e9e58;
    --button-gradient: linear-gradient(...);
}
🎓 What I Learned
During 10 months of learning I mastered:

JavaScript: ES6+, Classes, Modules, Event Handling

CSS: Grid, Flexbox, Responsive Design, Variables

HTML5: Semantic Tags, Accessibility

Architecture: MVC Pattern, Separation of Concerns

Tools: Git, VS Code, Chrome DevTools

🔮 Future Plans
Add calculation history

Implement scientific functions

Add dark theme

Create PWA version

Write unit tests

🤝 Contributing
This is an educational project, but I'm open to suggestions and feedback! If you have ideas for improvement - feel free to create an issue or pull request.

Acknowledgments DeepSeek AI assistant for project setup assistance and Git guidance.

📄 License
MIT License - feel free to use for learning and inspiration.
