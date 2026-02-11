// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software.
function itSwapper_handleKeyDown(event) {
    if (!window.itSwapper_isEnabled || event.key !== "Enter" || window.itSwapper_isSimulating) return;

    const target = event.target;
    const modifierPressed = window.itSwapper_useCtrl ? event.ctrlKey : event.shiftKey;
    const currentTime = Date.now();

    if (!window.itSwapper_lastEnterTime) window.itSwapper_lastEnterTime = 0;
    const timeSinceLastEnter = currentTime - window.itSwapper_lastEnterTime;
    window.itSwapper_lastEnterTime = currentTime;

    const isDoublePress = timeSinceLastEnter > 50 && timeSinceLastEnter < 250;

    // Submit Action (Double Enter OR Modified Enter)
    if ((isDoublePress && window.itSwapper_premiumEnabled) || (modifierPressed && !event.altKey && !event.metaKey)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.itSwapper_isSimulating = true;
        target.dispatchEvent(new KeyboardEvent("keydown", {
            key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, composed: true, cancelable: true
        }));
        window.itSwapper_isSimulating = false;
        return;
    }

    // Newline Action (Regular Enter)
    if (!event.ctrlKey && !event.altKey && !event.metaKey) {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.itSwapper_isSimulating = true;
        window.itSwapper_insertNewline(target);
        window.itSwapper_isSimulating = false;
    }
}
window.itSwapper_handleKeyDown = itSwapper_handleKeyDown;
