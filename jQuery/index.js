$("button").click(function () {
    $(this).fadeOut().fadeIn(100);

    setTimeout(() => { }, 1000);

    // for (var index = 0; index < 2; index++) {
    //     setTimeout(() => {
    //         generatePatten();
    //     }, 1000);
    // }

    // $(".btn-green").fadeOut(1000).fadeIn(100);
    // $(".btn-red").fadeOut().fadeIn(100);
})

function generatePatten(number) {
    for (var i = 1; i <= number; i++) {
        flashButton();
    }
}

async function flashButton() {
    var randomNum = Math.floor(Math.random() * 4); //random num 0-3
    switch (randomNum) {
        case 0:
            var flashButton = ".btn-green";
            break;
        case 1:
            var flashButton = ".btn-red";
            break;
        case 2:
            var flashButton = ".btn-yellow";
            break;
        case 3:
            var flashButton = ".btn-blue";
            break;

        default:
            console.log("wronge number" + randomNum);
            break;
    }
    $(flashButton).fadeOut(100).fadeIn(100);
    await sleep(1000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}