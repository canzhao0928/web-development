
// play audio when click button 

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        makesound(this.innerHTML)
    })
}

// play audio when press keyboard 
document.addEventListener("keypress", function (event) {
    makesound(event.key);
})


// play audio
function makesound(key) {
    var sounds = ["sounds/crash.mp3", "sounds/kick-bass.mp3", "sounds/snare.mp3", "sounds/tom-1.mp3", "sounds/tom-2.mp3", "sounds/tom-3.mp3", "sounds/tom-4.mp3"];
    switch (key) {
        case "w":
            var audio1 = new Audio(sounds[0]);
            audio1.play();
            console.log("w" + sounds[0])
            break;
        case "a":
            var audio2 = new Audio(sounds[1]);
            audio2.play();
            console.log("a" + sounds[1])
            break;
        case "s":
            var audio3 = new Audio(sounds[2]);
            audio3.play();
            console.log("s" + sounds[2])
            break;
        case "d":
            var audio4 = new Audio(sounds[3]);
            audio4.play();
            console.log("d" + sounds[3])
            break;
        case "j":
            var audio5 = new Audio(sounds[4]);
            audio5.play();
            console.log("j" + sounds[4])
            break;
        case "k":
            var audio6 = new Audio(sounds[5]);
            audio6.play();
            console.log("k" + sounds[5])
            break;
        case "l":
            var audio7 = new Audio(sounds[6]);
            audio7.play();
            console.log("l" + sounds[6])
            break;
        default: console.log(buttonHTML)
            break;
    }
}