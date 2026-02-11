// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software.
(function() {
    window.itSwapper_isSimulating = false;
    window.itSwapper_isEnabled = false;
    window.itSwapper_useCtrl = false;
    window.itSwapper_premiumEnabled = false;
    window.itSwapper_isDevMode = false;
    window.itSwapper_currentSite = window.location.hostname;

    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === 'setEnabledState') {
            window.itSwapper_isEnabled = request.enabled;
            window.itSwapper_useCtrl = request.useCtrl;
        }
    });

    chrome.storage.sync.get(['siteSettings', 'useCtrl', 'premiumEnabled'], (result) => {
        const siteSettings = result.siteSettings || {};
        window.itSwapper_isEnabled = siteSettings[window.itSwapper_currentSite] === true;
        window.itSwapper_useCtrl = result.useCtrl === true;

        chrome.management.getSelf((info) => {
            window.itSwapper_isDevMode = info.installType === 'development';
            window.itSwapper_premiumEnabled = window.itSwapper_isDevMode || result.premiumEnabled === true;
        });
    });
})();
