# Java Code Visualizer — TODO

## Planned Features Roadmap

This document tracks all planned features for the Java Code Visualizer, organized by complexity and priority. Each feature includes a brief description of its purpose and the value it adds to the project.

---

## Quick Wins (Small Effort, Nice Polish)

- [x] **Line count & character count in status bar**
  Display total lines, character count, and current cursor position (Ln, Col) at the bottom of the editor pane — gives users immediate awareness of code size and cursor location, just like VS Code.

- [x] **Download code button**
  Add a toolbar button to save the current editor content as a `.java` file to the user's machine — eliminates the need to manually copy-paste code out of the visualizer.

- [x] **Fullscreen toggle**
  Add a button to expand the editor or the entire app to fullscreen mode — provides a distraction-free environment for focused coding and visualization.

- [x] **Keyboard shortcuts**
  Implement common editor shortcuts: `Cmd/Ctrl+Enter` to Compile & Run, `Cmd/Ctrl+S` to download the file, `Cmd/Ctrl+/` to toggle line comments, `Cmd/Ctrl+Z` / `Cmd/Ctrl+Shift+Z` for undo/redo — accelerates workflow for power users and makes the editor feel professional.

---

## Medium Features (Meaningful Upgrades)

- [ ] **Step-through variable diff**
  When stepping forward or backward, highlight exactly which variable changed with a before→after animation (not just showing current values) — makes it immediately obvious what each line of code did to the program state.

- [ ] **Execution path visualization**
  Add a minimap or margin indicator showing which lines were executed vs skipped (e.g., greyed-out lines that were never reached) — helps users understand control flow, especially in programs with conditionals and early returns.

- [ ] **Breakpoint-aware auto-play**
  Make auto-play pause at breakpoints instead of stepping through every line — allows users to set breakpoints on interesting lines and "fast-forward" to them, mimicking a real debugger experience.

- [ ] **Multi-tab editor**
  Support opening multiple files simultaneously with tabs in the editor pane — useful when users load several `.java` files from disk and want to switch between them without losing their place.

- [ ] **Undo/Redo**
  Implement `Cmd/Ctrl+Z` for undo and `Cmd/Ctrl+Shift+Z` for redo in the code editor — essential for a comfortable editing experience, especially when experimenting with code changes.

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

## Interpreter Enhancements

- [ ] **Multi-line comment support**
  Handle `/* */` block comments spanning multiple lines — currently only single-line `//` comments are fully supported.

- [ ] **Switch/case statements**
  Add `switch`, `case`, `break`, `default` support to the parser and executor — a commonly used control flow construct in Java.

- [ ] **For-each loops**
  Support the enhanced for loop syntax `for (int x : arr)` — widely used in modern Java and cleaner than traditional index-based loops.

- [ ] **Try/catch/finally**
  Add exception handling support — enables programs that gracefully handle errors, which is fundamental to real-world Java programming.

- [ ] **ArrayList and HashMap**
  Add basic support for `ArrayList` and `HashMap` from `java.util` — the most commonly used Java collections that students encounter early on.

- [ ] **String formatting**
  Support `String.format()` and `System.out.printf()` — commonly used in Java for formatted output.

- [ ] **Multiple classes / static methods across classes**
  Allow programs with helper classes or utility methods defined outside `main` — enables more realistic Java program structures.

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

- [x] Java Interpreter Engine (primitives, arrays, methods, recursion, control flow)
- [x] Dark/Light theme toggle with Sun/Moon animation
- [x] Syntax-highlighted code editor with Fira Code font
- [x] Line numbers with clickable breakpoints
- [x] Variables tab with array cell visualization and change highlighting
- [x] Call Stack tab with method hierarchy
- [x] Output tab with console-style display
- [x] Compile Log tab with success/error messages
- [x] Step Forward/Back, Auto Play/Pause, Reset
- [x] Speed slider for auto-play
- [x] 9 built-in example programs with descriptive class names
- [x] Scanner/keyboard input support (nextInt, nextDouble, nextLine, next, nextBoolean)
- [x] Inline input display in Output tab (inputs appear after prompts)
- [x] Open Java File(s) from local machine
- [x] Dynamic file label from class name
- [x] Java logo icon
- [x] Clear button for Output tab
- [x] Line count, character count, and cursor position in status bar
- [x] Deployed on GitHub Pages with CI/CD via GitHub Actions

---

*Last updated: May 30, 2026*
