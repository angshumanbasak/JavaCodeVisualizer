# Java Code Visualizer — Version History

## Development Timeline (May 23–28, 2026)

This document lists every version of `JavaCodeVisualizer.jsx` produced during the iterative development process, along with the changes made in each version.

---

### v1.0 — Initial Build (Dark Theme Only)
**Lines:** ~2,276 | **Date:** May 23, 2026

The foundational version built from the prompt spec and reference screenshot.

- **Java Interpreter Engine** — Full JS-based Java interpreter with tokenizer, parser, and executor
- **Supported Java features:** primitives (int, double, boolean, char, String), arrays, method declarations/calls/recursion, for/while/do-while loops, if/else if/else, return statements, System.out.println/print, String methods, Math methods, type casting
- **UI:** Dark theme (GitHub dark-style), split-pane layout (50/50), Source Code Pro + DM Sans fonts
- **Editor:** Line numbers, syntax highlighting, breakpoints (click gutter), current-line highlighting, executed-line markers
- **Tabs:** Variables (with array cell visualization), Call Stack, Output (console-style), Compile Log
- **Toolbar:** Compile & Run, Step Forward/Back, Auto Play/Pause, Reset, speed slider, Load Example dropdown
- **8 Example Programs:** Array Sum & Average, Bubble Sort, Fibonacci (Recursive), Factorial (Recursive), Binary Search, String Reversal, FizzBuzz, Selection Sort

---

### v2.0 — Dark/Light Theme Toggle
**Lines:** ~2,442 | **Date:** May 24, 2026

Added a centralized theme system with a toggle button.

- **THEMES object** — Centralized dark and light theme definitions with ~40 color tokens each (backgrounds, borders, text, accents, syntax colors, overlays)
- **Toggle button** — Pill-shaped slider with animated knob (spring cubic-bezier), Sun/Moon lucide icons
- **isDark state** — Boolean toggle driving all colors via `const t = isDark ? THEMES.dark : THEMES.light`
- **All ~94 hardcoded colors replaced** with `t.xxx` theme references
- **Smooth transitions** — `transition: background 0.4s, color 0.4s` on key containers
- Added `Sun, Moon` to lucide-react imports

---

### v3.0 — Full-Width Layout Fix
**Lines:** ~2,442 | **Date:** May 24, 2026

Fixed the app being cropped/not full-width due to Vite's default CSS.

- Added `textAlign: 'left'` to root container (overrides `#root { text-align: center }` from index.css)
- Documented the fix for `#root` in index.css (width: 100%, height: 100vh, overflow: hidden)

---

### v4.0 — Open Local Folder + Open Java File(s)
**Lines:** ~2,589 → ~2,639 | **Date:** May 24, 2026

Added ability to load local Java files from disk.

- **handleLoadFolder** — Uses `showDirectoryPicker` API to select a folder, reads all `.java` files
- **handleLoadFiles** — Uses `showOpenFilePicker` for individual `.java` file selection
- **localFiles state** — Stores `{filename: content}` map of loaded files
- **activeFileName state** — Tracks currently selected file
- **Dropdown redesigned** — Three sections: "Open Java File(s)…", "Your Files" (with active highlighting), "Built-in Examples"
- **File label** — Editor tab and toolbar button show the active file name
- Added `FolderOpen, FilePlus2` to lucide imports
- **handleReset fix** — Moved `handleReset` before `handleLoadFolder` to fix "Cannot access before initialization" error

---

### v5.0 — Removed Open Local Folder (kept Open Java File(s) only)
**Lines:** ~2,639 | **Date:** May 24, 2026

Simplified the file loading UI.

- Removed `handleLoadFolder` function and "Open Local Folder…" button
- Removed `FolderOpen` import
- Kept only "Open Java File(s)…" option

---

### v6.0 — Text Selection Fix (Custom Selection System)
**Lines:** ~2,648 | **Date:** May 24, 2026

Fixed the jagged/misaligned text selection caused by textarea-overlay mismatch.

