import * as verses from './verses.js';

const images = 365;

// Figure out today's index:
const offsetMins = new Date().getTimezoneOffset();
const nowSecsUtc = Date.now()/1000;
const nowSecsLocal = nowSecsUtc - offsetMins*60; // Apply offset so you get a new verse at your midnight.
const index = Math.floor(nowSecsLocal / (24 * 60 * 60));

function main() {
    // Set photo:
    document.getElementById('photo').style.backgroundImage = `url(photos/${index % images}.avif)`;

    // Make topic buttons:
    const topics = document.getElementById('topics');
    for (const t of verses.topics) {
        const b = document.createElement('button');
        b.className = 'topic';
        b.textContent = t.name;
        b.addEventListener('touchstart', () => {}); // Otherwise active doesn't show.
        b.addEventListener('click', () => {
            window.location.hash = t.id;
        });
        topics.appendChild(b);
    }
    
    const back = document.getElementById('back');
    back.addEventListener('touchstart', () => {});
    back.addEventListener('click', () => {
        window.location.hash = undefined;
    });
    
    // Route to the selected topic:
    routerInit();
}
function routerInit() {
    routeToHash();
    window.addEventListener('hashchange', onHashChange);
}
function onHashChange() {
    routeToHash();
}
function routeToHash() {
    const hash = window.location.hash.slice(1);
    const topic = verses.topics.find(t => t.id === hash);
    const hasTopic = !!topic;
    document.getElementById('verse').style.display  = hasTopic ? 'flex' : 'none';
    document.getElementById('topics').style.display = !hasTopic ? 'flex' : 'none';
    if (topic) {
        const verse = topic.verses[index % topic.verses.length];
        document.getElementById('location').textContent = verse.l;
        document.getElementById('text').textContent = verse.t;
    }
}
main();
