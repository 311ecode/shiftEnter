
# Shift+Enter <-> Enter Swapper Extension

## Parameters
- **No configuration parameters**. The extension works out-of-the-box with no additional settings.

## Features
- Swaps the behavior of `Shift+Enter` and `Enter` key combinations globally.
  - Pressing `Shift+Enter` acts like pressing `Enter`.
  - Pressing `Enter` acts like pressing `Shift+Enter` (typically inserting a newline).
- Works within:
  - Textareas (`<textarea>`)
  - Input fields (`<input>`) - *Note: `Shift+Enter` often has no default behavior here, so pressing `Enter` might not do anything visibly different.*
  - Contenteditable elements (`<div contenteditable="true">`, etc.)

## Installation
1. Download the extension files (including `manifest.json`, `content/content.js`, `popup/popup.html`, `popup/popup.js`, and the `icons` folder).
2. Open your Chrome browser and go to `chrome://extensions`.
3. Enable "Developer mode" using the toggle switch (usually in the top right corner).
4. Click the "Load unpacked" button.
5. Select the directory containing the downloaded extension files (the `shiftEnter` directory).
6. The extension should now be active.

## Usage Examples
- Open any webpage with a `<textarea>` or `<input>` field.
- Type in the field and use the `Enter` key to insert a newline (which typically requires `Shift+Enter`).
- Use `Shift+Enter` to submit the form or move to the next line within multi-line input fields.

## Detailed Information
- This extension intercepts keydown events early (capture phase) and prevents default behavior to simulate the swapped key combination.
- For `Enter` -> `Shift+Enter`, it manually inserts a newline character in textareas and contenteditable elements to ensure consistent behavior, as simply dispatching the `Shift+Enter` event might not always produce a newline depending on the specific website's implementation.

