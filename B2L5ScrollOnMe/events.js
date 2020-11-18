const textElement = document.getElementById('text');

document.addEventListener('click', () => {
    textElement.innerHTML = 'Don\'t scroll! Do click! ';
});

document.addEventListener('wheel', () => {
    textElement.innerHTML = textElement.innerHTML + 'A';
});