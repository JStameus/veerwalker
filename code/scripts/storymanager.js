//STORY MANAGER REQUIRES dialoguemanager.js TO RUN! 

//checks a condition which evaluates to true or false
function StoryFact(name, condition, description) {
    this.name = name;
    this.condition = condition;
    this.description = description;
}

//checks a fact, and performs an anonymous function when player enters the triggerNode
function StoryRule(name, fact, operation, triggerNode, description) {
    this.name = name;
    this.fact = fact;
    this.operation = operation;
    this.triggerNode = triggerNode;
    this.description = description;
}

//searches for the specified fact in an array and returns it
function searchFactByName(storyObject, factName) {
    factList = storyObject.facts;
    if(factList != null)
    {
        for(let i = 0; i < factList.length; i++) 
        {
            if(factList[i].name === factName) {
                return factList[i];
            }
            else {
                console.warn(`searchFactByName failed: cannot find '${factName}'`);
                return null;
            }
        }
    }
}

//searches for the specified rule in an array and returns it
function searchRuleByName(storyObject, ruleName) {
    ruleList = storyObject.rules;
    if(ruleList != null)
    {
        for(let i = 0; i < ruleList.length; i++)
        {
            if(ruleList[i].name == ruleName) {
                return ruleList[i];
            } 
            else {
                console.warn(`searchRuleByName failed: cannot find '${ruleName}'`);
                return null;
            }
        }
    }
}

//calls the function of the specified story rule
function executeStoryRule(storyObject, rule) {
    if(storyObject != null) {
        if(rule != null) {
            rule.operation();
            console.log("Executed operation successfully!");
        }
        else {
            console.error(`Cannot execute '${rule.name}': Rule not found in ${storyObject}!`);
        }
    }
    else {
        console.error(`Cannot execute '${rule.name}': ${storyObject} not found!`);
    }
}

var storyObjectGlobal = {
    sceneName: "All Scenes",
}

var storyObjectEscapePod = {
    sceneName: "dialogue_demo_escapepod",
    facts: [
        new StoryFact("storageRoomPumpIsOn", true, "Is the storage room pump-barrel turned on?"),
        new StoryFact("hasPowerCoupling", false, "Does the player have the power coupling from the supply locker?")
    ],
    rules: [
        rule01 = new StoryRule("switchStorageRoomPower", searchFactByName(storyObjectEscapePod, "storageRoomPumpIsOn"), () => {
            if(fact.condition == true) {
                console.log("Switching storage room lights on.");
            }
            else {
                console.log("Switching storage room lights off.");
            }
        }, 9, "Switches the lights in the storage room on and off."),
        rule02 = new StoryRule("unlockCockpitSystems", searchFactByName("hasPowerCoupling"), () => {
            console.log("EEEEEEEEEEEEEEEEEEE");
            console.log(this.fact.description);
        }, 14, "Grants access to cockpit controls when power is restored."),
    ]
}


//------------------------------------------------------------------------------------------------
//when should the story facts be read? Every time a new dialogue node loads? Yeah probably

//when player enters node 9
//trigger the fact and then execute the story rule
//make sure there's no hitching when changing stuff around!

//when the document loads
//load story manager
//create a list of triggerNodes 
//go through the entire tree and add triggerNode property (number/null) to all dialogue nodes
//[TO DO] also create a function to remove the triggerNode property when saving the tree
