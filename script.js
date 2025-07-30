let timerInterval;
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-timer");

function startTimer() {
    const selectedTime = parseInt(document.getElementById("timer-select").value, 10);
    let timeLeft = selectedTime * 60;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            markDayComplete();
            updateMascot();
            alert("Great Job!! You have finished a study session!!");
        }
    }, 1000);
}

startButton.addEventListener("click", startTimer);

function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear();
    const today = new Date().getDate();

    calendar.innerHTML = `<h3>${currentMonth} ${currentYear}</h3>`;

    let table = "<table><tr>";
    for (let i = 1; i <= 31; i++) {
        const date = `${currentYear}-${new Date().getMonth() + 1}-${i}`;
        const isToday = i === today ? "today" : "";
        const completed = localStorage.getItem(date) ? "completed" : "";

        table += `<td class="calendar-day ${isToday} ${completed}">${i}</td>`;

        if (i % 7 === 0) table += "</tr><tr>"; 
    }
    table += "</tr></table>";
    calendar.innerHTML += `<div class="calendar-days">${table}</div>`;
}

function markDayComplete() {
    const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    localStorage.setItem(today, "completed");
    generateCalendar();
}

generateCalendar();

const sounds = {
    cafe: new Audio("https://www.fesliyanstudios.com/play-mp3/387"),
    rain: new Audio("https://www.fesliyanstudios.com/play-mp3/7036"),
    lofi: new Audio("./audio/lofi.mp3")
};

let currentSound;

function toggleSound() {
    const selectedSound = document.getElementById("sound-select").value;

    if (currentSound && !currentSound.paused) {
        currentSound.pause();
    } else {
        currentSound = sounds[selectedSound];
        currentSound.loop = true;
        currentSound.play();
    }
}

const mascotMessages = [
    "You're doing great!!",
    "Take a deep breath! You got this!!",
    "Keep going! Almost there!!",
    "Remember why you started!!"
];

function updateMascot() {
    const message = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
    document.getElementById("mascot-message").textContent = message;

    const mascot = document.getElementById("mascot");
    mascot.style.transform = "translateY(-10px)";
    setTimeout(() => mascot.style.transform = "translateY(0)", 500);
}
