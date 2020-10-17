

var height = 50;
var width = 50;
const shelfHeight = 20;
var currentShelfHeight = 20;
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
    ctx.arc(x + width, y, circleSize, 0, 2 * Math.PI);
    ctx.stroke();
    //Bottom left circle
    ctx.beginPath();
    ctx.arc(x, y + height, circleSize, 0, 2 * Math.PI);
    ctx.stroke();
    //Bottom right circle
    ctx.beginPath();
    ctx.arc(x + width, y + height, circleSize, 0, 2 * Math.PI);
    ctx.stroke();
    //Top horizontal line
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();
    //Bottom horizontal line
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
    //Left vertical line
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+height);
    ctx.stroke();
    //Right vertical line
    ctx.moveTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();

    //ADD TEXT
    ctx.font = "10px Arial";
    ctx.fillText("Node: " + index, x + 5, y + 20);
    ctx.fillText("ID: " + ID, x + 5, y + 30);
}

function drawNodeAppendage(nextNodeIndex) {
    //Left vertical line
    ctx.moveTo(xCoordinate, yCoordinate + height);
    ctx.lineTo(xCoordinate, yCoordinate + height + currentShelfHeight);
    ctx.stroke();
    //Right vertical line
    ctx.moveTo(xCoordinate + width, yCoordinate + height);
    ctx.lineTo(xCoordinate + width, yCoordinate + height + currentShelfHeight);
    ctx.stroke();
    //Horizntal line
    ctx.moveTo(xCoordinate, yCoordinate + height + currentShelfHeight);
    ctx.lineTo(xCoordinate + width, yCoordinate + height + currentShelfHeight);
    ctx.stroke();
    //Add text
    ctx.fillText("To: " + nextNodeIndex, xCoordinate + 5, yCoordinate + height + (currentShelfHeight - 5));
}

function drawDialogueTree() {
    fixNodeIndexValues();
    // let a = 0;
    // let b = 0;
    // for(a = 0; a < dialogueTree.nodes.length; a++)
    // {
    //     console.log("Grabbed Node " + dialogueTree.nodes[a].nodeIndex);
    //     drawNode(a, dialogueTree.nodes[a].nodeID, xCoordinate, yCoordinate);
    //     for(b = 0; b < dialogueTree.nodes[a].responses.length; b++)
    //     {
    //         drawNodeAppendage(dialogueTree.nodes[a].responses[b].nextNode);
    //         currentAppendageHeight += originalAppendageHeight;
    //     }
    //     xCoordinate += (margin + nodeWidth);
    //     yCoordinate += (margin + nodeHeight);
    //     currentAppendageHeight = originalAppendageHeight;
    // }
    drawNode(0, dialogueTree.nodes[0].nodeID, xCoordinate, yCoordinate);
    //draw the first node
    //move x coordinate
    //loop through nextNodes linked from the last node drawn
    //draw each node and move y coordinate for each
    //repeat
    xCoordinate += (width + margin);
    yCoordinate -= (height + margin)
    for(let i = 0; i < dialogueTree.nodes[0].responses.length; i++)
    {
        yCoordinate += (margin + height);
        let nextNodeIndex = dialogueTree.nodes[0].responses[i].nextNode;
        drawNode(nextNodeIndex, dialogueTree.nodes[nextNodeIndex].nodeID, xCoordinate, yCoordinate);
        drawNodeAppendage(0);
        for(let i = 0; i < dialogueTree.nodes[0].responses.length; i++)
        {
            yCoordinate += 30;
        }
    }

}