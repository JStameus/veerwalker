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

var currentDialogueNode = null;

var diagNodeS101 = new DialogueNode();
diagNodeS101.nodeID = 101;
diagNodeS101.location = "Prison Boat";
diagNodeS101.text = "Jiub: Stand up. There you go. You were dreaming. What's your name?";
diagNodeS101.responses = [
    response01 = new DialogueResponse("I'm not sure. Everything is...foggy.", diagNodeS102),
    response02 = new DialogueResponse("My name is " + playerName + ". And you are...?", null),
    response03 = new DialogueResponse("I'm not telling you anything. I'm not sure I trust you.", null),
    response04 = new DialogueResponse("Why, I'm Lord Nerevar, of course! Don't you recognize me?", diagNodes103),
];
diagNodeS101.description = "Jiub greets the player when they wake up on the boat.";

var diagNodeS102 = new DialogueNode();
diagNodeS102.nodeID = 102;
diagNodeS102.location = "Prison Boat";
diagNodeS102.text = "Jiub: Well, not even last night's storm could wake you. I heard them say we've reached Morrowind, I'm sure they'll let us go.";
diagNodeS102.responses = [
    response01 = new DialogueResponse("Morrowind? I see. But why here, of all places?", null),
    response02 = new DialogueResponse("Don't be so sure. If they can lock us up without a fair trial I see no reason for them to go easy on us.", null),
    response03 = new DialogueResponse("Good. The sooner, the better.", null),
];
diagNodeS102.description = "Jiub tells the player they slept heavily last night, and that they've reached Morrowind.";

var diagNodes103 = new DialogueNode();
diagNodes103.nodeID = 103;
diagNodes103.location = "Prison Boat";
diagNodes103.text = "Hit your head on the way over here, hmm? Very well, Lord Nerevar, you'll be pleased to know we've reached Morrowind. Welcome home...s'wit.";
diagNodes103.responses = [
    response01 = new DialogueResponse("Watch your language, peasant, or I'll have you in jail!", null),
    response02 = new DialogueResponse("Just kidding. I'm " + playerName + ". And you are?", null),
    response03 = new DialogueResponse("Hey, no need for that attitude. Jeez, you really have no sense of humor, do you?", null),
    response04 = new DialogueResponse("(Glare at him and sigh)", null)
];
diagNodes103.description = "The player has just told Jiub that they are Lord Nerevar, and he's not amused.";

function loadDialogueNode(dialogueNode) {
    currentDialogueNode = dialogueNode;
    document.getElementById("dialogue_eventlabel").innerHTML = dialogueNode.location;
    document.getElementById("dialogue_text_main").innerHTML = dialogueNode.text;
    document.getElementById("choice_button_01").innerHTML = dialogueNode.responses[0].text;
    document.getElementById("choice_button_02").innerHTML = dialogueNode.responses[1].text;
    document.getElementById("choice_button_03").innerHTML = dialogueNode.responses[2].text;
    document.getElementById("choice_button_04").innerHTML = dialogueNode.responses[3].text;
}

document.onload = loadDialogueNode(diagNodeS101);

var choiceButton01 = document.querySelector("#choice_button_01");
choiceButton01.addEventListener("click",function(){
    console.log("Clicked!");
    loadDialogueNode(currentDialogueNode.responses[0]);
})