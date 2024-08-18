// No secrets here chump!

let hasIntroStarted = false;
var elem = document.documentElement;
let beat = new Audio("audio/empty.wav");
let blip = new Audio("audio/blip.wav");
blip.volume = 0.3;
beat.volume = 0.5;
beat.loop = true;
let imgElem = document.getElementById("shopimg");

let backElem = document.getElementById("textboxback");
let frontElem = document.getElementById("textboxfront");

let isPlayingText = false;

let waitingToDelText = false;

let rngDialog = [
    "It's like everyone left in a hurry, except her.",
    "Even the weapons are gone, why did she need them?",
    "She had the time to grab everything, unlike the rest of them.",
    "I think the whole place might be eating itself.",
    "This was her decision, she descended willingly.",
    "Yeah, I do not miss this.",
    "I was in too much of a hurry to talk, I wonder if she was nice?",
    "Shed knows I hate expeditions, so why do I always end up down here!",
    "Our entry point is still active, meaning he's down here somewhere...",
    "Anything?... Nope just cobwebs.",
    "Not a single person down here anymore."
]

function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
}

let index = 0;

function typeAnimationRecall(text) {
    if (index < text.length) {
        writeLine(text.substr(0, index + 1)); // Display text up to the current index
        index++;
        setTimeout(() => typeAnimationRecall(text), 50); // Use an arrow function to correctly pass the function reference
    }
    else
    {
        isPlayingText = false;
        waitingToDelText = true;
    }
}
function typeText(text)
{
    isPlayingText = true;
    waitingToDelText = false;
    index = 0;
    let result = '';
    for (let i = 0; i < text.length; i += 50) {
        result += text.substring(i, i + 50);
        if (i + 50 < text.length) {
            result += '\n';
        }
    }
    typeAnimationRecall(result);
}

function writeLine(text)
{
    frontElem.textContent = text;
    backElem.setAttribute('data-text', text);
    blip.play();
}


document.addEventListener('click', function(event) {
    if(!isPlayingText && hasIntroStarted && !waitingToDelText)
    {
        typeText(rngDialog[Math.floor(Math.random()*rngDialog.length)])
    }
    if(waitingToDelText)
    {
        writeLine("")
        waitingToDelText = false;
    }
    if(!hasIntroStarted)
    {
        beat.play();
        //openFullscreen()
        hasIntroStarted = true;
        imgElem.classList.add("appear");
        imgElem.classList.remove("hidden");
        index = 0;
        typeText("...Where did everybody go?")
    }
});