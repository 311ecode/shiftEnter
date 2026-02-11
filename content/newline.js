// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software.
window.itSwapper_insertNewline = function(target) {
    target.focus();
    // Primary method for modern reactive sites (Gemini, ChatGPT)
    const inserted = document.execCommand('insertText', false, '\n');
    if (inserted) return;

    // Fallback for standard textareas
    if (target.value !== undefined) {
        try {
            const start = target.selectionStart || 0;
            const end = target.selectionEnd || start;
            target.value = target.value.substring(0, start) + '\n' + target.value.substring(end);
            target.selectionStart = target.selectionEnd = start + 1;
            target.dispatchEvent(new Event('input', { bubbles: true }));
            target.dispatchEvent(new Event('change', { bubbles: true }));
            return;
        } catch (e) { console.warn('itSwapper: Newline fallback failed', e); }
    }

    // Final fallback
    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true }));
};