- **Native textarea selection hidden** — `::selection { background: transparent }` on both WebKit and Firefox
- **Custom selection rendering** — `handleSelect` callback converts textarea `selectionStart/End` to line numbers
- **selRange state** — Tracks selected line range
- **Overlay highlights** — Selected lines get a clean full-width blue tint
- **overlayScrollRef** — Synchronized scrolling between textarea and overlay
- **Textarea repositioned** — `left: 55px` with `padding: 0 16px` to match overlay's 3px border + 52px gutter + 16px padding = 71px

---

### v7.0 — Scanner/User Input Support + Clear Button
**Lines:** ~2,850 | **Date:** May 24, 2026

Major feature: interactive keyboard input for Scanner programs.

- **Interpreter changes:**
  - `inputQueue` and `inputIndex` added to interpreter state
  - Scanner declaration (`Scanner scanner = new Scanner(System.in)`) recognized as no-op, stores `__scanner__` marker
  - `scanner.close()` recognized as no-op
  - `import` statements skipped
  - Scanner methods (`nextInt`, `nextDouble`, `nextFloat`, `nextLine`, `next`, `nextBoolean`) throw `input_required` error when queue exhausted
  - `run()` method accepts `inputQueue` parameter, returns `{ waiting: true, inputType, ... }` on input needed
  - Input queue restored after `parse()` calls (which internally calls `reset()`)
- **propMatch fix** — `propMatch` regex was stealing `scanner.nextInt()` before `methodCallMatch` could handle it; fixed by only matching when no trailing `()`
- **if/else parsing fix** — `} else {` on same line was breaking brace counting; fixed with character-level scanning that stops at first `braceCount === 0`
- **Component changes:**
  - `userInputs`, `waitingForInput`, `inputPromptType`, `currentInput`, `inputRef` states added
  - `runProgram` shared function handles normal execution and input-waiting
  - `handleSubmitInput` — collects input and re-runs program with accumulated inputs
  - **Orange input prompt** — appears at bottom of Output tab with type label, input field, Submit button
  - **Pulsing orange dot** on Output tab when waiting for input
  - **Clear button** — appears in tab bar when Output tab is active
  - Added `Trash2, Send` to lucide imports

---

### v8.0 — Dynamic Class Name in File Label
**Lines:** ~2,855 | **Date:** May 24, 2026

File tab automatically shows the class name from the code.

- **derivedFileName** — `useMemo` extracts class name via `code.match(/public\s+class\s+(\w+)/)`
- **displayFileName** — Shows `activeFileName` (from loaded file) or `derivedFileName` (from code) or `Main.java` fallback
- Both editor tab label and toolbar dropdown button use `displayFileName`

---

### v9.0 — Java Logo Icon
**Lines:** ~2,860 | **Date:** May 24, 2026

Replaced the gradient "J" box with the actual Java logo.

- **JAVA_LOGO constant** — Base64-encoded data URI of the uploaded `javaicon.png`
- Gradient `<div>J</div>` replaced with `<img src={JAVA_LOGO}>` (36x36, borderRadius: 8, objectFit: cover)

---

### v10.0 — Fira Code Font + Larger Size
**Lines:** ~2,921 | **Date:** May 24, 2026

Changed the code font to Fira Code and increased size.

- **Google Fonts import** — Switched from `Source+Code+Pro` to `Fira+Code`
- **All `Source Code Pro` references** replaced with `Fira Code`
- **Code font size** — 14px → 16px in editor textarea, overlay, and input field
- **Line height** — 24px → 28px across overlay lines, textarea, and gutter
- **Console output** — 13px → 14px

---

### v11.0 — Cursor Alignment Fix
**Lines:** ~2,931 | **Date:** May 24, 2026

Fixed cursor misalignment after font size increase.

- **Ligatures disabled** — `font-variant-ligatures: none` on both textarea and overlay code divs
- **Explicit font rendering** — `letter-spacing: 0px`, `word-spacing: 0px`, `font-feature-settings: normal`, `text-rendering: auto` on both layers
- **Editor container font reset** — `font: 16px/28px "Fira Code", monospace` on parent div to override inherited `index.css` styles
- Ensures textarea invisible text and overlay visible text render characters at identical monospace widths

---

### v12.0 — Copy/Selection Fix (Native Selection Restored)
**Lines:** ~2,901 | **Date:** May 28, 2026

Fixed word-level copy not working — selecting a single word was highlighting the entire line and copying the full line content.

