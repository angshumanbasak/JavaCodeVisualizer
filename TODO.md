# Java Code Visualizer — TODO

## Planned Features Roadmap

This document tracks all planned features for the Java Code Visualizer, organized by complexity and priority. Each feature includes a brief description of its purpose and the value it adds to the project.

---

## Quick Wins (Small Effort, Nice Polish) — ✅ ALL COMPLETE

- [x] **Line count & character count in status bar**
  Display total lines, character count, and current cursor position (Ln, Col) at the bottom of the editor pane — gives users immediate awareness of code size and cursor location, just like VS Code.

- [x] **Download code button**
  Toolbar icon button saves the current editor content as a `.java` file named after the class. Also triggered via `Cmd/Ctrl+S`.

- [x] **Fullscreen toggle**
  Toolbar button expands the entire app to browser fullscreen mode. Icon switches between Maximize/Minimize. Also triggered via `F11`.

- [x] **Keyboard shortcuts**
  `Cmd/Ctrl+Enter` (Compile & Run), `Cmd/Ctrl+S` (Download), `Cmd/Ctrl+/` (Toggle comment), `Cmd/Ctrl+Z` (Undo), `Cmd/Ctrl+Shift+Z` (Redo), `Tab` (Indent), `F11` (Fullscreen). Shortcut hints displayed in the status bar.

---

## Medium Features (Meaningful Upgrades) — 3 of 5 COMPLETE

- [x] **Step-through variable diff**
  Before→after diff pills (`13 → 21`), delta badges (`+8`), `NEW` badges for declarations, changes summary header, array cell diff with previous value strikethrough, pulse animations on changed cards.

- [x] **Execution path visualization**
  Green execution stripes in gutter, execution count badges for looped lines, dimmed never-reached lines with "not reached" tags, coverage percentage indicator with mini progress bar in step bar.

- [ ] **Breakpoint-aware auto-play**
  Make auto-play pause at breakpoints instead of stepping through every line — allows users to set breakpoints on interesting lines and "fast-forward" to them, mimicking a real debugger experience.

- [ ] **Multi-tab editor**
  Support opening multiple files simultaneously with tabs in the editor pane — useful when users load several `.java` files from disk and want to switch between them without losing their place.

- [x] **Undo/Redo**
  100-entry history stack with `updateCode()` wrapper, `handleUndo()`/`handleRedo()` navigation, history reset on example/file load. Intercepts browser's native `Cmd+Z`.

---

## Bigger Features (High Impact)

- [ ] **Array/Variable animation**
  When stepping through sorting algorithms like Bubble Sort, animate array cells swapping positions visually (slide left/right with smooth transitions) — makes sorting algorithms come alive and helps users intuitively understand how data moves.

- [ ] **Memory model visualization**
  Show heap vs stack like Python Tutor does, with arrows for references — especially valuable for understanding arrays, object references, and how method calls allocate memory on the stack.

- [ ] **Error explanations**
  When the program hits a runtime error, show a beginner-friendly explanation panel (e.g., "You tried to access index 7 but the array only has 5 elements") — bridges the gap between cryptic error messages and actual understanding.

- [ ] **Code comparison mode**
  Allow pasting two programs side-by-side and comparing their execution (e.g., Bubble Sort vs Selection Sort) — enables visual comparison of step counts, variable changes, and algorithmic behavior, which is powerful for learning algorithm tradeoffs.

- [ ] **Share button**
  Encode the current code and inputs as a URL parameter so users can share a specific program with someone via a link — enables collaboration and makes it easy to share examples in educational settings.

---

## Educational Features

- [ ] **Guided tutorials**
  Build step-by-step walkthroughs like "Understanding For Loops" or "How Recursion Works" that auto-highlight and annotate each step with explanations — transforms the visualizer from a tool into a self-paced learning platform.

- [ ] **Complexity counter**
  Show the total number of operations, comparisons, and swaps at the end of execution — useful for understanding Big-O complexity in practice and comparing the efficiency of different algorithms.

- [ ] **Quiz mode**
  Present code and ask "What will this program output?" — hide the output panel, let the user type their guess, then reveal the actual output with a comparison — reinforces active learning and tests comprehension.

---

## Interpreter Enhancements — 4 of 7 COMPLETE

- [ ] **Multi-line comment support**
  Handle `/* */` block comments spanning multiple lines — currently only single-line `//` comments are fully supported.

- [ ] **Switch/case statements**
  Add `switch`, `case`, `break`, `default` support to the parser and executor — a commonly used control flow construct in Java.

- [ ] **For-each loops**
  Support the enhanced for loop syntax `for (int x : arr)` — widely used in modern Java and cleaner than traditional index-based loops.

- [ ] **Try/catch/finally**
  Add exception handling support — enables programs that gracefully handle errors, which is fundamental to real-world Java programming.

- [x] **ArrayList and HashMap**
  Full ArrayList (16 methods), HashMap (15 methods), StringBuilder (13 methods), Collections (8 static methods) support with proper state snapshots and deep-copying. Also supports `new ArrayList<>(Arrays.asList(...))` constructor pattern.

