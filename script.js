const eventCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
    'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ',
    'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft',
    'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH',
    'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC',
    'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ControlLeft', 'AltLeft',
    'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const eventKeyEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift',
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Ctr', 'Alt', 'Meta', ' ', 'Meta',
    'Alt', '◄', '▼', '►'];

const eventKeyRus = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift',
    'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '▲', 'Ctr', 'Alt', 'Meta', ' ', 'Meta',
    'Alt', '◄', '▼', '►'];


const inputKey = [];
const pressedKey = [];
let isEng = true;
let isCapsLock = false;


const textarea = document.createElement('textarea');
const info = document.createElement('div');
info.classList.add('info');
const p = document.createElement('p');
p.textContent = 'Language change: Сtr + Shift';
info.append(p);
document.body.append(info);


function init() {
    textarea.classList.add('textarea');
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    const keyboardKeys = document.createElement('div');
    keyboardKeys.classList.add('keyboard__keys');
    keyboard.append(keyboardKeys);

    function addKeys(code, keys) {
        const board = [];
        for (let i = 0; i < code.length; i++) {
            const button = document.createElement('button');
            button.classList.add('keyboard__key');
            button.setAttribute('data', code[i]);
            if (button.getAttribute('data') === 'Space') {
                button.classList.add('keyboard__key-3');
            } else if (button.getAttribute('data') === 'Backspace' ||
                button.getAttribute('data') === 'Enter' ||
                button.getAttribute('data') === 'ShiftLeft' ||
                button.getAttribute('data') === 'Tab' || code[i] === 'ArrowUp') {
                button.classList.add('keyboard__key-2');
            } else if (button.getAttribute('data') === 'CapsLock') {
                button.classList.add('keyboard__key-1');
            }
            button.textContent = keys[i];
            board.push(button);
        }
        return board;
    }

    keyboardKeys.append(...addKeys(eventCode, eventKeyEng));

    document.body.append(textarea);
    document.body.append(keyboard);
}

function click() {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
        el.addEventListener('click', (event) => {
            if (event.target.textContent === 'Backspace') {
                inputKey.pop();
                textarea.value = textarea.value.slice(0, -1);
            } else if (event.target.textContent === 'Ctr' || event.target.textContent === 'Alt'
                || event.target.textContent === 'Meta' || event.target.textContent === 'Shift') {
                return false;
            } else if (event.target.textContent === 'Enter') {
                textarea.value += '\n';
            } else if (event.target.textContent === 'Tab') {
                event.preventDefault();
                inputKey.push(' ', ' ');
                textarea.value = '  ' + textarea.value;
            } else if (event.target.textContent === 'CapsLock') {
                capsLock();
            } else {
                inputKey.push(event.target.textContent);
                textarea.value += inputKey[inputKey.length - 1];
            }
        });
    });
}

function keyPress() {
    document.addEventListener('keypress', (event) => {
        if (event.code === 'Enter') {
            textarea.value += '\n';
        } else if (event.code === 'Tab') {
            inputKey.push(' ', ' ');
            textarea.value = '  ' + textarea.value;
        } else {
            const key = document.querySelector(`.keyboard__key[data="${event.code}"]`);
            inputKey.push(key.textContent);
            textarea.value += inputKey[inputKey.length - 1];
        }
    });
}

function capsLock() {
    if (!isCapsLock) {
        document.querySelectorAll('.keyboard__key').forEach((el) => {
            if (el.textContent.length === 1) {
                el.textContent = el.textContent.toUpperCase();
            }
        });
        isCapsLock = true;
    } else {
        document.querySelectorAll('.keyboard__key').forEach((el) => {
            if (el.textContent.length === 1) {
                el.textContent = el.textContent.toLowerCase();
            }
        });
        isCapsLock = false;
    }
}

function keyDown() {
    document.addEventListener('keydown', (event) => {
        document.querySelectorAll('button').forEach((e) => {
            e.classList.remove('active');
        });
        document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('active');

        if (event.code === 'Tab') {
            event.preventDefault();
            inputKey.push(' ', ' ');
            textarea.value += '  ';
        }
        if (event.code === 'Backspace') {
            inputKey.pop();
            textarea.value = textarea.value.slice(0, -1);
        }
        if (event.code === 'CapsLock') {
            capsLock();
        }
        if (event.code === 'ArrowLeft') {
            inputKey.push('◄');
            textarea.value += '◄';
        }
        if (event.code === 'ArrowDown') {
            inputKey.push('▼');
            textarea.value += '▼';
        }
        if (event.code === 'ArrowRight') {
            inputKey.push('►');
            textarea.value += '►';
        }
        if (event.code === 'ArrowUp') {
            inputKey.push('▲');
            textarea.value += '▲';
        }
        if (event.code === 'ShiftLeft') {
            document.querySelectorAll('.keyboard__key').forEach((el) => {
                if (el.textContent.length === 1) {
                    el.textContent = el.textContent.toUpperCase();
                }
            });
        }
        pressedKey.push(event.code);
        for (let i = 0; i < pressedKey.length; i++) {
            if (pressedKey[i] === 'ControlLeft' && pressedKey[i + 1] === 'ShiftLeft') {
                changeLanguage();
            }
        }
    });
}

function keyUp() {
    document.addEventListener('keyup', (event) => {
        document.querySelectorAll('button').forEach((e) => {
            e.classList.remove('active');
        });
        if (event.code === 'ShiftLeft') {
            document.querySelectorAll('.keyboard__key').forEach((el) => {
                if (el.textContent.length === 1) {
                    el.textContent = el.textContent.toLowerCase();
                }
            });
        }
    });
}

function langOnLoad() {
    if (localStorage.getItem('isEng') === 'true') {
        changeToEng();
    } else if (localStorage.getItem('isEng') === 'false') {
        changeToRus();
    }
}

function changeLanguage() {
    if (!isEng) {
        isEng = true;
        localStorage.setItem('isEng', isEng);
        changeToEng();
    } else {
        isEng = false;
        localStorage.setItem('isEng', isEng);
        changeToRus();
    }
}

function changeToRus() {
    document.querySelectorAll('.keyboard__key').forEach((el, i) => {
        el.textContent = eventKeyRus[i];
    });
    pressedKey.length = 0;
}

function changeToEng() {
    document.querySelectorAll('.keyboard__key').forEach((el, i) => {
        el.textContent = eventKeyEng[i];
    });
    pressedKey.length = 0;
}

window.addEventListener('load', () => {
    init();
    keyPress();
    keyDown();
    keyUp();
    click();
    langOnLoad();
});
