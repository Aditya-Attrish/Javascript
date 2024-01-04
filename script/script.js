function updateClock() {
    const hourElem = document.getElementById('hour');
    const minuteElem = document.getElementById('minute');
    const secondElem = document.getElementById('second');

    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDegree = (360 / 12) * hours + (360 / 12) * (minutes / 60);
    const minuteDegree = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
    const secondDegree = (360 / 60) * seconds;

    hourElem.style.transform = `translateX(-50%) translateY(-50%) rotate(${90 + hourDegree}deg)`;
    minuteElem.style.transform = `translateX(-50%) translateY(-50%) rotate(${90 + minuteDegree}deg)`;
    secondElem.style.transform = `translateX(-50%) translateY(-50%) rotate(${90 + secondDegree}deg)`;
}

setInterval(updateClock, 1000); // Update every second
updateClock(); // Initial update


