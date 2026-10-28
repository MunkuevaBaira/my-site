// ==================================================
// 1. АКТУАЛЬНЫЙ ГОД
// ==================================================
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==================================================
// 2. ТЕМНАЯ ТЕМА
// ==================================================
const themeBtn = document.querySelector('#theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
    });
}

// ==================================================
// 3. ОТПРАВКА ФОРМЫ БЕЗ ПЕРЕЗАГРУЗКИ (FormSubmit)
// ==================================================
const form = document.querySelector('#contact-form');
const statusMsg = document.querySelector('#form-status');

if (form && statusMsg) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Отменяем перезагрузку

        const nameInput = document.querySelector('#name');
        const name = nameInput ? nameInput.value.trim() : '';

        if (!name) {
            statusMsg.textContent = 'Пожалуйста, укажите имя.';
            statusMsg.style.color = '#e53e3e';
            return;
        }

        // Блокируем кнопку
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
                statusMsg.style.color = '#2f855a';
                form.reset();
                setTimeout(() => statusMsg.textContent = '', 5000);
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            statusMsg.textContent = 'Произошла ошибка при отправке. Попробуйте позже.';
            statusMsg.style.color = '#e53e3e';
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// ==================================================
// 4. КНОПКА «НАВЕРХ»
// ==================================================
const upBtn = document.querySelector('#to-top');
if (upBtn) {
    window.addEventListener('scroll', () => {
        upBtn.classList.toggle('visible', window.scrollY > 400);
    });
    upBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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
const btnFontUp = document.querySelector('#acc-font-up');
const btnFontDown = document.querySelector('#acc-font-down');
const btnFontReset = document.querySelector('#acc-font-reset');

if (btnFontUp) {
    btnFontUp.addEventListener('click', () => {
        if (currentFontSize < 32) { currentFontSize += 2; htmlEl.style.setProperty('--base-font-size', `${currentFontSize}px`); }
    });
}

if (btnFontDown) {
    btnFontDown.addEventListener('click', () => {
        if (currentFontSize > 12) { currentFontSize -= 2; htmlEl.style.setProperty('--base-font-size', `${currentFontSize}px`); }
    });
}

if (btnFontReset) {
    btnFontReset.addEventListener('click', () => {
        currentFontSize = 16; htmlEl.style.setProperty('--base-font-size', `16px`);
    });
}

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
if (imgToggle) {
    imgToggle.addEventListener('change', (e) => {
        if (e.target.checked) htmlEl.classList.add('hide-images');
        else htmlEl.classList.remove('hide-images');
    });
}

const speechToggle = document.querySelector('#acc-speech');
let isSpeechEnabled = false;
if (speechToggle) {
    speechToggle.addEventListener('change', (e) => { isSpeechEnabled = e.target.checked; });
}

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

const btnResetAll = document.querySelector('#acc-reset-all');
if (btnResetAll) {
    btnResetAll.addEventListener('click', () => {
        currentFontSize = 16; htmlEl.style.setProperty('--base-font-size', `16px`);
        htmlEl.classList.remove('theme-bw', 'theme-wb', 'theme-bb', 'hide-images');
        if (imgToggle) imgToggle.checked = false;
        if (speechToggle) speechToggle.checked = false;
        isSpeechEnabled = false;
        window.speechSynthesis.cancel();
    });
                                 }
