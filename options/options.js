// Copyright © 2025 Imre Toth <tothimre@gmail.com> - Proprietary Software.
const list = document.getElementById('list');

function render() {
    chrome.storage.sync.get(['siteSettings'], (res) => {
        const sites = res.siteSettings || {};
        list.innerHTML = '';
        Object.keys(sites).forEach(site => {
            if (sites[site]) {
                const li = document.createElement('li');
                li.innerHTML = `<span>${site}</span><button class="remove" data-site="${site}">Remove</button>`;
                list.appendChild(li);
            }
        });
    });
}

list.onclick = (e) => {
    if (e.target.classList.contains('remove')) {
        const site = e.target.dataset.site;
        chrome.storage.sync.get(['siteSettings'], (res) => {
            const settings = res.siteSettings || {};
            delete settings[site];
            chrome.storage.sync.set({ siteSettings: settings }, render);
        });
    }
};

render();
