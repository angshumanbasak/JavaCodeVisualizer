# ☕ Java Code Visualizer

A browser-based, interactive Java code visualizer that lets you write, compile, and step through Java programs line-by-line — all running entirely in the browser with no backend server required.

Built as a single React component with a custom JavaScript-based Java interpreter, inspired by tools like [Python Tutor](https://pythontutor.com/).

![Dark Theme](https://img.shields.io/badge/theme-dark-0d1117?style=flat-square)
![Light Theme](https://img.shields.io/badge/theme-light-ffffff?style=flat-square)
![React](https://img.shields.io/badge/react-18+-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/vite-5+-646cff?style=flat-square&logo=vite)

---

## Features

### Code Editor (Left Panel)
- Syntax-highlighted code editor with **Fira Code** monospace font (16px)
- Line numbers with clickable **breakpoints** (red dots)
- Current-line highlighting and **execution path visualization** (green stripes, count badges)
- **Never-reached lines** dimmed with "not reached" tags after execution
- **Coverage indicator** showing percentage of code lines executed
- Tab key support (4-space indent)
- Native word-level text selection and copy
- Dynamic file label derived from `public class ClassName` in the code
- **Status bar** with cursor position (Ln, Col), line count, character count, and keyboard shortcut hints

### Java Interpreter Engine
The interpreter supports a comprehensive subset of the Java language and standard library:

**Language Features:**
- **Primitives:** `int`, `double`, `boolean`, `char`, `String`, `float`, `long`, `short`, `byte`
- **Wrapper types:** `Integer`, `Double`, `Long`, `Float`, `Short`, `Byte`, `Boolean`, `Character`, `Object`, `var`
- **Arrays:** declaration, initialization (`{1,2,3}` and `new int[N]`), access, `.length`
- **Control Flow:** `for`, `while`, `do-while`, `if`/`else if`/`else`, `return`
- **Methods:** declarations, calls, recursion, call stack tracking
- **Operators:** arithmetic, comparison, logical, compound assignment (`+=`, `-=`, etc.), increment/decrement (`++`, `--`)
- **Type Casting:** `(int)`, `(double)`, `(char)` with correct operator precedence
- **Numeric literals:** `L`/`l` suffix (long), `f`/`F` (float), `d`/`D` (double), underscore separators (`100_000`)
- **IEEE 754:** `1.0 / 0.0` → `Infinity`, `0.0 / 0.0` → `NaN` (integer division by zero still throws)
- **Inline comments:** `//` comments after statements are stripped during parsing (preserves `//` inside strings)

**Standard Library (~150 methods):**

| Class | Methods |
|-------|---------|
| **System.out** | `println()`, `print()`, `printf()` with `%d`, `%f`, `%.2f`, `%s`, `%n`, `%%` |
| **Scanner** | `nextInt()`, `nextDouble()`, `nextFloat()`, `nextLine()`, `next()`, `nextBoolean()` |
| **Math** | `abs`, `max`, `min`, `sqrt`, `pow`, `random`, `floor`, `ceil`, `round`, `log`, `log10`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`, `toRadians`, `toDegrees`, `signum`, `cbrt`, `exp`, `hypot` + `PI`, `E` |
| **String** | `length`, `charAt`, `substring`, `indexOf`, `lastIndexOf`, `equals`, `equalsIgnoreCase`, `compareTo`, `compareToIgnoreCase`, `toUpperCase`, `toLowerCase`, `trim`, `strip`, `stripLeading`, `stripTrailing`, `contains`, `replace`, `replaceAll`, `replaceFirst`, `startsWith`, `endsWith`, `isEmpty`, `isBlank`, `toCharArray`, `split`, `concat`, `matches`, `codePointAt`, `hashCode`, `getBytes`, `repeat` + `String.valueOf()`, `String.join()`, `String.format()` |
| **Integer** | `parseInt`, `valueOf`, `toString`, `toBinaryString`, `toHexString`, `toOctalString`, `compare`, `max`, `min`, `sum` + `MAX_VALUE`, `MIN_VALUE`, `SIZE`, `BYTES` |
| **Long** | `parseLong`, `valueOf`, `toString`, `compare` + `MAX_VALUE`, `MIN_VALUE`, `SIZE`, `BYTES` |
| **Double** | `parseDouble`, `valueOf`, `toString`, `isNaN`, `isInfinite`, `compare` + `MAX_VALUE`, `MIN_VALUE`, `POSITIVE_INFINITY`, `NEGATIVE_INFINITY`, `NaN`, `SIZE`, `BYTES` |
| **Float/Byte/Short** | `MAX_VALUE`, `MIN_VALUE`, `SIZE`, `BYTES` constants |
| **Character** | `isLetter`, `isDigit`, `isLetterOrDigit`, `isUpperCase`, `isLowerCase`, `toUpperCase`, `toLowerCase`, `isWhitespace`, `isAlphabetic`, `compare`, `getNumericValue` |
| **Number wrappers** | `.intValue()`, `.doubleValue()`, `.floatValue()`, `.longValue()`, `.shortValue()`, `.byteValue()`, `.toString()`, `.compareTo()`, `.equals()`, `.hashCode()` |
| **Arrays** | `toString`, `sort`, `fill`, `copyOf`, `copyOfRange`, `equals`, `deepEquals`, `binarySearch`, `asList` |
| **ArrayList** | `add`, `get`, `set`, `remove`, `size`, `isEmpty`, `contains`, `indexOf`, `lastIndexOf`, `clear`, `toArray`, `subList`, `addAll`, `sort`, `toString`, `forEach` |
| **HashMap** | `put`, `get`, `getOrDefault`, `remove`, `containsKey`, `containsValue`, `size`, `isEmpty`, `clear`, `keySet`, `values`, `entrySet`, `putIfAbsent`, `replace`, `toString` |
| **StringBuilder** | `append`, `insert`, `delete`, `deleteCharAt`, `replace`, `reverse`, `toString`, `length`, `charAt`, `substring`, `indexOf`, `capacity`, `setCharAt` |
| **Collections** | `sort`, `reverse`, `max`, `min`, `frequency`, `swap`, `fill`, `unmodifiableList` |
| **System** | `currentTimeMillis`, `nanoTime`, `arraycopy`, `exit` |

**Error Handling:** infinite loop protection (10K step cap), `ArrayIndexOutOfBoundsException`, `ArithmeticException` (integer division by zero only)

### Inspection Panels (Right Panel)

- **Variables Tab** — Live variable visualization with:
  - **Step-through diff:** `13 → 21` before→after pills with delta badges (`+8` / `-3`)
  - **NEW badge** for freshly declared variables
  - **Changes summary header:** "⚡ 2 changes on this step: sum, i"
  - Array cells with index pointers, change highlighting, and previous value strikethrough
- **Call Stack Tab** — Current method call hierarchy with line numbers
- **Output Tab** — Console-style output with inline Scanner input display and **Clear** button
- **Compile Log Tab** — Success/error messages with line numbers

### Toolbar
- **Compile & Run** — Executes the full program and jumps to the last step
- **Step Forward / Back** — Navigate through execution states one step at a time
- **Auto Play / Pause** — Automatic stepping with adjustable speed slider
- **Reset** — Clear all execution state
- **Download** — Save current code as `.java` file
- **Fullscreen** — Toggle browser fullscreen mode
- **Load Example** dropdown — 9 built-in example programs
- **Open Java File(s)** — Load `.java` files from your local machine

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Enter` | Compile & Run |
| `Cmd/Ctrl + S` | Download as .java file |
| `Cmd/Ctrl + /` | Toggle line comment (`//`) |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Tab` | Insert 4 spaces |
| `F11` | Toggle fullscreen |
| Click line number | Toggle breakpoint |

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
│   ├── JavaCodeVisualizer.jsx   # Single-file component (~4,010 lines)
│   ├── App.jsx                  # Wrapper component
│   ├── main.jsx                 # React entry point
│   ├── index.css                # Global reset styles
│   └── App.css                  # (empty)
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── TODO.md
└── JavaCodeVisualizer_VersionHistory.md
```

### Component Architecture

`JavaCodeVisualizer.jsx` is a self-contained single-file component containing:

| Section | Description |
|---------|-------------|
| `JAVA_LOGO` | Base64-embedded Java icon |
| `JavaInterpreter` class | Tokenizer, parser, expression evaluator, statement executor, state snapshot engine, ~150 standard library methods |
| `EXAMPLES` object | 9 built-in Java programs |
| `THEMES` object | Dark and light theme color definitions (~40 tokens each) |
| `highlightJava()` | Regex-based syntax highlighter |
| `JavaCodeVisualizer()` | Main React component with state, handlers, diff engine, execution path tracker, and JSX |

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
| Grade Calculator (Scanner) | Scanner input (nextLine, nextInt), for loop, if/else if/else, type casting |

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

When you click **Compile & Run**, the program executes until it hits `scanner.nextInt()`, then pauses and shows an input prompt in the Output tab. Type your value, press Enter, and execution continues. User inputs appear **inline** after their prompts, matching real terminal behavior.

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

## Collections Support

The interpreter supports the most commonly used Java collections:

```java
// ArrayList
ArrayList<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");
System.out.println(list.toString());   // [Hello, World]

// ArrayList with initial values
ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(40, 10, 30));
Collections.sort(nums);
System.out.println(nums.toString());   // [10, 30, 40]

// HashMap
HashMap<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
System.out.println(map.get("a"));      // 1

// StringBuilder
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
sb.reverse();
System.out.println(sb.toString());     // dlroW olleH
```

---

## Step-Through Variable Diff

When stepping through code, the Variables tab shows exactly what changed:

- **Before→After pills:** `sum: 13 → 21` with green-highlighted diff
- **Delta badges:** `+8` (green) or `-3` (red) for numeric changes
- **NEW badge:** freshly declared variables marked with blue `NEW` pill
- **Changes summary:** "⚡ 2 changes on this step: sum, i" at the top
- **Array cell diff:** changed cells flash and show previous value as strikethrough above

---

## Execution Path Visualization

After running a program, the editor shows the execution path:

- **Green stripes** on the left gutter for every executed line
- **Count badges** for lines hit multiple times in loops (e.g., `5`, `12`)
- **Dimmed lines** (30% opacity) for code that was never reached
- **"not reached" tags** on skipped conditional branches
- **Coverage %** in the step bar showing how much of the code was executed

---

## Loading Local Files

Click the dropdown button in the toolbar and select **"Open Java File(s)…"** to load `.java` files from your local machine. You can multi-select files with Cmd+Click (Mac) or Ctrl+Click (Windows). Loaded files appear under a "Your Files" section in the dropdown.

---

## Theme Toggle

Click the animated pill-shaped toggle in the toolbar header to switch between dark and light themes. The toggle shows a **moon** icon in dark mode and a **sun** icon in light mode. All colors — syntax highlighting, backgrounds, borders, overlays, variable cards, array cells — transition smoothly.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18+ | UI framework |
| `react-dom` | 18+ | React DOM renderer |
| `lucide-react` | 0.383+ | Icon library (Play, Pause, Download, Maximize, etc.) |
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
- **No multi-line comments** — `/* */` comments spanning multiple lines are not yet handled (single-line `//` comments work, including inline)
- **No exception handling** — `try`/`catch`/`finally` blocks are not interpreted
- **No switch statements** — `switch`/`case` is not yet implemented
- **No for-each loops** — only traditional `for(init; cond; update)` syntax
- **No generics validation** — generic type parameters are accepted syntactically but not type-checked
- **No `static` fields or method overloading**
- **Floating-point display** — `double` values may show JavaScript floating-point artifacts

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Blank screen / import errors | Ensure `npm install lucide-react` completed successfully |
| App not full-width / cropped edges | Clear `src/App.css` completely; set `#root { width: 100%; height: 100vh; margin: 0; overflow: hidden; }` in `index.css` |
| Code appears centered | Ensure `text-align: center` is not set on `#root` in your CSS |
| Port already in use | Vite auto-picks next port, or run `npm run dev -- --port 3000` |
| File picker doesn't open | Check browser compatibility; Chrome/Edge support `showOpenFilePicker`, others use fallback |
| `undefined` in output | Check for inline `//` comments on the affected line (should be fixed in v22+) |

---

## Version History

See [JavaCodeVisualizer_VersionHistory.md](./JavaCodeVisualizer_VersionHistory.md) for the complete development changelog across 23 iterative versions.

---

## Roadmap

See [TODO.md](./TODO.md) for the full planned features roadmap including upcoming items like breakpoint-aware auto-play, array swap animations, memory model visualization, guided tutorials, and more.

---

## License

This project is provided as-is for educational and personal use.

---

## Credits

Built with [React](https://react.dev/), [Vite](https://vite.dev/), [Lucide Icons](https://lucide.dev/), [Fira Code](https://github.com/tonsky/FiraCode), and [DM Sans](https://fonts.google.com/specimen/DM+Sans).
