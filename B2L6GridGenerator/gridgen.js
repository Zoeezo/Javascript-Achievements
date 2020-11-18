const inputAmount = document.getElementById('amount');
const inputColumns = document.getElementById('columns');
const grid = document.getElementById('grid');

inputAmount.addEventListener('change', update);
inputColumns.addEventListener('change', update);

function update() {
    grid.innerHTML = '';

    let amount = inputAmount.value;
    let columns = inputColumns.value;

    let y = 0;
    for(let x = 0; x < amount; x++) {
        if(columns == y && columns != 0) {
            grid.innerHTML += '<br>';
            y = 0;
        }

        grid.innerHTML += 'X';
        y++;
    }
}

update();