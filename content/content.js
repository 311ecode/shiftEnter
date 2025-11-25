// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software. See LICENSE file for terms.
  function setupKeyListener() {
      if (typeof window.handleKeyDown === 'function') {
          document.addEventListener('keydown', window.handleKeyDown, true);
      } else {
          setTimeout(setupKeyListener, 10);
      }
  }
  setupKeyListener();
