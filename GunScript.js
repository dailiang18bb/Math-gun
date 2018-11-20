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

// Points plot
var x1,x2,y1,y2;
var x1Val,x2Val,y1Val,y2Val;

var equationPlot = document.getElementById("equation-plot");
var pointsPlot = document.getElementById("points-plot");

var x1 = document.getElementById("param3");
var y1 = document.getElementById("param4");
var x2 = document.getElementById("param5");
var y2 = document.getElementById("param6");


x1Val = x2Val = y1Val = y2Val= 0;
// line x=n flag
var specialFlag = false;








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
    //check activation
    var current = document.getElementsByClassName("active");
    console.log(current[0].id=='equation-plot');

    if(current[0].id=='equation-plot'){
        //equation-plot
        slopeValue = slope.value;
        interceptValue = intercept.value;
        console.log("slope" + slopeValue);
        console.log("intercept" + interceptValue);
        let rotateDegree = -Math.atan(slopeValue);
        console.log("rotateDegree" + rotateDegree);
        console.log(unit);
        rotateAndTranslate(rotateDegree, interceptValue, unit);
    }else{
        //points plot
        x1Val = x1.value;
        y1Val = y1.value;
        x2Val = x2.value;
        y2Val = y2.value;
        //exception handle division by zero
        if(x2Val-x1Val == 0){
            drawYaxisParallel(90 * Math.PI / 180 , x2Val , unit);
            specialFlag = true;
        }else{
            slopeValue = (y2Val - y1Val)/(x2Val-x1Val);
            interceptValue = y2Val-(slopeValue * x2Val);
            let rotateDegree = -Math.atan(slopeValue);
            rotateAndTranslate(rotateDegree, interceptValue, unit);
        }
    }
    addLine(slopeValue,interceptValue);
    emptyInput();
    lineNum++;
    specialFlag = false;
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

function drawYaxisParallel(d, x, u){
    c.save();
    c.translate(centerX + (x * u), centerY );
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
    if (specialFlag){
        if(x2Val == 0){
            lineText = "x = 0";
        }else{
            lineText = "x = " + x2Val;
        }
    }else if((slopeValue == 0 || slopeValue == null) && (interceptValue == 0 || interceptValue == null)) {
        lineText = "y = 0";
    } else if (interceptValue == 0) {
        lineText = "y = " + slopeValue + "x";
    } else if (slopeValue == 0) {
        lineText = "y = " + interceptValue;
    }

    console.log("lineText:::" + lineText);
    var colorCircleDiv = document.createElement("div");
    colorCircleDiv.style.width = "20px";
    colorCircleDiv.style.height = "20px";
    colorCircleDiv.style.background = lineColors[lineNum % lineColors.length];

    let t = document.createTextNode(lineText);
    para.appendChild(colorCircleDiv);
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
    x1.value = "";
    y1.value = "";
    x2.value = "";
    y2.value = "";
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


