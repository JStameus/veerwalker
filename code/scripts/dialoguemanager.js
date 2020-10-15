//this is temporary, should be stored somewhere else later
var playerName = 'Joseph';

//Which dialogue tree and node is currently active
var dialogueTreeURL = '/code/json/dialogue/testfile.json';
var dialogueTree = null;
var currentDialogueNode =  null;
var checkPointNode = 0;

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
        displayResponseButtons();
    }
    else 
    {
        console.warn("Cannot load Dialogue Node: No Dialogue Tree has been loaded!");
    }
    let paragraphDisplay = document.getElementById('display_paragraphs_amount');
    let responseDisplay = document.getElementById('display_responses_amount');
    paragraphDisplay.innerText = "Paragraphs: " + currentDialogueNode.paragraphs.length;
    responseDisplay.innerText = "Responses: " + currentDialogueNode.responses.length;
}

function refreshDialogueNode() {
    clearAllDialogueElements();
    loadDialogueNode(currentDialogueNode.nodeIndex);
    // let paragraphDisplay = document.getElementById('display_paragraphs_amount');
    // let responseDisplay = document.getElementById('display_responses_amount');
    // paragraphDisplay.innerText = "Paragraphs: " + currentDialogueNode.paragraphs.length;
    // responseDisplay.innerText = "Responses " + currentDialogueNode.responses.length;
}

