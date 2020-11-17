const root = document.documentElement;

const button = document.getElementById('theme-button');
const buttonImage = document.getElementById('theme-button-image');

let theme = 'dark';

button.addEventListener('click', function() {
    if(theme == 'dark') {
        theme = 'light'
    } else {
        theme = 'dark'
    }

    setTheme()
});

button.addEventListener('mouseenter', function() {
    if(theme == 'dark') {
        buttonImage.src = 'Images/darkmode-alt.png';
    } else {
        buttonImage.src = 'Images/lightmode-alt.png'
    }
});

button.addEventListener('mouseleave', function() {
    if(theme == 'dark') {
        buttonImage.src = 'Images/darkmode.png';
    } else {
        buttonImage.src = 'Images/lightmode.png'
    }
});

function setTheme() {
    if(theme == 'dark') {
        root.style.setProperty('--background-color', '#1F2833');
        root.style.setProperty('--border-color', '#384a5e');
        root.style.setProperty('--text-color', '#C5C6C7');
        root.style.setProperty('--alt-text-color', '#aec6cf');
    
        buttonImage.src = 'Images/darkmode.png';

    } else {
        root.style.setProperty('--background-color', 'white');
        root.style.setProperty('--border-color', '#e2e2e2');
        root.style.setProperty('--text-color', '#444');
        root.style.setProperty('--alt-text-color', ' #384a5e');

        buttonImage.src = 'Images/lightmode.png';
    }
}