# Shift+Enter <-> Enter Swapper Extension

## Features
- **Key Swapping**: Swaps the behavior of `Shift+Enter` and `Enter` globally on enabled sites.
  - Pressing `Enter` inserts a newline (simulating `Shift+Enter`).
  - Pressing `Shift+Enter` (or `Ctrl+Enter`) submits/performs the default Enter action.
- **Site-Specific Control**: Toggle the extension on or off for individual domains via the popup or options page.
- **Configurable Modifier**: Choose between using `Shift+Enter` or `Ctrl+Enter` as the "Submit" trigger.
- **Premium Feature (Double Enter)**: Rapidly pressing `Enter` twice sends the message/form (Available in Dev Mode or for Premium users).
- **Broad Compatibility**: Works in `<textarea>`, `<input>`, and `contenteditable` elements.

## Installation
1. Download the extension files into a folder (e.g., `shiftEnter`).
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select your folder.

## Usage
- Click the extension icon in the toolbar to enable the swapper for the current site.
- Use the radio buttons in the popup to switch between `Shift` and `Ctrl` as your modifier.
- Go to the **Options** page to manage your list of saved sites or manually add new ones.

## Technical Details
- **Capture Phase Interception**: The extension listens for events in the capture phase to ensure it can `preventDefault()` before site-specific scripts trigger.
- **Manual Injection**: Since some sites ignore synthetic `Shift+Enter` events, the extension manually calculates cursor position and injects `\n` into the string for textareas.
