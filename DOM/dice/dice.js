
var player1 = Math.floor(Math.random() * 6) + 1;
var player2 = Math.floor(Math.random() * 6) + 1;
var imgsrc1 = "images/dice" + player1 + ".png"
document.querySelector(".player1-img").setAttribute("src", imgsrc1);
var imgsrc2 = "images/dice" + player2 + ".png"
document.querySelector(".player2-img").setAttribute("src", imgsrc2);

if (player1 > player2) {
    var heading = "player 1 wins!";

    document.querySelector("h1").innerHTML = heading;
}
else if (player1 < player2) {
    var heading = "player 2 wins!";

    document.querySelector("h1").innerHTML = heading;
}
else {
    var heading = "Draw!";
    document.querySelector("h1").innerHTML = heading;
}   
