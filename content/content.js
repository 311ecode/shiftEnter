// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software.
(function() {
    function setupItSwapper() {
        if (typeof window.itSwapper_handleKeyDown === 'function') {
            document.addEventListener('keydown', window.itSwapper_handleKeyDown, true);
        } else {
            setTimeout(setupItSwapper, 10);
        }
    }
    setupItSwapper();
})();
