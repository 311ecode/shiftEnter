// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software.
document.addEventListener('DOMContentLoaded', function() {
    const mainToggle = document.getElementById('main-toggle');
    const shiftOpt = document.getElementById('shift-opt');
    const ctrlOpt = document.getElementById('ctrl-opt');
    let currentSite = '';

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        currentSite = new URL(tabs[0].url).hostname;
        chrome.storage.sync.get(['siteSettings', 'useCtrl'], (res) => {
            mainToggle.checked = !!(res.siteSettings && res.siteSettings[currentSite]);
            if (res.useCtrl) ctrlOpt.checked = true; else shiftOpt.checked = true;
        });
    });

    function update() {
        chrome.storage.sync.get(['siteSettings'], (res) => {
            const settings = res.siteSettings || {};
            settings[currentSite] = mainToggle.checked;
            chrome.storage.sync.set({ siteSettings: settings, useCtrl: ctrlOpt.checked }, () => {
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'setEnabledState', enabled: mainToggle.checked, useCtrl: ctrlOpt.checked });
                });
            });
        });
    }

    mainToggle.onchange = update;
    shiftOpt.onchange = update;
    ctrlOpt.onchange = update;

    document.getElementById('open-options').onclick = (e) => {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
    };
});
