// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software. See LICENSE file for terms.
document.addEventListener('DOMContentLoaded', function() {
    const mainToggle = document.getElementById('main-toggle');
    const shiftOption = document.getElementById('shift-option');
    const ctrlOption = document.getElementById('ctrl-option');
    const goPremiumLink = document.getElementById('go-premium');
    let currentSite = '';

    // Load initial settings
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = new URL(tabs[0].url);
        currentSite = url.hostname;

        chrome.storage.sync.get(['siteSettings', 'useCtrl', 'premiumEnabled'], function(result) {
            const siteSettings = result.siteSettings || {};
            mainToggle.checked = siteSettings[currentSite] === true;
            if (result.useCtrl) {
                ctrlOption.checked = true;
            } else {
                shiftOption.checked = true;
            }
            // Check dev mode or premium status
            chrome.management.getSelf((info) => {
                if (info.installType === 'development') {
                    goPremiumLink.textContent = 'Premium (Dev Mode)';
                    goPremiumLink.href = '#';
                } else if (result.premiumEnabled) {
                    goPremiumLink.textContent = 'Premium Unlocked';
                    goPremiumLink.href = '#';
                }
            });
        });
    });

    // Save settings when changed
    function saveSettings() {
        chrome.storage.sync.get(['siteSettings'], function(result) {
            const siteSettings = result.siteSettings || {};
            siteSettings[currentSite] = mainToggle.checked;

            chrome.storage.sync.set({
                siteSettings: siteSettings,
                useCtrl: ctrlOption.checked
            }, () => {
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'setEnabledState',
                        enabled: mainToggle.checked,
                        useCtrl: ctrlOption.checked
                    });
                });
            });
        });
    }

    mainToggle.addEventListener('change', saveSettings);
    shiftOption.addEventListener('change', saveSettings);
    ctrlOption.addEventListener('change', saveSettings);

    // Placeholder for premium unlock
    goPremiumLink.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.management.getSelf((info) => {
            if (info.installType !== 'development') {
                alert('Premium feature: Double Enter to send! Coming soon—enabled in dev mode for testing.');
            }
        });
    });
});
