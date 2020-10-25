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
    console.log("---ENCOUNTER LOADED---");
}

var enemyPartyData = null;
function loadEnemyPartyData() {
    fetch(encounterData.enemyParty).then(response => response.json()).then(json => {enemyPartyData = json});
    console.log("---ENEMY PARTY LOADED---");
}

var playerPartyData = null;
function loadPlayerPartyData() {
    fetch("../json/parties/testparty_player.json").then(response => response.json()).then(json => {playerPartyData = json});
    console.log("---PLAYER PARTY LOADED---");
}

function createCharacterAvatars() {
    for(let i = 0; i < playerPartyData.members.length; i++)
    {
        let char = playerPartyData.members[i];
        playerTeam[i] = new CharacterAvatar(char.name, char.HP, char.AP, char.ATK, char.DEF, char.DMG, false);
        console.log("Create avatar for: " + char.name);
    }
}

let fileManager = new FileManager();
let dice = new Diceroller();
let calc = new CombatCalculator();

let player01 = null;
let player02 = null;
let player03 = null;
let player04 = null;

let enemy01 = null;
let enemy02 = null;
let enemy03 = null;
let enemy04 = null;

let playerTeam = [player01, player02, player03, player04];
let enemyTeam = [enemy01, enemy02, enemy03, enemy04];
let turnOrder = [];

function assignTurnOrder() {
    console.log("Assigning turn order...");
}