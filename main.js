var startScreen = document.getElementById("startScreen");
var ingameScreen = document.getElementById("ingameScreen");
var endScreen = document.getElementById("endScreen");

var running = false;
var end = false;

var clicks = 0;
var key;
var level;

var startDate;
var endDateM;

var timer;

document.onkeydown = function (event) {
    if (this.className === 'hold') {
        return false;
    }
    this.className = 'hold';
    console.log(`${event.code}`);
    if (running == false && end == false) {
        running = true;
        key = event.code;
        level = document.getElementById("level").value;
        document.getElementById("progress").max = level;
        console.log(level);
        startScreen.style.display = "none";
        ingameScreen.style.display = "block";
        document.getElementById("keyname").innerHTML = event.code;
        startDate = new Date();
        timer = setInterval(function () {
            document.getElementById("seconds").innerHTML = (new Date().getTime() - startDate.getTime()) / 1000;
        }, 10);
    }
    if (running == true && end == false && key == event.code) {
        clicks++;
        document.getElementById("clicks").innerHTML = `${clicks}/${level}`;
        document.getElementById("progress").value = clicks;
        if (clicks == level) {
            startScreen.style.display = "none";
            ingameScreen.style.display = "none";
            endScreen.style.display = "block";
            endDate = new Date();
            document.getElementById("secondsEnd").innerHTML = (endDate.getTime() - startDate.getTime()) / 1000;
            document.getElementById("keynameEnd").innerHTML = event.code;
            document.getElementById("levelEnd").innerHTML = level;
            clearInterval(timer);
        }
    }
};

document.onkeyup = function () {
    this.className = '';
};

function downloadResult() {
    html2canvas(document.getElementById("box")).then(canvas => {
        download(canvas.toDataURL("image/png"), "SpaceClickerResult.png", "image/png");
    });
}

window.addEventListener("load", function () {
    document.getElementById("box").style.animation = "fadeBlur 1s";
    document.getElementById("loader").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("box").style.filter = "";
    }, 1000);
});