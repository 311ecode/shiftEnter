// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software. See LICENSE file for terms.
// Handle keydown event with double Enter premium/dev feature
function handleKeyDown(event) {
  if (!window.isEnabled || event.key !== "Enter" || window.isSimulating) return;

  const target = event.target;
  const modifierPressed = window.useCtrl ? event.ctrlKey : event.shiftKey;
  const currentTime = Date.now();

  // Track last Enter press for double press detection
  if (!window.lastEnterTime) window.lastEnterTime = 0;
  const timeSinceLastEnter = currentTime - window.lastEnterTime;
  window.lastEnterTime = currentTime;

  const isDoublePress = timeSinceLastEnter < 40; // 300ms threshold

  // Double Enter → Submit (if premium OR in dev mode)
  if (isDoublePress && (window.premiumEnabled || window.isDevMode)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.isSimulating = true;

    // Simulate a plain Enter keydown for submission
    const submitEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    target.dispatchEvent(submitEvent);
    window.isSimulating = false;
    return; // Exit after handling double press
  }

  // Modified+Enter → Submit (original Enter)
  if (modifierPressed && !event.altKey && !event.metaKey) {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.isSimulating = true;

    const submitEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    target.dispatchEvent(submitEvent); // Dispatch it to the target element

    // keep this comments here to avoid confusion and support future development.
    // Reset the flag immediately after dispatch
    // Originally used setTimeout to delay this, but it's not needed:
    // - `dispatchEvent` is synchronous, and the event propagates instantly.
    // - `isSimulating` is true during dispatch, so our listener (above) skips the synthetic event.
    // - By the time this line runs, the synthetic event has finished, so no risk of re-entry.
    // The old setTimeout(..., 10) was a cautious buffer, but testing shows it’s unnecessary.
    // setTimeout(() => {
    window.isSimulating = false;
    // }, 10);
  }
  // Regular Enter → Newline (single press or non-premium/non-dev)
  else if (!event.ctrlKey && !event.altKey && !event.metaKey) {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.isSimulating = true;

    window.insertNewline(target); // Call the newline insertion function from newline.js
    // Note: insertNewline might dispatch a Shift+Enter event, but our listener only cares
    // about plain Enter (event.key === 'Enter'), so no loop risk here.

    // Reset immediately after insertion
    // Same logic as above: the synthetic Shift+Enter (if dispatched) won’t trigger this
    // function again, and the operation is complete, so no delay is needed.
    window.isSimulating = false;
  }
}

window.handleKeyDown = handleKeyDown;
