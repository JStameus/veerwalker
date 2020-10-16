function yeehawNodes() {
    for(let i = 0; i < dialogueTree.nodes.length; i++)
    {
        console.log("Yeeehaw " + dialogueTree.nodes[i].nodeIndex + "!");
    }
}

function NodeBox(index, ID, nextNodes) {
    this.index = index;
    this.ID = ID;
    this.nextNodes = nextNodes;
}

var nodeBox01 = new NodeBox(dialogueTree.nodes[0].nodeIndex, dialogueTree.nodes[0].nodeID, null);