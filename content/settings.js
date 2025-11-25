// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software. See LICENSE file for terms.
window.isSimulating = false;
window.isEnabled = false; // Default OFF for any site
window.useCtrl = false;
window.premiumEnabled = false; // Default to non-premium unless in dev mode
window.isDevMode = false; // Flag for developer mode
window.currentSite = window.location.hostname;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'setEnabledState') {
        window.isEnabled = request.enabled;
        window.useCtrl = request.useCtrl;
    }
});

// Load site-specific settings and premium/dev status on startup
chrome.storage.sync.get(['siteSettings', 'useCtrl', 'premiumEnabled'], (result) => {
    const siteSettings = result.siteSettings || {};
    window.isEnabled = siteSettings[window.currentSite] === true;
    window.useCtrl = result.useCtrl === true;

    // Check if in developer mode to enable premium features
    chrome.management.getSelf((info) => {
        window.isDevMode = info.installType === 'development'; // Set global flag
        if (window.isDevMode) {
            window.premiumEnabled = true; // Enable premium in dev mode
        } else {
            window.premiumEnabled = result.premiumEnabled === true; // Use stored value otherwise
        }
    });
});
