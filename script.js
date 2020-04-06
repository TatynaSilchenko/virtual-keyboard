const LETTERS_EN = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '━', 'Del',
    'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
    'Shift L', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt R', 'Ctrl R', '◄', '▼', '►',
];
const LETTERS_EN_BIG = [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
    'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
    'Shift L', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt R', 'Ctrl R', '◄', '▼', '►',
];

const LETTERS_RU = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '§', 'Del',
    'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift L', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '▲', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt R', 'Ctrl R', '◄', '▼', '►',
];
const LETTERS_RU_BIG = [
    'Ё', '!', '"', '№', '%', ':', ',', '.', ';', '(', ')', '_', '+', 'Backspace',
    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '±', 'Del',
    'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
    'Shift L', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '?', '▲', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt R', 'Ctrl R', '◄', '▼', '►',
];


let countLetter = 0;
let countCaps = 0;
let language;

if (localStorage.getItem('language') != null) {
    language = localStorage.getItem('language');
} else {
    language = 'eng';
}



const textArea = document.createElement('textarea');
document.body.append(textArea);
textArea.tabIndex = '-1';

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.append(keyboard);

const info = document.createElement('div');
info.classList.add('info');
document.body.append(info);

for (let i = 0; i < 5; i += 1) {
    let countLettersRow;
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard-row');
    keyboard.append(keyboardRow);

    switch (i) {
        case 0:
            countLettersRow = 14;
            break;
        case 1:
            countLettersRow = 15;
            break;
        case 2:
            countLettersRow = 13;
            break;
        case 3:
            countLettersRow = 14;
            break;
        default:
            countLettersRow = 9;
            break;
    }

    for (let j = 0; j < countLettersRow; j += 1) {
        const keyboardLetter = document.createElement('div');
        keyboardLetter.classList.add('keyboard-letter');
        keyboardRow.append(keyboardLetter);
        if (language === 'eng') {
            keyboardLetter.innerText = `${LETTERS_EN[countLetter]}`;
        } else {
            keyboardLetter.innerText = `${LETTERS_RU[countLetter]}`;
        }
        countLetter += 1;
    }
}

