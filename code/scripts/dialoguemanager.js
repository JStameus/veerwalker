let playerName = "Sadrayn";

function DialogueNode(nodeID, text, location, responses, description) {
    this.nodeID = nodeID;
    this.text = text;
    this.location = location;
    this.responses = responses;
    this.description = description;
}

function DialogueResponse(text, nextNode) {
    this.text = text;
    this.nextNode = nextNode;
}

var diagNodeS101 = new DialogueNode();
diagNodeS101.nodeID = 101;
diagNodeS101.location = "Prison Boat";
diagNodeS101.text = "Jiub: Stand up. There you go. You were dreaming. What's your name?";
diagNodeS101.responses = [
    response01 = new DialogueResponse("I'm not sure. Everything is...foggy.", null),
    response02 = new DialogueResponse("My name is " + playerName + ". And you are...?", null),
    response03 = new DialogueResponse("I'm not telling you anything. I'm not sure I trust you.", null),
    response04 = new DialogueResponse("Why, I'm Lord Nerevar, of course! Don't you recognize me?", null),
];
diagNodeS101.description = "Jiub greets the player when they wake up on the boat."

function loadDialogueNode(dialogueNode) {
    document.getElementById("dialogue_eventlabel").innerHTML = dialogueNode.location;
    document.getElementById("dialogue_text_main").innerHTML = dialogueNode.text;
    document.getElementById("choice_button_01").innerHTML = dialogueNode.responses[0].text;
    document.getElementById("choice_button_02").innerHTML = dialogueNode.responses[1].text;
    document.getElementById("choice_button_03").innerHTML = dialogueNode.responses[2].text;
    document.getElementById("choice_button_04").innerHTML = dialogueNode.responses[3].text;
}


document.onload = loadDialogueNode(diagNodeS101);