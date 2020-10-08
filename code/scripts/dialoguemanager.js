//Which dialogue tree and node is currently active
var dialogueTree = null;
var currentDialogueNode =  null;

//All of the HTML elements that the node uses
var locationText = document.getElementById("dialogue_locationlabel");
var dialogueText = document.getElementById("dialogue_text_main");


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
        updateChoiceButtons();
    }
    else 
    {
        console.warn("Cannot load Dialogue Node: No Dialogue Tree has been loaded!");
    }
}

function clearChoiceButtons() {
    document.querySelectorAll('.dialogue_choice_container').forEach(function(a){a.remove()});
}

function updateChoiceButtons() {
    if(currentDialogueNode != null)
    {
        clearChoiceButtons();
        for (var i = 0; i < currentDialogueNode.responses.length; i++)
        {
            const newDiv = document.createElement('div');
            const newButton = document.createElement('button');
            const newButtonText = document.createTextNode(currentDialogueNode.responses[i].text);
            newDiv.className = "dialogue_choice_container";
            newButton.className = "dialogue_choice_button";
            newButton.id = "choice_button_" + (i + 1);
            const nextNodeIndex = currentDialogueNode.responses[i].nextNode;
            newButton.addEventListener("click", function() {
                loadDialogueNode(nextNodeIndex);
            });
            newButton.appendChild(newButtonText);
            newDiv.appendChild(newButton);
            const responsesWindow = document.getElementById("dialogue_choices");
            responsesWindow.appendChild(newDiv);
        }
    }
    else 
    {
        console.warn("Cannot update Choice Buttons: No currentDialogueNode has been loaded!");
    }
}

document.onload = loadDialogueTree('/code/json/dialogue/dialogue_boat_wakeup.json');

var resetButton = document.getElementById("reset_button");
resetButton.addEventListener("click", function() {
    loadDialogueNode(0);
});