- [x] **String formatting**
  `String.format()`, `System.out.printf()` with `%d`, `%f`, `%.2f`, `%s`, `%n`, `%%` specifiers.

- [x] **Comprehensive standard library**
  Math (17 methods + PI, E), Integer/Long/Double/Float/Byte/Short (methods + constants + SIZE/BYTES), Character (11 methods), String (17 new instance methods + 3 static), Arrays (8 utility methods), wrapper type declarations, number instance methods (.intValue(), .doubleValue(), etc.).

- [x] **Inline comment stripping**
  `stripInlineComment()` handles `//` comments after statements while preserving `//` inside string literals (e.g., URLs). Applied during parsing before any pattern matching.

---

## UI/UX Improvements

- [ ] **Auto-scroll to current line during execution**
  When stepping through or auto-playing, ensure the current highlighted line is always visible in the editor viewport — prevents the user from losing track of execution in longer programs.

- [ ] **Resizable split pane**
  Allow dragging the divider between the editor and inspection panels to resize them — gives users control over how much space each panel gets based on their focus.

- [ ] **Mobile responsive layout**
  Stack the editor and inspection panels vertically on smaller screens — makes the visualizer usable on tablets and phones.

- [ ] **Syntax error squiggly underlines**
  Show red underlines on lines with syntax errors before compilation — provides immediate feedback while typing, similar to an IDE.

- [ ] **Line wrapping toggle**
  Option to wrap long lines instead of horizontal scrolling — useful for programs with lengthy print statements or deeply nested code.

---

## Completed Features ✓

### Core Engine (v1.0)
- [x] Java Interpreter Engine (primitives, arrays, methods, recursion, control flow)
- [x] Syntax-highlighted code editor with Fira Code font
- [x] Line numbers with clickable breakpoints
- [x] Variables tab with array cell visualization and change highlighting
- [x] Call Stack tab with method hierarchy
- [x] Output tab with console-style display
- [x] Compile Log tab with success/error messages
- [x] Step Forward/Back, Auto Play/Pause, Reset
- [x] Speed slider for auto-play
- [x] 9 built-in example programs with descriptive class names

### UI/Theme (v2.0–v12.0)
- [x] Dark/Light theme toggle with Sun/Moon animation
- [x] Full-width layout fix
- [x] Java logo icon
- [x] Fira Code font, 16px, ligature-free cursor alignment
- [x] Native text selection (word-level copy working)

### File & Input (v4.0–v16.0)
- [x] Open Java File(s) from local machine
- [x] Dynamic file label from class name
- [x] Scanner/keyboard input support (nextInt, nextDouble, nextLine, next, nextBoolean)
- [x] Inline input display in Output tab (inputs appear after prompts)
- [x] Clear button for Output tab

### Quick Wins (v17.0–v18.0)
- [x] Line count, character count, and cursor position in status bar
- [x] Download code as .java file (Cmd/Ctrl+S)
- [x] Fullscreen toggle (F11)
- [x] Keyboard shortcuts (Cmd+Enter, Cmd+S, Cmd+/, Cmd+Z, Cmd+Shift+Z)
- [x] Undo/Redo with 100-entry history stack
- [x] Comment toggling (Cmd+/)
- [x] Status bar shortcut hints

### Medium Features (v19.0–v20.0)
- [x] Step-through variable diff (before→after pills, delta badges, NEW badges, card animations)
- [x] Execution path visualization (green stripes, count badges, dimmed lines, coverage %)

### Interpreter Library (v21.0–v23.0)
- [x] Math: 17 methods + PI, E constants
- [x] Integer: 10 methods + MAX_VALUE, MIN_VALUE, SIZE, BYTES
- [x] Long: 4 methods + constants + SIZE, BYTES
- [x] Double: 6 methods + 5 constants + SIZE, BYTES
- [x] Float/Byte/Short: MAX_VALUE, MIN_VALUE, SIZE, BYTES
- [x] Character: 11 methods
- [x] String: 17 new instance methods + valueOf, join, format static
- [x] StringBuilder: 13 methods (full class)
- [x] ArrayList: 16 methods (full class)
- [x] HashMap: 15 methods (full class)
- [x] Collections: 8 static methods
- [x] Arrays: 8 utility methods (fill, copyOf, copyOfRange, equals, deepEquals, binarySearch, asList, toString)
- [x] System: currentTimeMillis, nanoTime, arraycopy, exit
- [x] System.out.printf with %d, %f, %s, %n, %% specifiers
- [x] Wrapper type declarations (Integer, Double, Long, Float, etc.)
- [x] Number instance methods (.intValue(), .doubleValue(), .longValue(), etc.)
- [x] Inline comment stripping (preserves // inside strings)
- [x] IEEE 754 float division (Infinity, NaN for 1.0/0.0)
- [x] Numeric literal suffixes (L, f, d) and underscore separators (100_000)

### Deployment
- [x] Deployed on GitHub Pages with CI/CD via GitHub Actions

---

*Last updated: May 31, 2026*
