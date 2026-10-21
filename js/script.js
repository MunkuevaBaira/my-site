// ====================================================
// 1. АКТУАЛЬНЫЙ ГОД В ПОДВАЛЕ
// ====================================================
const yearEl = document.querySelector('#year');
yearEl.textContent = new Date().getFullYear();


// ====================================================
// 2. ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ
//    JS переключает класс на <html>, а стили описаны в CSS
// ====================================================
const themeBtn = document.querySelector('#theme-toggle');

themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
});


// ====================================================
// 3. ОТПРАВКА ФОРМЫ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ
// ====================================================
const form = document.querySelector('form');
const statusMsg = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
    event.preventDefault();        // отменяем перезагрузку

    const name = document.querySelector('#name').value.trim();

    statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
    statusMsg.classList.add('visible');

    form.reset();                  // очищаем поля
});


// ====================================================
// 4. КНОПКА «НАВЕРХ» ПОЯВЛЯЕТСЯ ПРИ ПРОКРУТКЕ
// ====================================================
const upBtn = document.querySelector('#to-top');

window.addEventListener('scroll', () => {
    upBtn.classList.toggle('visible', window.scrollY > 400);
});

upBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// ==================================================
// 5. ПАНЕЛЬ ДЛЯ СЛАБОВИДЯЩИХ
// ==================================================
const accToggle = document.querySelector('#accessibility-toggle');
const accPanel = document.querySelector('#accessibility-panel');
const accClose = document.querySelector('#acc-close');
const htmlEl = document.documentElement;

if (accToggle && accPanel && accClose) {
    accToggle.addEventListener('click', () => {
        accPanel.classList.add('open');
        accPanel.setAttribute('aria-hidden', 'false');
    });
    accClose.addEventListener('click', () => {
        accPanel.classList.remove('open');
        accPanel.setAttribute('aria-hidden', 'true');
    });
}

let currentFontSize = 16;
document.querySelector('#acc-font-up').addEventListener('click', () => {
    if (currentFontSize < 32) { currentFontSize += 2; htmlEl.style.setProperty('--base-font-size', `${currentFontSize}px`); }
});
document.querySelector('#acc-font-down').addEventListener('click', () => {
    if (currentFontSize > 12) { currentFontSize -= 2; htmlEl.style.setProperty('--base-font-size', `${currentFontSize}px`); }
});
document.querySelector('#acc-font-reset').addEventListener('click', () => {
    currentFontSize = 16; htmlEl.style.setProperty('--base-font-size', `16px`);
});

document.querySelectorAll('.acc-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        htmlEl.classList.remove('theme-bw', 'theme-wb', 'theme-bb');
        const theme = btn.getAttribute('data-theme');
        if (theme === 'bw') htmlEl.classList.add('theme-bw');
        if (theme === 'wb') htmlEl.classList.add('theme-wb');
        if (theme === 'bb') htmlEl.classList.add('theme-bb');
    });
});

const imgToggle = document.querySelector('#acc-images');
imgToggle.addEventListener('change', (e) => {
    if (e.target.checked) htmlEl.classList.add('hide-images');
    else htmlEl.classList.remove('hide-images');
});

const speechToggle = document.querySelector('#acc-speech');
let isSpeechEnabled = false;
speechToggle.addEventListener('change', (e) => { isSpeechEnabled = e.target.checked; });

function speakText(text) {
    if (!isSpeechEnabled || !text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    window.speechSynthesis.speak(utterance);
}

document.querySelectorAll('h1, h2, h3, p, li, a, button, label').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const textToSpeak = el.tagName === 'BUTTON' && el.title ? el.title : el.textContent;
        speakText(textToSpeak);
    });
});

document.querySelector('#acc-reset-all').addEventListener('click', () => {
    currentFontSize = 16; htmlEl.style.setProperty('--base-font-size', `16px`);
    htmlEl.classList.remove('theme-bw', 'theme-wb', 'theme-bb', 'hide-images');
    imgToggle.checked = false; speechToggle.checked = false; isSpeechEnabled = false;
    window.speechSynthesis.cancel();
});