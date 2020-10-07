//Which dialogue tree and node is currently active
var dialogueTree = null;
var currentDialogueNode =  null;
//Variables for storing the index of each responses next node
// var response01NextNode = null;
// var response02NextNode = null;
// var response03NextNode = null;
// var response04NextNode = null;

//functions for loading new trees and nodes
function loadDialogueTree(fileURL) {
    fetch(fileURL).then(response => response.json()).then(json => {dialogueTree = json});
}

function loadDialogueNode(nodeIndex) {
    if(dialogueTree != null)
    {
        currentDialogueNode = dialogueTree.nodes[nodeIndex];
        locationText.innerHTML = dialogueTree.nodes[nodeIndex].location;
        dialogueText.innerHTML = dialogueTree.nodes[nodeIndex].paragraphs[0].text;
        choiceButton01.innerHTML = dialogueTree.nodes[nodeIndex].responses[0].text;
        choiceButton02.innerHTML = dialogueTree.nodes[nodeIndex].responses[1].text;
        choiceButton03.innerHTML = dialogueTree.nodes[nodeIndex].responses[2].text;
        choiceButton04.innerHTML = dialogueTree.nodes[nodeIndex].responses[3].text;
        response01NextNode = dialogueTree.nodes[nodeIndex].responses[0].nextNode;
        response02NextNode = dialogueTree.nodes[nodeIndex].responses[1].nextNode;
        response03NextNode = dialogueTree.nodes[nodeIndex].responses[2].nextNode;
        response04NextNode = dialogueTree.nodes[nodeIndex].responses[3].nextNode;
    }
    else 
    {
        console.warn("No Dialogue Tree has been loaded!");
    }
}

//All of the HTML elements that the node uses
var locationText = document.getElementById("dialogue_locationlabel");
var dialogueText = document.getElementById("dialogue_text_main");

var choiceButtons = [];
var responseNextNodes = [];

var choiceButton01 = document.querySelector("#choice_button_01");
choiceButton01.addEventListener("click",function(){
    console.log("Clicked Button 1");
    loadDialogueNode(response01NextNode);
});

var choiceButton02 = document.querySelector("#choice_button_02");
choiceButton02.addEventListener("click", function() {
    console.log("Clicked Button 2");
});

var choiceButton03 = document.querySelector("#choice_button_03");
choiceButton03.addEventListener("click", function() {
    console.log("Clicked Button 3");
});

var choiceButton04 = document.querySelector("#choice_button_04");
choiceButton04.addEventListener("click", function() {
    console.log("Clicked Button 4");
});

function clearChoiceButtons() {
    document.querySelectorAll('.dialogue_choice_container').forEach(function(a){a.remove()});
}

function updateChoiceButtons() {
    clearChoiceButtons();
    //Creates new buttons based on the responses of the dialogue node
    for (var i = 0; i < currentDialogueNode.responses.length; i++)
    {
        const newDiv = document.createElement('div');
        const newButton = document.createElement('button');
        newDiv.className = "dialogue_choice_container";
        newButton.className = "dialogue_choice_button";
        const newButtonText = document.createTextNode(currentDialogueNode.responses[i].text);
        newButton.appendChild(newButtonText);
        newDiv.appendChild(newButton);
        const responsesWindow = document.getElementById("dialogue_choices");
        responsesWindow.appendChild(newDiv);
        console.log("Created a new Response Button!");
    }
    //make the buttons clickable!
}

document.onload = loadDialogueTree('/code/json/dialogue/dialogue_boat_wakeup.json');

