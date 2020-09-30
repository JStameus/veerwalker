function DialogueNode(nodeID, text, location, responses) {
    this.nodeID = nodeID;
    this.text = text;
    this.location = location;
    this.responses = responses;
}

function loadDiagResponse(dialogueChoice, newText, newNextNode) {
    dialogueChoice.text = newText;
    dialogueChoice.newText = newNextNode;
}

var diagNode0101 = new DialogueNode();
diagNode0101.nodeID = 0101;
diagNode0101.location = "Prison Boat";
diagNode0101.text = "YEEEEEHAW PARDNER";
diagNode0101.responses = [0];

function loadDiagNode(dialogueNode) {
    document.getElementById("dialogue_eventlabel").innerHTML = dialogueNode.location;
}

document.onload = loadDiagNode(diagNode0101);