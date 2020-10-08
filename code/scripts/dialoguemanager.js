//this is temporary, should be stored somewhere else later
var playerName = 'Morrowind Guy';

//Which dialogue tree and node is currently active
var dialogueTree = null;
var currentDialogueNode =  null;

//functions for loading new trees and nodes
function loadDialogueTree(fileURL) {
    fetch(fileURL).then(response => response.json()).then(json => {dialogueTree = json});
}

function loadDialogueNode(nodeIndex) {
    if(dialogueTree != null)
    {
        currentDialogueNode = dialogueTree.nodes[nodeIndex];
        let locationText = document.getElementById('dialogue_locationlabel');
        locationText.innerHTML = dialogueTree.nodes[nodeIndex].location;
        addDialogueParagraphs();
        updateChoiceButtons();
    }
    else 
    {
        console.warn("Cannot load Dialogue Node: No Dialogue Tree has been loaded!");
    }
}

//functions for manipulating HTML content
function addResponseParagraph(responseIndex) {
    if(currentDialogueNode != null)
    {
        if (playerName != null)
        {
            let dialogueWindow = document.getElementById('dialogue_window');

            let newDiv = document.createElement('div');
            let newLabel = document.createElement('h3');
            let newLabelText = document.createTextNode(playerName);
            let newParagraph = document.createElement('p');
            let newParagraphText = document.createTextNode(currentDialogueNode.responses[responseIndex].text);
            newDiv.className = "dialogue_paragraph paragraph_response";

            newLabel.appendChild(newLabelText);
            newParagraph.appendChild(newParagraphText);
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newParagraph);
            dialogueWindow.appendChild(newDiv);
        }
        else 
        {
            console.warn("Cannot add Player Response Paragraph: Player Name is NULL!");
        }
    }
    else
    {
        console.warn("Cannot add Response Paragraph: No Dialogue Node has been loaded!");
    }
    
}

function addDialogueParagraphs() {
    for(let i = 0; i < currentDialogueNode.paragraphs.length; i++)
    {
        let dialogueWindow = document.getElementById('dialogue_window');

        let newDiv = document.createElement('div');
        let newLabel = document.createElement('h3');
        let newLabelText = document.createTextNode(currentDialogueNode.paragraphs[i].speaker);
        let newParagraph = document.createElement('p');
        let newParagraphText = document.createTextNode(currentDialogueNode.paragraphs[i].text);

        newDiv.className = "dialogue_paragraph";
        newDiv.id = "paragraph_" + (i) + "_node_" + currentDialogueNode.nodeID;
        newParagraph.className = "dialogue_paragraph_text";
        //This solution is not optimal, look over it again
        if(currentDialogueNode.paragraphs[i].narration == false)
        {
            newLabel.appendChild(newLabelText);
            newDiv.appendChild(newLabel);
            newDiv.className = "dialogue_paragraph paragraph_dialogue"
        }
        else 
        {
            newLabelText.remove;
            newLabel.remove;
            newDiv.className = "dialogue_paragraph paragraph_narration"
        }
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

function clearLocationLabel() {
    let locationText = document.getElementById('dialogue_locationlabel');
    locationText.innerHTML = 'EVENT/LOCATION';
}

function clearAllDialogueElements() {
    clearLocationLabel();
    clearDialogueParagraphs();
    clearChoiceButtons();
}

function updateChoiceButtons() {
    if(currentDialogueNode != null)
    {
        clearChoiceButtons();
        for (let i = 0; i < currentDialogueNode.responses.length; i++)
        {
            let newDiv = document.createElement('div');
            let newButton = document.createElement('button');
            let newButtonText = document.createTextNode((i + 1) + ". " + currentDialogueNode.responses[i].text);
            newDiv.className = "dialogue_choice_container";
            newButton.className = "dialogue_choice_button";
            newButton.id = "choice_button_" + (i + 1);
            let nextNodeIndex = currentDialogueNode.responses[i].nextNode;
            newButton.addEventListener("click", function() {
                addResponseParagraph(i);
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

//buttons for testing purposes, these are only temporary
var resetButton = document.getElementById("reset_button");
resetButton.addEventListener("click", function() {
    clearAllDialogueElements();
    loadDialogueNode(0);
});

var clearButton = document.getElementById('clear_button');
clearButton.addEventListener('click', function() {
    clearAllDialogueElements();
})