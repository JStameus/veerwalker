//this is temporary, should be stored somewhere else later
var playerName = 'Joseph';
var checkPointNode = 0;

//Which dialogue tree and node is currently active
var dialogueTreeURL = '/code/json/dialogue/testfile.json';
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
        currentNodeDisplay.innerText = ("Current Node: " + nodeIndex + ", ID: " + dialogueTree.nodes[nodeIndex].nodeID);
        displayDialogueParagraphs();
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
            let dialogueWindow = document.getElementById('dialogue_textwindow');

            let newDiv = document.createElement('div');
            let newLabel = document.createElement('h3');
            let newLabelText = document.createTextNode(playerName);
            let newParagraph = document.createElement('p');
            let newParagraphText = document.createTextNode(currentDialogueNode.responses[responseIndex].text);
            newDiv.className = "dialogue_paragraph_container paragraph_response";
            newParagraph.className = "dialogue_paragraph_text";

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

function displayDialogueParagraphs() {
    for(let i = 0; i < currentDialogueNode.paragraphs.length; i++)
    {
        let dialogueWindow = document.getElementById('dialogue_textwindow');

        let newDiv = document.createElement('div');
        let newLabel = document.createElement('h3');
        let newLabelText = document.createTextNode(currentDialogueNode.paragraphs[i].speaker);
        let newParagraph = document.createElement('p');
        let newParagraphText = document.createTextNode(currentDialogueNode.paragraphs[i].text);

        newDiv.className = "dialogue_paragraph_container";
        newDiv.id = "paragraph_" + (i) + "_node_" + currentDialogueNode.nodeID;
        newParagraph.className = "dialogue_paragraph_text";
        //This solution is not optimal, look over it again
        if(currentDialogueNode.paragraphs[i].narration == false)
        {
            newLabel.appendChild(newLabelText);
            newDiv.appendChild(newLabel);
            newDiv.className = "dialogue_paragraph_container paragraph_dialogue"
        }
        else 
        {
            newLabelText.remove;
            newLabel.remove;
            newDiv.className = "dialogue_paragraph_container paragraph_narration"
        }
        newParagraph.appendChild(newParagraphText);
        newDiv.appendChild(newParagraph);
        dialogueWindow.appendChild(newDiv);
    }
}

function clearDialogueParagraphs () {
    let dialogueWindow = document.getElementById('dialogue_textwindow');
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
            //Creating the dialogue choice
            let newDiv = document.createElement('div');
            let newButton = document.createElement('button');
            let newButtonText = document.createTextNode((i + 1) + ". " + currentDialogueNode.responses[i].text);

            //setting up the div and dialogue choice button
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

            //Creating the dev tools
            let newAssignNextNodeButton = document.createElement('button');
            let newAssignNextNodeButtonText = document.createTextNode("Assign nextNode");
            newAssignNextNodeButton.appendChild(newAssignNextNodeButtonText);
            newAssignNextNodeButton.className = ('devtools_responsebuttons');
            let newCreateNextNodeButton = document.createElement('button');
            let newCreateNextNodeButtonText = document.createTextNode('Create new nextNode');
            newCreateNextNodeButton.appendChild(newCreateNextNodeButtonText);
            newCreateNextNodeButton.className = ('devtools_responsebuttons');

            //setting up the dev tools
            newDiv.appendChild(newAssignNextNodeButton);
            newDiv.appendChild(newCreateNextNodeButton);
            newCreateNextNodeButton.addEventListener("click", function() {
                addNewDialogueNode(null, "NextNode created from Node: " + currentDialogueNode.nodeIndex);
            })

            //Adding everything to the control panel
            let responsesWindow = document.getElementById("controlpanel_choices");
            responsesWindow.appendChild(newDiv);
        }
    }
    else 
    {
        console.warn("Cannot update Choice Buttons: No currentDialogueNode has been loaded!");
    }
}

document.onload = loadDialogueTree('/code/json/dialogue/testfile.json');

//debugging functions 
function checkNullNextNodes() {
    let a = 0;
    let b = 0;
    for(a = 0; a < dialogueTree.nodes.length; a++)
    {
        console.log("--Node: " + dialogueTree.nodes[a].nodeIndex + " " + "ID: " + dialogueTree.nodes[a].nodeID + "--");
        for(b = 0; b < dialogueTree.nodes[a].responses.length; b++)
        {
            if(dialogueTree.nodes[a].responses[b].nextNode == null)
            {
                console.warn("Response " + b + " has a NULL nextNode!");
            }
        }
    }
}

