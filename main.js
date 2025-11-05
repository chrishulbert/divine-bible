import * as verses from './verses.js';

const images = 365;

function main() {
    const offsetMins = new Date().getTimezoneOffset();
    const nowSecsUtc = Date.now()/1000;
    const nowSecsLocal = nowSecsUtc - offsetMins*60; // Apply offset so you get a new verse at your midnight.
    const index = Math.floor(nowSecsLocal / (24 * 60 * 60));
    document.getElementById('photo').style.backgroundImage = `url(photos/${index % images}.avif)`;
    const verse = verses.healing[index % verses.healing.length];
    document.getElementById('location').textContent = verse.l;
    document.getElementById('text').textContent = verse.t;
}

main();
