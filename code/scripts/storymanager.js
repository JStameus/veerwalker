//STORY MANAGER REQUIRES dialoguemanager.js TO RUN! 


/**
 * @param {string} name
 * @param {string} description
 * @param {number} triggerNode
 * @param {function} operation
 */
//checked when a dialoguenode loads, and does something depending on the value of a "fact" variable
//rules describe the behaviour of people and events in the story
function StoryRule(name, description, triggerNode, operation) {
    //the name of the rule, for quick identification
    this.name = name;
    //a short description of what the rule does
    this.description = description;
    //which node triggers the rule
    this.triggerNode = triggerNode;
    //an anonymous function that the rule calls when triggered
    this.operation = operation;
}

//checks if the current node has any rules associated with it, and executes them
/**
 * @param {array} ruleSet
 */
function executeStoryRules(ruleSet) {
    for(let i = 0; i < ruleSet.length; i++)
    {
        if(currentDialogueNode.nodeIndex == ruleSet[i].triggerNode)
        {
            console.log(`Found a StoryRule trigger at Node ${currentDialogueNode.nodeIndex}, calling function...`);
            ruleSet[i].operation();
            break;
        }
    }
}

//STORY FACTS (variables specifically created to keep track of story events)
let barrelPumpIsActive = true;
let playerHasPowerCoupling = false;
let boatRideCost = 25;
let schleems = 4;
let testManSummoned = false;

//STORY RULES (all rules and conditions that control the flow of the story)
let storyRules = [
    globalRules = {
        name: "ruleset_global",
        rules: [
            
        ]
    },
    escapePodRules = {
        name: "ruleset_escapepod",
        rules: [
            new StoryRule("barrelPumpSwitch", "Toggles the barrel pump on and off.", 9, () => {
                if(barrelPumpIsActive == true) {
                    console.log(`Rule: barrelPumpSwitch executed successfully!`);
                    console.log("Switching off barrel pump...");
                    barrelPumpIsActive = false;
                } else {
                    console.log("Switching on barrel pump...");
                    barrelPumpIsActive = true;
                }
            }),
            new StoryRule("summonTestman", "Summons Testman when the player whines for too long", 2, () => {
                if(testManSummoned == false) {
                    console.log("Summoned testman on node 6");
                    let newParagraph01 = {
                        narration: true,
                        speaker: null,
                        text: "Your whining has created a rupture in the space-time continuum, summoning Testman from another script through the sheer power of code."
                    };
                    dialogueTree.nodes[6].paragraphs.push(newParagraph01);
                    let newParagraph02 = {
                        narration: false,
                        speaker: "Testman",
                        text: "What is that I smell? A freshly written anonymous function, called from line 57 of the infamous 'storymanager.js' script? Tell me, mortal, why have you summoned me?"
                    };
                    dialogueTree.nodes[6].paragraphs.push(newParagraph02);
                    let newResponse = {
                        text: "I uhhh...",
                        nextNode: null
                    };
                    dialogueTree.nodes[6].responses.push(newResponse);
                    testManSummoned = true;
                }
            }),
            new StoryRule("startEncounter", "Starts the encounter in the escape pod(?)", 12, () => {
                initializeEncounter();                
            })
        ]
    }
];