function checkAdjacentNodes(nodeIndex) {
    console.log("--Node: " + dialogueTree.nodes[nodeIndex].nodeIndex + " ID: " + dialogueTree.nodes[nodeIndex].nodeID + "--");
    console.log("Points to: ");
    for(let i = 0; i < dialogueTree.nodes[nodeIndex].responses.length; i++)
    {
        console.log(dialogueTree.nodes[nodeIndex].responses[i].nextNode);
    }
}

function checkNodeDescription(nodeIndex) {
    console.log("--Node: " + dialogueTree.nodes[nodeIndex].nodeIndex + " ID: " + dialogueTree.nodes[nodeIndex].nodeID + "--");
    console.log(dialogueTree.nodes[nodeIndex].description);
}

function checkParagraphCount(nodeIndex) {
    console.log("--Node: " + dialogueTree.nodes[nodeIndex].nodeIndex + " ID: " + dialogueTree.nodes[nodeIndex].nodeID + "--");
    console.log("Has " + dialogueTree.nodes[nodeIndex].paragraphs.length + " paragraphs.");
}

function checkResponseCount(nodeIndex) {
    console.log("--Node: " + dialogueTree.nodes[nodeIndex].nodeIndex + " ID: " + dialogueTree.nodes[nodeIndex].nodeID + "--");
    console.log("Has " + dialogueTree.nodes[nodeIndex].responses.length + " responses.");
}

function checkLastNodeInfo() {
    let lastNode = dialogueTree.nodes[dialogueTree.nodes.length - 1];
    console.log("Amount of nodes: " + dialogueTree.nodes.length);
    console.log("Last Node: --" + lastNode.nodeIndex + ", ID: " + lastNode.nodeID + "--");
}

//dev menu buttons
function toggleDevTools() {
    let menuElement = document.getElementById('devmenu');
    if(menuElement.style.display == "none") {
        menuElement.style.display = "flex";
    }
    else {
        menuElement.style.display = "none";
    }
    let responseToolElements = document.querySelectorAll('.devtools_responsebuttons');
    for(let i = 0; i < responseToolElements.length; i++)
    {
        if(responseToolElements[i].style.display == "none") {
            responseToolElements[i].style.display = "inline-block";
        }
        else {
            responseToolElements[i].style.display = "none";
        }
    }
}

var currentNodeDisplay = document.getElementById('devmenu_currentnodedisplay');
currentNodeDisplay.innerText = ("Current Node: " + currentDialogueNode);

const toggleDevMenuButton = document.getElementById('toggle_devmenu_button');
toggleDevMenuButton.addEventListener("click", function() {
    toggleDevTools();
})

const resetButton = document.getElementById('reset_button');
resetButton.addEventListener("click", function() {
    clearAllDialogueElements();
    loadDialogueNode(checkPointNode);
})

const clearButton = document.getElementById('clear_button');
clearButton.addEventListener('click', function() {
    clearAllDialogueElements();
})



//adding and editing nodes
function createNewNodeIndex() {
    let newIndex = (dialogueTree.nodes[dialogueTree.nodes.length - 1].nodeIndex + 1);
    return newIndex;
}

function createNewNodeID() {
    let newID = (dialogueTree.nodes[dialogueTree.nodes.length - 1].nodeID + 1);
    return newID;
}

function createDialogueParagraph(narrationBool, speakerName, textContent) {
    var newParagraph = {
        narration: narrationBool,
        speaker: speakerName,
        text: textContent
    }
    currentDialogueNode.paragraphs.push(newParagraph);
}

function createDialogueResponse(textContent, nextNodeIndex) {
    var newResponse = {
        text: textContent,
        nextNode: nextNodeIndex
    }
    currentDialogueNode.responses.push(newResponse);
}

function addNewDialogueNode(location, description) {
    if(location == null)
    {
        location = "New Node Location";
    }
    if(description == null)
    {
        description = "New Node Description";
    }
    var newNode = { nodeIndex: createNewNodeIndex(),
        nodeID: createNewNodeID(),
        location: location,
        description: description,
        paragraphs: 
        [
            {
                narration: true,
                speaker: null,
                text: "New Node Paragraph"
            }
        ],
        responses:
        [
            {
                text: "New Node Response",
                nextNode: null
            }
        ]
    }
    console.log("Created new Node: " + newNode.nodeIndex + ", ID: " + newNode.nodeID);
    dialogueTree.nodes.push(newNode);
}

function addNewNextNode() {
    //addNewDialogueNode()
    //assign nextNode to the index of the new node
}


function saveDialogueTree() {
    newDialogueTree = JSON.stringify(dialogueTree);
    var newWindow = window.open();
    newWindow.document.title = dialogueTreeURL;
    var newWindowBody = newWindow.document.body;
    var newDataText = document.createTextNode(newDialogueTree);
    newWindowBody.appendChild(newDataText);
}