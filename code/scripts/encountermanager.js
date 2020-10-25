// var playerPartyURL = '/code/json/parties/testparty_player.json';
// var playerParty = null;
// var enemyPartyURL = '/code/json/parties/testparty_enemy.json';
// var enemyParty = null;

// function loadPlayerParty(fileURL) {
//     fetch(fileURL).then(response => response.json()).then(json => {playerParty = json});
// }

// function loadEnemyParty(fileURL) {
//     fetch(fileURL).then(response => response.json()).then(json => {enemyParty = json});
// }

// document.onload = loadPlayerParty(playerPartyURL);
// document.onload = loadEnemyParty(enemyPartyURL);

// let leftSide = document.getElementById("arena_leftside");
// let rightSide = document.getElementById("arena_rightside");

// let calc = new CombatCalculator();
// let ui = new EncounterUIManager();
// let ai = new AIManager();

// let turnOrder = [];
// let currentTurnIndex = 0;
// let currentAttacker = null;
// let currentTarget = null;

// function displayTurnOrder() {
//     console.log("Turn order: ");
//     for(let i = 0; i < turnOrder.length; i++)
//     {
//         let n = i + 1;
//         console.log(n + ": " + turnOrder[i].name);
//     }
// }

// function selectTarget(target) {
//     ui.setTargetedDisplay(target);
// }

// function assignTurnOrder() {
//     turnOrder.length = 0;
//     for(let i = 0; i < playerParty.members.length; i++)
//     {
//         turnOrder.push(playerParty.members[i]);  
//     }
//     for(let i = 0; i < enemyParty.members.length; i++)
//     {
//         turnOrder.push(enemyParty.members[i]);
//     }
//     currentTurnIndex = 0;
//     currentAttacker = turnOrder[currentTurnIndex];
//     displayTurnOrder();
//     console.log(turnOrder[currentTurnIndex].name + "'s turn!");
// }

// function controlEnemyNPC() {
//     let targetlist = ai.getTargetList(playerParty);
//     let selectionIndex = Math.floor(Math.random() * targetlist.length);
//     currentTarget = targetlist[selectionIndex];
//     console.log(currentAttacker.name + "'s target: " + currentTarget.name);
//     calc.attackTarget(currentAttacker, currentTarget);
//     endTurn();
// }

// function endTurn() {
//     ui.setRegularDisplay(currentAttacker);
//     cleanupTurnOrder();

//     //clears the target and goes to the next character's turn
//     currentTarget = null;
//     currentTurnIndex++;
//     currentAttacker = turnOrder[currentTurnIndex];

//     //goes back to the start of the turn order
//     if(currentTurnIndex >= turnOrder.length)
//     {
//         currentTurnIndex = 0;
//         currentAttacker = turnOrder[currentTurnIndex];
//         console.log("Looped back around!");
//     }

//     console.log(turnOrder[currentTurnIndex].name + "'s turn!");

//     //if the current character is an NPC, do AI stuff
//     if(currentAttacker.isNPC == true)
//     {
//         controlEnemyNPC();
//     }
//     ui.setActiveDisplay(currentAttacker);
// }

// //checks for dead characters in the turn order and removes them from play
// function cleanupTurnOrder() {
//     for(let i = 0; i < turnOrder.length; i++)
//     {
//         if(turnOrder[i].isDead == true)
//         {
//             console.log(turnOrder[i].name + " is dead! Removing..."); 
//             ui.setDeadDisplay(turnOrder[i]);
//             turnOrder.splice(i, 1);
//             displayTurnOrder();
//         }
//     }
// }

// function loadEncounter() {
//     ui.createPartyDisplays();
//     assignTurnOrder();
//     ui.setActiveDisplay(currentAttacker);
// }


// //buttons 
// const attackButton = document.getElementById("button_attack");
// attackButton.addEventListener("click", function() {
//     calc.attackTarget(currentAttacker, currentTarget)
//     endTurn();
// })

// const resetEncounterButton = document.getElementById("button_reset");
// resetEncounterButton.addEventListener("click", function() {
//     ui.clearAllCharacterDisplays();
//     loadEncounter();
// })

//sets variables for encounter file, enemy and player parties and loads them
let encounterURL = "../json/encounters/encounter_test.json";
var encounterData = null;
function loadEncounterData() {
    fetch(encounterURL).then(response => response.json()).then(json => {encounterData = json});
}