- **Root cause** — The custom line-level selection system (introduced in v6.0) highlighted entire lines when any text on that line was selected. The native textarea `::selection` was hidden (`background: transparent`), so users couldn't see or copy individual words
- **Native textarea selection restored** — `::selection` changed from `transparent` back to `rgba(56,139,253,0.3)` with `color: transparent`, enabling proper character/word-level selection highlighting
- **Custom selection system removed:**
  - Removed `selRange` state and `handleSelect` callback
  - Removed `isSelected` variable from overlay line rendering
  - Removed `onSelect`, `onMouseUp`, `onKeyUp` event handlers from textarea
  - Removed line-level selection background color logic from overlay
- **Why this works now** — The cursor alignment fixes from v11.0 (ligature disabling, font sync, explicit font rendering) mean the native textarea selection now aligns properly with the visible overlay code, making the custom system unnecessary
- Double-click to select a word, drag to select partial text, and Cmd/Ctrl+C copies exactly what is selected

---

### v13.0 — Interpreter Bug Fixes (Chained Subtraction + Type Cast)
**Lines:** ~2,927 | **Date:** May 28, 2026

Fixed two expression evaluator bugs that caused Bubble Sort to produce unsorted output and Array Sum to show wrong average.

- **Bug 1 — Chained subtraction:** `n - i - 1` returned `undefined` because `splitOnOperator(expr, '-')` produced 3 parts but the handler only accepted exactly 2 (`parts.length === 2`). The inner for loop condition `j < n - i - 1` was always `false`, so the swap code never executed. Fix: subtraction handler now processes any number of parts left-to-right using a loop
- **Bug 2 — Type cast precedence:** `(double) sum / numbers.length` was parsed as `(double) (sum / numbers.length)` — integer division happened first (`21 / 5 = 4`), then the cast (`4.0`). Average showed `4` instead of `4.2`, and the conditional incorrectly printed "Below threshold." Fix: cast handler now detects arithmetic operators after the cast target and applies the cast to only the first operand before performing the operation (`21.0 / 5 = 4.2`)
- All 8 built-in examples verified working after fixes

---

### v14.0 (Final) — Example Programs Renamed with Descriptive Class Names
**Lines:** ~2,928 | **Date:** May 28, 2026

Replaced `public class Main` in all 8 built-in example programs with descriptive class names.

- **ArraySumAverage** — Array Sum & Average
- **BubbleSort** — Bubble Sort
- **Fibonacci** — Fibonacci (Recursive)
- **Factorial** — Factorial (Recursive)
- **BinarySearch** — Binary Search
- **StringReversal** — String Reversal
- **FizzBuzz** — FizzBuzz
- **SelectionSort** — Selection Sort
- File label now shows `BubbleSort.java`, `Fibonacci.java`, etc. instead of `Main.java`
- Call Stack tab shows class-contextual names (e.g. `Fibonacci.main(String[] args)`)
- The `derivedFileName` logic (from v8.0) automatically picks up the new class names
- All 8 examples tested and verified working with renamed classes

---

## Summary Table

| Version | Key Change | Lines |
|---------|-----------|-------|
| v1.0 | Initial build — interpreter, dark theme, 8 examples | ~2,276 |
| v2.0 | Dark/Light theme toggle with Sun/Moon button | ~2,442 |
| v3.0 | Full-width layout fix (text-align: left) | ~2,442 |
| v4.0 | Local folder + file loading | ~2,639 |
| v5.0 | Removed folder picker, kept file picker only | ~2,639 |
| v6.0 | Custom selection system (fixed jagged highlights) | ~2,648 |
| v7.0 | Scanner input support + Clear button + if/else fix | ~2,850 |
| v8.0 | Dynamic class name in file label | ~2,855 |
| v9.0 | Java logo icon (base64 embedded) | ~2,860 |
| v10.0 | Fira Code font, 16px size, 28px line height | ~2,921 |
| v11.0 | Cursor alignment fix (ligatures disabled, font sync) | ~2,931 |
| v12.0 | Copy/selection fix (native selection restored) | ~2,901 |
| v13.0 | Interpreter fixes (chained subtraction + type cast) | ~2,927 |
| v14.0 | Example programs renamed with descriptive class names | ~2,928 |
