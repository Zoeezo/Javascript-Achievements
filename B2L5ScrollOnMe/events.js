const text = document.getElementById('text');

document.addEventListener('click', () => {
    text.innerHTML = 'Don\'t scroll! Do click! ';
});

document.addEventListener('wheel', () => {
    text.innerHTML = text.innerHTML + 'A';
});