var enemyPartyData = null;
function loadEnemyPartyData() {
    fetch(encounterData.enemyParty).then(response => response.json()).then(json => {enemyPartyData = json});
}

var playerPartyData = null;
function loadPlayerPartyData() {
    fetch("../json/parties/testparty_player.json").then(response => response.json()).then(json => {playerPartyData = json});
}

function loadAllData() {
    loadEncounterData();
    console.log("Loading Party Data...");
    setTimeout(() => {
        loadEnemyPartyData();
        loadPlayerPartyData();
    }, 100);
}

//gets references to all classes used in encounters
let dice = new Diceroller();
let combatCalc = new CombatCalculator();
let uiManager = new EncounterUIManager();
let targetManager = new TargetManager();

//arrays for keeping track of characters in the scene
let playerTeam = [];
let enemyTeam = [];
let turnOrder = [];

//whose turn is it, and who is being targeted
let turnIndex = 0;
let activeCharacter = null;
let currentTarget = null;

//visual elements representing the "board"
let leftSide = document.getElementById("arena_leftside");
let rightSide = document.getElementById("arena_rightside");

//creates character avatars based on party data
function createCharacterAvatars() {
    for(let i = 0; i < playerPartyData.members.length; i++)
    {
        let data = playerPartyData.members[i];
        let newChar = new CharacterAvatar(data.name, data.HP, data.AP, data.ATK, data.DEF, data.DMG, false);
        console.log("Created Avatar for: " + data.name);
        playerTeam.push(newChar);
    }
    for(let i = 0; i < enemyPartyData.members.length; i++)
    {
        let data = enemyPartyData.members[i];
        let newEnemy = new CharacterAvatar(data.name, data.HP, data.AP, data.ATK, data.DEF, data.DMG, false);
        console.log("Created Avatar for: " + data.name);
        enemyTeam.push(newEnemy);
    }
}

//rolls initiative and populates the turnOrder array
function assignTurnOrder() {
    //make sure to implement initiative rolls later!
    for(let i = 0; i < playerTeam.length; i++)
    {
        turnOrder.push(playerTeam[i]);
    }
    for(let i = 0; i < enemyTeam.length; i++)
    {
        turnOrder.push(enemyTeam[i]);
    }
    console.log("Turn Order:");
    for(let i = 0; i < turnOrder.length; i++)
    {
        console.log((i + 1) + ": " + turnOrder[i].name);
    }
}

function cleanupDeadTargets() {
    for(let i = 0; i < turnOrder.length; i++)
    {
        if(turnOrder[i].isDead == true)
        turnOrder.splice(i, 1);
    }
}

//refreshes everything, checks game status and sets next active character
//called every time someone attacks(finishes their turn)
function nextTurn() {
    turnIndex++;
    if(turnIndex > turnOrder.length)
    {
        turnIndex = 0;
        console.log("Looped back around!");
    }
    cleanupDeadTargets();
    targetManager.clearTarget();
    activeCharacter = turnOrder[turnIndex];
    uiManager.refreshDisplays();
    console.log(turnOrder[turnIndex].name + "'s turn!");

}

//calls all functions needed to setup an encounter
function initializeEncounter() {
    loadAllData();
    console.log("Creating Avatars...");
    setTimeout(() => {
        createCharacterAvatars();
    }, 200);
    console.log("Creating character displays...");
    setTimeout(() => {
        uiManager.createPartyDisplays();
        console.log("Assigning turn order...");
        assignTurnOrder();
    }, 300);
    setTimeout(() => {
        console.log("Starting Encounter!");
        console.log(turnOrder[turnIndex].name + "'s turn!");
        activeCharacter = turnOrder[turnIndex];
        uiManager.setActiveDisplay(activeCharacter);
    }, 400);
}

const attackButton = document.getElementById('button_attack');
attackButton.addEventListener("click", function() {
    combatCalc.attackTarget(activeCharacter, currentTarget);
})

const resetButton = document.getElementById('button_reset');
resetButton.addEventListener("click", function() {
    enemyTeam = [];
    playerTeam = [];
    turnOrder = [];
    uiManager.clearAllCharacterDisplays();
    initializeEncounter();
})