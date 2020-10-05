var locationText = document.getElementById("dialogue_locationlabel");
var dialogueText = document.getElementById("dialogue_text_main");

var choiceButton01 = document.querySelector("#choice_button_01");
choiceButton01.addEventListener("click",function(){
    console.log("Clicked Button 1");
    //loadDialogueNode(currentDialogueNode.responses[0].nextNode);
});

var choiceButton02 = document.querySelector("#choice_button_02");
choiceButton02.addEventListener("click", function() {
    console.log("Clicked Button 2");
    //loadDialogueNode(currentDialogueNode.responses[1].nextNode);
});

var choiceButton03 = document.querySelector("#choice_button_03");
choiceButton03.addEventListener("click", function() {
    console.log("Clicked Button 3");
    //loadDialogueNode(currentDialogueNode.responses[2].nextNode);
});

var choiceButton04 = document.querySelector("#choice_button_04");
choiceButton04.addEventListener("click", function() {
    console.log("Clicked Button 4");
    //loadDialogueNode(currentDialogueNode.responses[3].nextNode);
});

var currentDialogueNode =  null;

function loadDialogueTree() {
    //load the json file for the dialogue tree
}

function loadDialogueNode() {
    //load a specific node from the current tree 
    //add its location to the locationText
    //loop through its paragraphs and add them to the dialogueText
    //loop(?) through the responses and add them to the buttons
    //set the current node to the node you just loaded
}



