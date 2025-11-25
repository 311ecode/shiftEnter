// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software. See LICENSE file for terms.
document.addEventListener('DOMContentLoaded', function() {
    const sitesList = document.getElementById('sites-list');
    const newSiteInput = document.getElementById('new-site-input');
    const addSiteBtn = document.getElementById('add-site-btn');

    // Load and display all sites
    chrome.storage.sync.get(['siteSettings'], function(result) {
        const siteSettings = result.siteSettings || {};
        updateSitesList(siteSettings);
    });

    // Function to update the sites list
    function updateSitesList(siteSettings) {
        sitesList.innerHTML = ''; // Clear existing list
        const sites = Object.entries(siteSettings)
            .map(([site, enabled]) => ({ site, enabled }))
            .sort((a, b) => a.site.localeCompare(b.site)); // Sort alphabetically

        if (sites.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No sites configured yet';
            li.className = 'empty';
            sitesList.appendChild(li);
        } else {
            sites.forEach(({ site, enabled }) => {
                const li = document.createElement('li');

                // Site name
                const siteSpan = document.createElement('span');
                siteSpan.textContent = site;

                // Action buttons
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'site-actions';

                const toggleBtn = document.createElement('button');
                toggleBtn.textContent = enabled ? 'Deactivate' : 'Activate';
                toggleBtn.className = 'toggle-btn ' + (enabled ? 'active' : 'inactive');
                toggleBtn.onclick = () => toggleSite(site, !enabled);

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.className = 'remove-btn';
                removeBtn.onclick = () => removeSite(site);

                actionsDiv.appendChild(toggleBtn);
                actionsDiv.appendChild(removeBtn);

                li.appendChild(siteSpan);
                li.appendChild(actionsDiv);
                sitesList.appendChild(li);
            });
        }
    }

    // Toggle a site's enabled state
    function toggleSite(site, enable) {
        chrome.storage.sync.get(['siteSettings'], function(result) {
            const siteSettings = result.siteSettings || {};
            siteSettings[site] = enable;
            chrome.storage.sync.set({ siteSettings }, () => {
                updateSitesList(siteSettings); // Refresh list
            });
        });
    }

    // Remove a site from settings
    function removeSite(site) {
        chrome.storage.sync.get(['siteSettings'], function(result) {
            const siteSettings = result.siteSettings || {};
            delete siteSettings[site];
            chrome.storage.sync.set({ siteSettings }, () => {
                updateSitesList(siteSettings); // Refresh list
            });
        });
    }

    // Add a new site
    addSiteBtn.onclick = () => {
        const newSite = newSiteInput.value.trim();
        if (newSite) {
            chrome.storage.sync.get(['siteSettings'], function(result) {
                const siteSettings = result.siteSettings || {};
                if (!(newSite in siteSettings)) { // Avoid overwriting existing
                    siteSettings[newSite] = true; // Default to enabled
                    chrome.storage.sync.set({ siteSettings }, () => {
                        updateSitesList(siteSettings);
                        newSiteInput.value = ''; // Clear input
                    });
                }
            });
        }
    };

    // Listen for storage changes to refresh dynamically
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'sync' && changes.siteSettings) {
            updateSitesList(changes.siteSettings.newValue || {});
        }
    });
});
