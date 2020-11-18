const body = document.body;

// Create elements
const div = document.createElement('div');
const button = document.createElement('button');
const text = document.createElement('p');

// Add button to div
div.appendChild(button);

// Add text to the button
button.appendChild(text);

// Div styling
div.style.backgroundColor = '#aec6cf';
div.style.width = '200px';
div.style.height = '100px';
div.style.borderTopLeftRadius = '10px';
div.style.borderTopRightRadius = '10px';
div.style.position = 'fixed';
div.style.bottom = '0%';
div.style.right = '5%';

// Button styling
button.style.backgroundColor = 'transparent';
button.style.border = '0px';
button.style.outline = 'none';
button.style.cursor = 'pointer';
button.style.width = '100%';
button.style.height = '100%';
button.style.borderTopLeftRadius = '10px';
button.style.borderTopRightRadius = '10px';


// Text styling
text.innerHTML = '<strong>Go back</strong>';
text.style.fontSize = '20px';
text.style.color = '#444';

// Add button to body
body.appendChild(div);

// Add onclick event
button.addEventListener('click', () => {
    window.location.href = '../index.html';
});