# ☕ Java Code Visualizer

A browser-based, interactive Java code visualizer that lets you write, compile, and step through Java programs line-by-line — all running entirely in the browser with no backend server required.

Built as a single React component with a custom JavaScript-based Java interpreter.

![Dark Theme](https://img.shields.io/badge/theme-dark-0d1117?style=flat-square)
![Light Theme](https://img.shields.io/badge/theme-light-ffffff?style=flat-square)
![React](https://img.shields.io/badge/react-18+-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/vite-5+-646cff?style=flat-square&logo=vite)

---

## Features

### Code Editor (Left Panel)
- Syntax-highlighted code editor with **Fira Code** monospace font
- Line numbers with clickable **breakpoints** (red dots)
- Current-line highlighting and executed-line markers
- Tab key support (4-space indent)
- Custom line-level selection highlighting
- Dynamic file label derived from `public class ClassName` in the code

### Java Interpreter
- **Primitives:** `int`, `double`, `boolean`, `char`, `String`, `float`, `long`, `short`, `byte`
- **Arrays:** declaration, initialization, access, `.length`
- **Control Flow:** `for`, `while`, `do-while`, `if`/`else if`/`else`, `return`
- **Methods:** declarations, calls, recursion, call stack tracking
- **Operators:** arithmetic, comparison, logical, compound assignment (`+=`, `-=`, etc.), increment/decrement (`++`, `--`)
- **Built-in Methods:** `System.out.println`/`print`, `String` methods (`charAt`, `substring`, `indexOf`, `equals`, `toUpperCase`, `toLowerCase`, `trim`, `contains`, `replace`, `startsWith`, `endsWith`, `isEmpty`, `toCharArray`), `Math` methods (`abs`, `max`, `min`, `sqrt`, `pow`, `random`, `floor`, `ceil`, `round`)
- **Type Casting:** `(int)`, `(double)`, `(char)`
- **Scanner Support:** `Scanner scanner = new Scanner(System.in)` with `nextInt()`, `nextDouble()`, `nextFloat()`, `nextLine()`, `next()`, `nextBoolean()` — interactive keyboard input via the Output panel
- **Error Handling:** infinite loop protection (10K step cap), `ArrayIndexOutOfBoundsException`, `ArithmeticException` (division by zero)

### Inspection Panels (Right Panel)
- **Variables Tab** — Live variable visualization with type labels, current/previous values, change highlighting. Arrays rendered as indexed cell rows with pointer arrows for index variables
- **Call Stack Tab** — Shows the current method call hierarchy with line numbers
- **Output Tab** — Console-style output display with interactive input prompt for Scanner programs. Includes a **Clear** button
- **Compile Log Tab** — Success/error messages with line numbers

### Toolbar
- **Compile & Run** — Executes the full program and jumps to the last step
- **Step Forward / Back** — Navigate through execution states one step at a time
- **Auto Play / Pause** — Automatic stepping with adjustable speed slider
- **Reset** — Clear all execution state
- **Load Example** dropdown — 8 built-in example programs
- **Open Java File(s)** — Load `.java` files from your local machine

### Theming
- **Dark Mode** (default) — GitHub dark-inspired palette with moon icon
- **Light Mode** — Clean light palette with sun icon
- Single animated toggle button with smooth 0.4s transitions across all elements

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js)

### Setup

```bash
# 1. Create a new Vite + React project
npm create vite@latest java-visualizer -- --template react
cd java-visualizer

# 2. Install dependencies
npm install
npm install lucide-react

# 3. Copy the component into the project
cp ~/Downloads/JavaCodeVisualizer.jsx src/JavaCodeVisualizer.jsx
```

### Configure

**Replace `src/App.jsx`** with:

```jsx
import JavaCodeVisualizer from './JavaCodeVisualizer'

function App() {
  return <JavaCodeVisualizer />
}

export default App
```

**Replace `src/index.css`** with:

```css
* {
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
```

**Empty `src/App.css`** — delete all contents (or delete the file and remove its import from `App.jsx`).

**Ensure `src/main.jsx`** looks like:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build    # Creates optimized static files in dist/
npm run preview  # Preview the production build locally
```

---

## Project Structure

```
java-visualizer/
├── public/
├── src/
│   ├── JavaCodeVisualizer.jsx   # Single-file component (~2,930 lines)
│   ├── App.jsx                  # Wrapper component
│   ├── main.jsx                 # React entry point
│   ├── index.css                # Global reset styles
│   └── App.css                  # (empty)
├── index.html
├── package.json
└── vite.config.js
```

### Component Architecture

`JavaCodeVisualizer.jsx` is a self-contained single-file component containing:

| Section | Description |
|---------|-------------|
| `JAVA_LOGO` | Base64-embedded Java icon |
| `JavaInterpreter` class | Tokenizer, parser, expression evaluator, statement executor, state snapshot engine |
| `EXAMPLES` object | 8 built-in Java programs |
| `THEMES` object | Dark and light theme color definitions (~40 tokens each) |
| `highlightJava()` | Regex-based syntax highlighter |
| `JavaCodeVisualizer()` | Main React component with all state, handlers, and JSX |

---

## Built-in Examples

| Program | Concepts Demonstrated |
|---------|----------------------|
| Array Sum & Average | Arrays, loops, arithmetic, type casting, conditionals |
| Bubble Sort | Nested loops, array swapping, comparison logic |
| Fibonacci (Recursive) | Recursion, method calls, return values |
| Factorial (Recursive) | Recursion, multiplication, base cases |
| Binary Search | While loop, divide and conquer, array access |
| String Reversal | String methods, charAt, string concatenation |
| FizzBuzz | Modulo operator, if/else if/else chains |
| Selection Sort | Nested loops, minimum finding, array swapping |

---

## Scanner / User Input

Programs using `java.util.Scanner` are fully supported with interactive input:

```java
import java.util.Scanner;

public class EvenOddChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        if (num % 2 == 0) {
            System.out.println(num + " is an even number.");
        } else {
            System.out.println(num + " is an odd number.");
        }
        scanner.close();
    }
}
```

When you click **Compile & Run**, the program executes until it hits `scanner.nextInt()`, then pauses and shows an input prompt in the Output tab. Type your value, press Enter, and execution continues.

### Supported Scanner Methods

| Method | Input Type |
|--------|-----------|
| `nextInt()` | Integer |
| `nextDouble()` | Decimal number |
| `nextFloat()` | Decimal number |
| `nextLine()` | Full line of text |
| `next()` | Single word |
| `nextBoolean()` | true/false |

---

## Loading Local Files

Click the dropdown button in the toolbar and select **"Open Java File(s)…"** to load `.java` files from your local machine. You can multi-select files with Cmd+Click (Mac) or Ctrl+Click (Windows). Loaded files appear under a "Your Files" section in the dropdown, and you can switch between them.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Insert 4 spaces (indent) |
| Click line number | Toggle breakpoint |

---

## Theme Toggle

Click the animated pill-shaped toggle in the toolbar header to switch between dark and light themes. The toggle shows a **moon** icon in dark mode and a **sun** icon in light mode. All colors — syntax highlighting, backgrounds, borders, overlays, variable cards, array cells — transition smoothly.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18+ | UI framework |
| `react-dom` | 18+ | React DOM renderer |
| `lucide-react` | 0.383+ | Icon library (Play, Pause, Terminal, etc.) |
| `vite` | 5+ | Build tool and dev server |

### External Resources (loaded via CDN)

| Resource | Purpose |
|----------|---------|
| [Google Fonts — Fira Code](https://fonts.google.com/specimen/Fira+Code) | Code editor font |
| [Google Fonts — DM Sans](https://fonts.google.com/specimen/DM+Sans) | UI/label font |

---

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome / Edge | ✅ Full support | File System Access API for file picker |
| Firefox | ✅ Supported | Uses fallback `<input type="file">` for file picker |
| Safari | ✅ Supported | Uses fallback `<input type="file">` for file picker |

---

## Known Limitations

- **Single-class programs only** — the interpreter executes the `main` method of one class; multi-class programs are not supported
- **No multi-line comments spanning lines** — `/* */` comments are handled on a single-line basis
- **No exception handling** — `try`/`catch`/`finally` blocks are not interpreted
- **No switch statements** — `switch`/`case` is not yet implemented
- **No generics or collections** — `ArrayList`, `HashMap`, etc. are not supported
- **No `for-each` loops** — only traditional `for(init; cond; update)` syntax
- **No `static` fields or multiple methods with same name** (no overloading)
- **Floating-point display** — `double` values may show JavaScript floating-point artifacts (e.g., `4.2` → `4.199999999999999`)

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Blank screen / import errors | Ensure `npm install lucide-react` completed successfully |
| App not full-width / cropped edges | Clear `src/App.css` completely; set `#root { width: 100%; height: 100vh; margin: 0; overflow: hidden; }` in `index.css` |
| Code appears centered | Ensure `text-align: center` is not set on `#root` in your CSS |
| Port already in use | Vite auto-picks next port, or run `npm run dev -- --port 3000` |
| File picker doesn't open | Check browser compatibility; Chrome/Edge support `showOpenFilePicker`, others use fallback |

---

## Version History

See [JavaCodeVisualizer_VersionHistory.md](./JavaCodeVisualizer_VersionHistory.md) for the complete development changelog across 11 iterative versions.

---

## License

This project is provided as-is for educational and personal use.

---

## Credits

Built with [React](https://react.dev/), [Vite](https://vite.dev/), [Lucide Icons](https://lucide.dev/), [Fira Code](https://github.com/tonsky/FiraCode), and [DM Sans](https://fonts.google.com/specimen/DM+Sans).
