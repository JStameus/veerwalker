

var nodeHeight = 50;
var nodeWidth = 50;
const originalAppendageHeight = 20;
var currentAppendageHeight = 20;
var circleSize = 5;
var margin = 20;
var fontSize = 20;
var xCoordinate = 20;
var yCoordinate = 100;

var canvas = document.getElementById("canvas_main");
var ctx = canvas.getContext("2d");

function drawNode(index, ID, x, y) {
    //DRAW THE NODEBOX

    //Top left circle
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, 2 * Math.PI);
    ctx.stroke();
    //Top right circle
    ctx.beginPath();
    ctx.arc(x + nodeWidth, y, circleSize, 0, 2 * Math.PI);
    ctx.stroke();
    //Bottom left circle
    ctx.beginPath();
    ctx.arc(x, y + nodeHeight, circleSize, 0, 2 * Math.PI);
    ctx.stroke();
    //Bottom right circle
    ctx.beginPath();
    ctx.arc(x + nodeWidth, y + nodeHeight, circleSize, 0, 2 * Math.PI);
    ctx.stroke();
    //Top horizontal line
    ctx.moveTo(x, y);
    ctx.lineTo(x + nodeWidth, y);
    ctx.stroke();
    //Bottom horizontal line
    ctx.moveTo(x, y + nodeHeight);
    ctx.lineTo(x + nodeWidth, y + nodeHeight);
    ctx.stroke();
    //Left vertical line
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+nodeHeight);
    ctx.stroke();
    //Right vertical line
    ctx.moveTo(x + nodeWidth, y);
    ctx.lineTo(x + nodeWidth, y + nodeHeight);
    ctx.stroke();

    //ADD TEXT
    ctx.font = "10px Arial";
    ctx.fillText("Node: " + index, x + 5, y + 20);
    ctx.fillText("ID: " + ID, x + 5, y + 30);
}

function drawNodeAppendage(nextNodeIndex) {
    //Left vertical line
    ctx.moveTo(xCoordinate, yCoordinate + nodeHeight);
    ctx.lineTo(xCoordinate, yCoordinate + nodeHeight + currentAppendageHeight);
    ctx.stroke();
    //Right vertical line
    ctx.moveTo(xCoordinate + nodeWidth, yCoordinate + nodeHeight);
    ctx.lineTo(xCoordinate + nodeWidth, yCoordinate + nodeHeight + currentAppendageHeight);
    ctx.stroke();
    //Horizntal line
    ctx.moveTo(xCoordinate, yCoordinate + nodeHeight + currentAppendageHeight);
    ctx.lineTo(xCoordinate + nodeWidth, yCoordinate + nodeHeight + currentAppendageHeight);
    ctx.stroke();
    //Add text
    ctx.fillText("To: " + nextNodeIndex, xCoordinate + 5, yCoordinate + nodeHeight + (currentAppendageHeight - 5));
}

function drawDialogueTree() {
    fixNodeIndexValues();
    let a = 0;
    let b = 0;
    for(a = 0; a < dialogueTree.nodes.length; a++)
    {
        console.log("Grabbed Node " + dialogueTree.nodes[a].nodeIndex);
        drawNode(a, dialogueTree.nodes[a].nodeID, xCoordinate, yCoordinate);
        for(b = 0; b < dialogueTree.nodes[a].responses.length; b++)
        {
            drawNodeAppendage(dialogueTree.nodes[a].responses[b].nextNode);
            currentAppendageHeight += originalAppendageHeight;
        }
        xCoordinate += (margin + nodeWidth);
        yCoordinate += (margin + nodeHeight);
        currentAppendageHeight = originalAppendageHeight;
    }
}