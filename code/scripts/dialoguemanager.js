let playerName = "Sadrayn";

function DialogueNode(nodeID, text, location, responses, description) {
    this.nodeID = nodeID;
    this.text = text;
    this.location = location;
    this.responses = responses;
    this.description = description;
}

function DialogueResponse(parentNode, text, nextNode) {
    this.parentNode = parentNode;
    this.text = text;
    this.nextNode = nextNode;
}

var diagResponseS101R01 = new DialogueResponse();
diagResponseS101R01.parentNode = diagNodeS101;
diagResponseS101R01.text = "I'm not sure. Everything is...foggy.";
diagResponseS101R01.nextNode = null;

var diagResponseS101R02 = new DialogueResponse();
diagResponseS101R02.parentNode = diagNodeS101;
diagResponseS101R02.text = "My name is " + playerName + ". And you are?";
diagResponseS101R02.nextNode = null;

var diagResponseS101R03 = new DialogueResponse();
diagResponseS101R03.parentNode = diagNodeS101;
diagResponseS101R03.text = "I'm not telling you anything. I'm not sure I trust you.";
diagResponseS101R03.nextNode = null;

var diagResponseS101R04 = new DialogueResponse();
diagResponseS101R04.parentNode = diagNodeS101;
diagResponseS101R04.text = "Why, I'm Lord Nerevar, of course! Don't you recognize me?";
diagResponseS101R04.nextNode = null;

var diagNodeS101 = new DialogueNode();
diagNodeS101.nodeID = 0101;
diagNodeS101.location = "Prison Boat";
diagNodeS101.text = "Jiub: Stand up. There you go. You were dreaming. What's your name?";
diagNodeS101.responses = [diagResponseS101R01,diagResponseS101R02,diagResponseS101R03,diagResponseS101R04];
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