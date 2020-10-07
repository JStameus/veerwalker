//Which dialogue tree and node is currently active
var dialogueTree = null;
var currentDialogueNode =  null;
//Variables for storing the index of each responses next node
var response01NextNode = null;
var response02NextNode = null;
var response03NextNode = null;
var response04NextNode = null;

//functions for loading new trees and nodes
function loadDialogueTree(fileURL) {
    fetch(fileURL).then(response => response.json()).then(json => {dialogueTree = json});
}

function loadDialogueNode(dialogueNode) {
    if(dialogueTree != null)
    {
        locationText.innerHTML = dialogueNode.location;
        dialogueText.innerHTML = dialogueNode.paragraphs[0].text;
        choiceButton01.innerHTML = dialogueNode.responses[0].text;
        choiceButton02.innerHTML = dialogueNode.responses[1].text;
        choiceButton03.innerHTML = dialogueNode.responses[2].text;
        choiceButton04.innerHTML = dialogueNode.responses[3].text;
        currentDialogueNode = dialogueNode;
        response01NextNode = dialogueNode.responses[0].nextNode;
        response02NextNode = dialogueNode.responses[1].nextNode;
        response03NextNode = dialogueNode.responses[2].nextNode;
        response04NextNode = dialogueNode.responses[3].nextNode;
    }
    else 
    {
        console.warn("No Dialogue Tree has been loaded!");
    }
    //load a specific node from the current tree 
    //add its location to the locationText
    //loop through its paragraphs and add them to the dialogueText
    //loop(?) through the responses and add them to the buttons
    //set the current node to the node you just loaded
}

//All of the HTML elements that the node uses
var locationText = document.getElementById("dialogue_locationlabel");
var dialogueText = document.getElementById("dialogue_text_main");

var choiceButton01 = document.querySelector("#choice_button_01");
choiceButton01.addEventListener("click",function(){
    console.log("Clicked Button 1");
    loadDialogueNode(dialogueTree.nodes[response01NextNode]);
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

function updateChoiceButtons() {
    //for each response in currentDialogueNode
        //create a new div with the class 'dialogue_choice_container'
        //create a new button with the class 'dialogue_choice_button'
        //assign the innerText on the new button to the text of the response
        //assign the nextNode of the corresponding choice button 
        //append the whole thingamajig to the div 
    //for each new div created
        //append the divs to .dialogue_choices
}

document.onload = loadDialogueTree('/code/json/dialogue/dialogue_boat_wakeup.json');

