//////////////////////////
// Init
//////////////////////////

// Variables init
var slope = document.getElementById("param1");
var slopeValue = 0;
var intercept = document.getElementById("param2");
var interceptValue = 0;

// Button init
var submit = document.getElementById("submit");
var clear = document.getElementById("clear");

// Canvas init
var canvas = document.getElementById("my-canvas");
canvas.width = window.innerWidth;
canvas.height = canvas.width; // make a square
var c = canvas.getContext("2d");

// Unit init
var unitParam = 20;
var unit = parseInt(canvas.width / unitParam);
var centerX = canvas.height / 2;
var centerY = canvas.height / 2;
console.log(parseInt(canvas.width / 10));


//////////////////////////
// Run
//////////////////////////


// Draw it
drawInit();


//////////////////////////
// Event
//////////////////////////


// Submit button
submit.addEventListener("click", function () {
    slopeValue = slope.value;
    interceptValue = intercept.value;
    console.log("slope" + slopeValue);
    console.log("intercept" + interceptValue);
    let rotateDegree = -Math.atan(slopeValue);
    console.log("rotateDegree" + rotateDegree);
    console.log(unit);
    rotateAndTranslate(rotateDegree, interceptValue, unit);

});

// Clear button
clear.addEventListener("click", function () {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawInit();
});


//////////////////////////
// Functions
//////////////////////////


// draw initialization
function drawInit() {
    drawCoordinate();
    drawCoordinatePoints(centerX, centerY, unit, unitParam);
}

// Draw the base coordinate
function drawCoordinate() {
    c.save();
    c.beginPath();
    c.fillStyle = "#087f23";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.strokeStyle = "#000";
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);
    c.closePath();
    c.stroke();
    c.restore();
}

// Draw base coordinate points
function drawCoordinatePoints(x, y, u, p) {
    let baseNum = 4;
    c.save();
    c.strokeStyle = "#000";
    for (let i = 1; i < p / 2; i++) {
        c.beginPath();
        c.moveTo(x - baseNum, y + u * i);
        c.lineTo(x + baseNum, y + u * i);
        c.closePath();
        c.stroke();
    }

    for (let i = 1; i < p / 2; i++) {
        c.beginPath();
        c.moveTo(x - baseNum, y - u * i);
        c.lineTo(x + baseNum, y - u * i);
        c.closePath();
        c.stroke();
    }

    for (let i = 1; i < p / 2; i++) {
        c.beginPath();
        c.moveTo(x + u * i, y - baseNum);
        c.lineTo(x + u * i, y + baseNum);
        c.closePath();
        c.stroke();
    }

    for (let i = 1; i < p / 2; i++) {
        c.beginPath();
        c.moveTo(x - u * i, y - baseNum);
        c.lineTo(x - u * i, y + baseNum);
        c.closePath();
        c.stroke();
    }
    c.restore();
}


// draw line
function drawLine() {
    c.save();
    c.beginPath();
    c.strokeStyle = "red";
    c.lineWidth = 2;
    c.moveTo(-canvas.width, 0);
    c.lineTo(canvas.width * 2, 0);
    c.closePath();
    c.stroke();
    c.restore();
}


// y = mx + b
// rotate and translate the line by the slopeValue and interceptValue
function rotateAndTranslate(d, b, u) {
    c.save();
    c.translate(centerX, centerY - (b * u));
    c.rotate(d);
    drawLine();
    c.restore();
}


function drawLineDot() {
    c.fillRect(centerX, centerY, 2, 2);
}


// triangle
// ctx.beginPath();
// ctx.moveTo(75, 50);
// ctx.lineTo(100, 75);
// ctx.lineTo(100, 25);
// ctx.fill();


//
// function draw(cx1,cy1,radius, sAngel, eAngel, orientation){
//     c.arc(cx1,cy1,radius, sAngel * Math.PI , eAngel * Math.PI, orientation);
// }
//
// c.strokeStyle = "black";
// c.lineWidth = 4;
//
// // first circle
// for(i = -290; i < canvas.width; i += 10){
//     c.beginPath();
//     draw(i,200,300,-0.3, 0.3, false);
//     c.stroke();
// }
//
// //second cir
// for(i = -290; i < canvas.width + 1000; i += 10){
//     c.beginPath();
//     draw(i,600,200,-0.7, 0.7, true);
//     c.stroke();
// }
//
// //third cir
// for(i = -290; i < canvas.width; i += 10){
//     c.beginPath();
//     draw(i,840,100,-0.3, 0.3, false);
//     c.stroke();
// }


