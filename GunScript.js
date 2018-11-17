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

// Color init
var lineColors = [  "#e63d17",
                    "#1a9fe6",
                    "#e6d921",
                    "#e6179a",
                    "#7f0e08",
                    "#16087f",
                    "#7f4908",
                    "#7f0871",]

// Lines list
var lineNum = 0;
var lineList = document.getElementById("line-list-holder");


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
    addLine(slopeValue,interceptValue);
    emptyInput();
    lineNum++;
});

// Clear button
clear.addEventListener("click", function () {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawInit();
    removeLine();
    lineNum=0;
    emptyInput();
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
    c.strokeStyle = lineColors[lineNum % lineColors.length];
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


// add the line equation to the list
function addLine(slopeValue, interceptValue) {
    console.log("slopeValue:::" + slopeValue);
    console.log("interceptValue:::" + interceptValue);
    console.log(slopeValue == null);

    let para = document.createElement("P");
    let lineText = "y = " + slopeValue + "x + " + interceptValue;
    if ((slopeValue == 0 || slopeValue == null) && (interceptValue == 0 || interceptValue == null)) {
        lineText = "y = 0";
    } else if (interceptValue == 0) {
        lineText = "y = " + slopeValue + "x";
    } else if (slopeValue == 0) {
        lineText = "y = " + interceptValue;
    }

    console.log("lineText:::" + lineText);
    let t = document.createTextNode(lineText);
    para.appendChild(t);
    lineList.appendChild(para);
}

// clear the line from the list
function removeLine() {
    while (lineList.hasChildNodes()) {
        lineList.removeChild(lineList.firstChild);
    }
}

// empty the input field
function emptyInput() {
    slope.value = "";
    intercept.value = "";
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


