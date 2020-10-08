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
        addDialogueParagraphs();
        updateChoiceButtons();
    }
    else 
    {
        console.warn("Cannot load Dialogue Node: No Dialogue Tree has been loaded!");
    }
}

function addDialogueParagraphs() {
    for(let i = 0; i < currentDialogueNode.paragraphs.length; i++)
    {
        let dialogueWindow = document.getElementById('dialogue_window');
        //create elements
        let newDiv = document.createElement('div');
        let newLabel = document.createElement('h3');
        let newLabelText = document.createTextNode(currentDialogueNode.paragraphs[i].speaker);
        let newParagraph = document.createElement('p');
        let newParagraphText = document.createTextNode(currentDialogueNode.paragraphs[i].text);
        //assign classes and id
        newDiv.className = "dialogue_paragraph";
        newDiv.id = "paragraph_" + (i) + "_node_" + currentDialogueNode.nodeID;
        newParagraph.className = "dialogue_paragraph_text";
        //This solution is not optimal, look over it again
        if(currentDialogueNode.paragraphs[i].narration == false)
        {
            newLabel.appendChild(newLabelText);
            newDiv.appendChild(newLabel);
        }
        else 
        {
            newLabelText.remove;
            newLabel.remove;
        }
        //append children
        newParagraph.appendChild(newParagraphText);
        newDiv.appendChild(newParagraph);
        dialogueWindow.appendChild(newDiv);
    }
}

function clearDialogueParagraphs () {
    let dialogueWindow = document.getElementById('dialogue_window');
    dialogueWindow.innerHTML = '';
}

function clearChoiceButtons() {
    document.querySelectorAll('.dialogue_choice_container').forEach(function(a){a.remove()});
}

function updateChoiceButtons() {
    if(currentDialogueNode != null)
    {
        clearChoiceButtons();
        for (let i = 0; i < currentDialogueNode.responses.length; i++)
        {
            let newDiv = document.createElement('div');
            let newButton = document.createElement('button');
            let newButtonText = document.createTextNode(currentDialogueNode.responses[i].text);
            newDiv.className = "dialogue_choice_container";
            newButton.className = "dialogue_choice_button";
            newButton.id = "choice_button_" + (i + 1);
            let nextNodeIndex = currentDialogueNode.responses[i].nextNode;
            newButton.addEventListener("click", function() {
                loadDialogueNode(nextNodeIndex);
            });
            newButton.appendChild(newButtonText);
            newDiv.appendChild(newButton);
            let responsesWindow = document.getElementById("dialogue_choices");
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

var clearButton = document.getElementById('clear_button');
clearButton.addEventListener('click', function() {
    clearDialogueParagraphs();
})