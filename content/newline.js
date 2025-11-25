// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software. See LICENSE file for terms.
// Simplified newline insertion
function insertNewline(target) {
    // Method 1: For standard inputs and textareas
    if (target.value !== undefined) {
        try {
            const start = target.selectionStart || 0;
            const end = target.selectionEnd || start;
            const value = target.value || '';

            target.value = value.substring(0, start) + '\n' + value.substring(end);

            if (target.selectionStart !== undefined) {
                target.selectionStart = target.selectionEnd = start + 1;
            }

            // Dispatch an input event to notify the application
            target.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        } catch (e) {
            console.warn('Failed to insert newline via value manipulation:', e);
        }
    }

    // Method 2: For contenteditable elements or fallback
    try {
        const fakeEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            shiftKey: true,
            bubbles: true,
            cancelable: true,
            composed: true
        });
        target.dispatchEvent(fakeEvent);
    } catch (e) {
        console.warn('Failed to insert newline via event dispatch:', e);
    }
}

window.insertNewline = insertNewline; // Expose for keyHandler.js and potential reuse
