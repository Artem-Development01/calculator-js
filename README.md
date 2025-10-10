# Calculator v2.0 - Educational Project

A JavaScript calculator implementing MVC architecture with mathematical expression parsing.

## Key Features

- Basic operations: +, -, ×, ÷, parentheses
- Advanced functions: sin, cos, tan, lg, ln, √
- Percentage handling: n% = n/100 (100 + 10% = 100.1)
- Shunting yard algorithm for expression parsing
- Dark/light theme switching
- Full keyboard support
- Responsive design

## Technical Implementation

- **Architecture**: MVC pattern
- **Algorithm**: Shunting yard for RPN conversion
- **Validation**: Input sequence validation
- **Accessibility**: ARIA labels, keyboard navigation

## Usage

**Web version**: https://artem-development01.github.io/calculator-js/

**Local development**:
```bash
git clone https://github.com/Artem-Development01/calculator-js.git
open index.html
```
## Project Structure
```
js/
├── app.js      # Controller
├── view.js     # View (UI handling)
└── model.js    # Model (business logic)
```