//functions for manipulating HTML content
function displayResponseParagraphs(responseIndex) {
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

function clearResponseButtons() {
    document.querySelectorAll('.dialogue_choice_container').forEach(function(a){a.remove()});
}

function clearLocationLabel() {
    let locationText = document.getElementById('dialogue_locationlabel');
    locationText.innerHTML = 'EVENT/LOCATION';
}

function clearAllDialogueElements() {
    clearLocationLabel();
    clearDialogueParagraphs();
    clearResponseButtons();
}

function setCheckpointNode() {
    checkPointNode = currentDialogueNode.nodeIndex;
    checkPointNodeDisplay.innerText = ("Checkpoint: " + currentDialogueNode.nodeIndex + ", ID: " + currentDialogueNode.nodeID);
}

function displayResponseButtons() {
    if(currentDialogueNode != null)
    {
        clearResponseButtons();
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
                displayResponseParagraphs(i);
                loadDialogueNode(nextNodeIndex);
            });
            newButton.appendChild(newButtonText);
            newDiv.appendChild(newButton);

            //Creating the dev tools
            let newClearNextNodeButton = document.createElement('button');
            let newClearNextNodeButtonText = document.createTextNode("Clear nextNode");
            newClearNextNodeButton.appendChild(newClearNextNodeButtonText);
            newClearNextNodeButton.className = ('devtools_responsebuttons');
            let newCreateNextNodeButton = document.createElement('button');
            let newCreateNextNodeButtonText = document.createTextNode('Create new nextNode');
            newCreateNextNodeButton.appendChild(newCreateNextNodeButtonText);
            newCreateNextNodeButton.className = ('devtools_responsebuttons');
            let newNextNodeIndexDisplay = document.createElement('p');
            let newNextNodeIndexText = document.createTextNode('nextNode: ' + currentDialogueNode.responses[i].nextNode);
            newNextNodeIndexDisplay.appendChild(newNextNodeIndexText);
            newNextNodeIndexDisplay.className = ('devtools_responsebuttons');
            if(toolVisibility == true)
            {
                newClearNextNodeButton.style.display = "inline-block";
                newCreateNextNodeButton.style.display = "inline-block";
                newNextNodeIndexDisplay.style.display = "inline-block";
            }
            else if(toolVisibility == false)
            {
                newClearNextNodeButton.style.display = "none";
                newCreateNextNodeButton.style.display = "none";
                newNextNodeIndexDisplay.style.display = "none";
            }
            

            //setting up the dev tools
            newDiv.appendChild(newClearNextNodeButton);
            newDiv.appendChild(newCreateNextNodeButton);
            newDiv.appendChild(newNextNodeIndexDisplay);
            newCreateNextNodeButton.addEventListener("click", function() {
                if(currentDialogueNode.responses[i].nextNode == null)
                {
                    let newNodeIndex = createNewNodeIndex();
                    currentDialogueNode.responses[i].nextNode = newNodeIndex;
                    createNewDialogueNode("Node " + newNodeIndex, "NextNode created from Node: " + currentDialogueNode.nodeIndex);
                    refreshDialogueNode();
                }
                else 
                {
                    console.warn("Cannot create new nextNode: " + currentDialogueNode.nodeIndex + ", ID: " + currentDialogueNode.nodeID + ": Response " + i + " already has a nextNode! Please assign it manually.");
                }
            })
            newClearNextNodeButton.addEventListener('click', function() {
                clearNextNode(i);
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

let toolVisibility = true;
//toggle dev menu
function toggleDevTools() {
    let menuElements = document.querySelectorAll(".devmenu");
    let responseToolElements = document.querySelectorAll('.devtools_responsebuttons');
    if(toolVisibility == true) {
        for(let i = 0; i < menuElements.length; i++)
        {
            menuElements[i].style.display = "none";
        }
        for(let i = 0; i < responseToolElements.length; i++)
        {
            responseToolElements[i].style.display = "none";
        }
        toolVisibility = false;
    }
    else if(toolVisibility == false)
    {
        for(let i = 0; i < menuElements.length; i++)
        {
            menuElements[i].style.display = "flex";
        }
        for(let i = 0; i < responseToolElements.length; i++)
        {
            responseToolElements[i].style.display = "inline-block";
        }
        toolVisibility = true;
    }
    
}

//dev tools UI and buttons
var currentNodeDisplay = document.getElementById('devmenu_currentnodedisplay');
currentNodeDisplay.innerText = ("Current Node: " + currentDialogueNode);

var checkPointNodeDisplay = document.getElementById('devmenu_checkpointnodedisplay');
checkPointNodeDisplay.innerText = ("Checkpoint: " + checkPointNode);

const toggleDevMenuButton = document.getElementById('toggle_devmenu_button');
toggleDevMenuButton.addEventListener("click", function() {
    toggleDevTools();
})

const checkpointButton = document.getElementById('checkpoint_button');
checkpointButton.addEventListener('click', function() {
    setCheckpointNode();
})

const resetButton = document.getElementById('reset_button');
resetButton.addEventListener("click", function() {
    clearAllDialogueElements();
    loadDialogueNode(checkPointNode);
})

const refreshButton = document.getElementById('refresh_button');
refreshButton.addEventListener('click', function() {
    refreshDialogueNode();
})

const clearButton = document.getElementById('clear_button');
clearButton.addEventListener('click', function() {
    clearAllDialogueElements();
})

const editLocationButton = document.getElementById('edit_location_button');
editLocationButton.addEventListener('click', function() {
    editNodeLocation();
})

const editDescriptionButton = document.getElementById('edit_description_button');
editDescriptionButton.addEventListener('click', function() {
    editNodeDescription();
})

const createNewNodeButton = document.getElementById('createnode_button');
createNewNodeButton.addEventListener('click', function() {
    let newNodeIndex = createNewNodeIndex();
    let newNodeID = createNewNodeID();
    createNewDialogueNode("Node " + newNodeIndex, "New Node: " + newNodeIndex + ", ID: " + newNodeID);
})

const saveTreeButton = document.getElementById('save_tree_button');
saveTreeButton.addEventListener("click", function() {
    saveDialogueTree();
})

const loadNodeButton = document.getElementById('load_node_button');
loadNodeButton.addEventListener('click', function() {
    loadDialogueNode(document.getElementById('load_node_index').value);
})

const addParagraphButton = document.getElementById('add_paragraph_button');
addParagraphButton.addEventListener('click', function() {
    createDialogueParagraph(true, null, (currentDialogueNode.paragraphs.length) + ": New Paragraph.");
})

const addResponseButton = document.getElementById('add_response_button');
addResponseButton.addEventListener('click', function() {
    createDialogueResponse(currentDialogueNode.responses.length + ": New Response", null);
})

const toggleNarrationButton = document.getElementById('toggle_narration_button');
toggleNarrationButton.addEventListener('click', function() {
    toggleNarrationBool();
})

const updateParagraphButton = document.getElementById('update_paragraph_button');
updateParagraphButton.addEventListener('click', function() {
    editDialogueParagraph();
})

const updateResponseButton = document.getElementById('update_response_button');
updateResponseButton.addEventListener('click', function() {
    editDialogueResponse();
    refreshDialogueNode();
})

const updateNextNodeButton = document.getElementById('update_nextnode_button');
updateNextNodeButton.addEventListener('click', function() {
    editNextNode();
    refreshDialogueNode();
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
    refreshDialogueNode();
}

function createDialogueResponse(textContent, nextNodeIndex) {
    var newResponse = {
        text: textContent,
        nextNode: nextNodeIndex
    }
    currentDialogueNode.responses.push(newResponse);
    refreshDialogueNode();
}

var devToolNarrationToggle = false;

function toggleNarrationBool() {
    let boolDisplay = document.getElementById('narrationbool_display');
    if(devToolNarrationToggle == false) {
        devToolNarrationToggle = true;
        boolDisplay.innerHTML = "Is Narration: " + devToolNarrationToggle;
    }
    else if(devToolNarrationToggle == true) {
        devToolNarrationToggle = false;
        boolDisplay.innerHTML = "Is Narration: " + devToolNarrationToggle;
    }
    console.log(devToolNarrationToggle);
}


function editDialogueParagraph(index, narrationBool, speakerName, textContent) {
    let indexField = document.getElementById('form_paragraph_index').value;
    let nameField = document.getElementById('form_paragraph_speakername').value;
    let textField = document.getElementById('form_paragraph_text').value;
    
    if(indexField != null) {
        index = indexField;
    }
    if(nameField != '')
    {
        speakerName = nameField;
        currentDialogueNode.paragraphs[index].speaker = speakerName;
    } 
    else if(nameField == 'null') {
        speakerName = null;
    }

    if(textField != '')
    {
        textContent = textField;
        currentDialogueNode.paragraphs[index].text = textContent;
    } 
    else if(textField == 'null') {
        textContent = "Empty Paragraph";
    }
    currentDialogueNode.paragraphs[index].narration = devToolNarrationToggle;
    refreshDialogueNode();
}

function editDialogueResponse(index, textContent) {
    let indexField = document.getElementById('form_response_index').value;
    if(indexField != null) {
        index = indexField;
    }
    let textField = document.getElementById('form_response_text').value;
    if(textField != '') {
        textContent = textField;
        currentDialogueNode.responses[index].text = textContent;
    } 
    else {
        textContent = "Empty Response";
        currentDialogueNode.responses[index].text = textContent;
    }
    refreshDialogueNode();
    console.log("Updating Response...");
}

function editNextNode(responseIndex, nextNodeIndex) {
    let indexField = document.getElementById('form_response_index').value;
    if(indexField != null) {
        responseIndex = indexField;
    }
    let nextNodeField = document.getElementById('form_response_nextnode').value;
    if(nextNodeField != null) {
        nextNodeIndex = nextNodeField;
        currentDialogueNode.responses[responseIndex].nextNode = nextNodeIndex;
    }
}

function clearNextNode(responseIndex) {
    currentDialogueNode.responses[responseIndex].nextNode = null;
    refreshDialogueNode();
}

function editNodeLocation() {
    let textField = document.getElementById('input_text_location').value;
    currentDialogueNode.location = textField;
    refreshDialogueNode();
}

function editNodeDescription() {
    let textField = document.getElementById('input_text_description').value;
    currentDialogueNode.description = textField;
    refreshDialogueNode();
}

function createNewDialogueNode(location, description) {
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

function saveDialogueTree() {
    newDialogueTree = JSON.stringify(dialogueTree);
    var newWindow = window.open();
    newWindow.document.title = dialogueTreeURL;
    var newWindowBody = newWindow.document.body;
    var newDataText = document.createTextNode(newDialogueTree);
    newWindowBody.appendChild(newDataText);
}

function displayFormValues() {
    let indexField = document.getElementById('form_paragraph_index').value;
    let narrationBox = document.getElementById('form_paragraph_narrationbool').value;
    let nameField = document.getElementById('form_paragraph_speakername').value;
    let textField = document.getElementById('form_paragraph_text').value;

    console.log("---FORM VALUES---");
    console.log("Index: " + indexField);
    console.log("Narration: " + narrationBox);
    console.log("Name: " + nameField);
    console.log("Text: " + textField);
}