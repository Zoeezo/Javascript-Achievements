const inputBeginTime = document.getElementById('begin-time');
const inputEndTime = document.getElementById('end-time');
const clock = document.getElementById('clock');
const image = document.getElementById('image')
const timerInfo = document.getElementById('timer-info');
const buttonElement = document.getElementById('button');


let beginHour;
let beginMinutes;
let endHour;
let endMinutes;

let timer = false;
let e = setInterval(updateTime, 1000);

buttonElement.addEventListener('click', function() {
    beginHour = parseInt(inputBeginTime.value.slice(0, 2));
    beginMinutes = parseInt(inputBeginTime.value.slice(3));
    endHour = parseInt(inputEndTime.value.slice(0, 2));
    endMinutes = parseInt(inputEndTime.value.slice(3));

    if(beginHour > endHour || beginHour == endHour && beginMinutes > endMinutes) {
        timerInfo.innerHTML = `Error begin time is later then end time!`;

        return;
    }

    timer = true;
});

function updateTime() {
    time = new Date();
    clock.innerHTML = `The time is ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

    if(timer) {
        if(time.getHours() < beginHour || time.getHours() == beginHour && time.getMinutes() < beginMinutes) {
            timerInfo.innerHTML = `Your break will begin in ${beginHour - time.getHours()} hour(s) and ${beginMinutes - time.getMinutes()} minute(s)!`
        }

        else if(time.getHours() > endHour && time.getMinutes() > endMinutes || time.getHours() == endHour && time.getMinutes() == endMinutes) {
            timerInfo.innerHTML = `Your break is over!`
            image.src = 'Images/working.gif';
            timer = false;
        }

        else {
            if(image.src != 'Images/break.gif') {
                image.src = 'Images/break.gif';
            }

            timerInfo.innerHTML = `Your break will end in ${endHour - time.getHours()} hour(s) and ${endMinutes - time.getMinutes()} minute(s)!`
        }


    }
}