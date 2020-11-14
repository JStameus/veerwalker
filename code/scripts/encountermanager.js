//sets variables for encounter file, enemy and player parties and loads them

//the encounter prefab containing an enemy party, background, music etc
let encounterURL = "../json/encounters/encounter_test.json";
var encounterData = null;
function loadEncounterData() {
    fetch(encounterURL).then(response => response.json()).then(json => {encounterData = json});
}

//a set of enemies to be loaded into the encounter
var enemyPartyData = null;
function loadEnemyPartyData() {
    fetch(encounterData.enemyParty).then(response => response.json()).then(json => {enemyPartyData = json});
}

//the player's party and characters
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
let aiManager = new AIManager();

//arrays for keeping track of characters in the scene
let playerTeam = [];
let enemyTeam = [];
let turnOrder = [];

//whose turn is it, and who is being targeted
let turnIndex = 0;
let activeCharacter = null;
let currentTarget = null;
let clickTargetingEnabled = false;

//visual elements representing the "board"
let gameBoard = document.getElementById("encounter_board");
let leftSide = document.getElementById("board_leftside");
let rightSide = document.getElementById("board_rightside");

//creates character avatars based on party data
function createCharacterAvatars() {
    for(let i = 0; i < playerPartyData.members.length; i++)
    {
        let data = playerPartyData.members[i];
        let newChar = new CharacterAvatar(data.name, data.HP, data.AP, data.ATK, data.DEF, data.DMG, false, null);
        playerTeam.push(newChar);
    }
    for(let i = 0; i < enemyPartyData.members.length; i++)
    {
        let data = enemyPartyData.members[i];
        let newEnemy = new CharacterAvatar(data.name, data.HP, data.AP, data.ATK, data.DEF, data.DMG, false);
        newEnemy.isNPC = true;
        enemyTeam.push(newEnemy);
    }
}

function removeCharacterAvatars() {
    leftSide.querySelectorAll('.characteravatar_display').forEach(function(a){a.remove()})
    rightSide.querySelectorAll('.characteravatar_display').forEach(function(a){a.remove()})
}


//creates event listeners for enemy divs so they can be selected by clicking 
function createTargetSelectors() {
    let enemyTeamField = document.getElementById('board_rightside');
    let enemyDivs = enemyTeamField.getElementsByTagName('div');
    for(let i = 0; i < enemyDivs.length; i++)
    {
        enemyDivs[i].addEventListener("click", function() {
            if(clickTargetingEnabled)
            {
                targetManager.selectTarget(enemyTeam[i]);
            }
        })
    }
}

//rolls initiative and populates the turnOrder array
function assignTurnOrder() {
    //[TO DO]make sure to implement initiative rolls later!
    for(let i = 0; i < playerTeam.length; i++)
    {
        turnOrder.push(playerTeam[i]);
    }
    for(let i = 0; i < enemyTeam.length; i++)
    {
        turnOrder.push(enemyTeam[i]);
    }
    console.log('%cCharacters & Turn Order is set up!', 'color: green; font-weight: bold;');
    console.table(turnOrder);
}

//removes dead characters from turn order
function cleanupDeadTargets() {
    for(let i = 0; i < turnOrder.length; i++)
    {
        if(turnOrder[i].isDead == true)
        turnOrder.splice(i, 1);
    }
}

//checks if either team has won, and returns a boolean value
function checkGameOver() {
    //[TO DO]clean this up, implementation is wonky right now
    let alivePlayerCharacters = [];
    for(let i = 0; i < playerTeam.length; i++)
    {
        if(playerTeam[i].isDead == false)
        {
            alivePlayerCharacters.push(playerTeam[i]);
        }
    }
    if(alivePlayerCharacters.length <= 0)
    {
        return true;
    }
    let aliveEnemyCharacters = [];
    for(let i = 0; i < enemyTeam.length; i++)
    {
        if(enemyTeam[i].isDead == false)
        {
            aliveEnemyCharacters.push(enemyTeam[i]);
        }
    }
    if(aliveEnemyCharacters.length <= 0)
    {
        return true;
    }
    return false;
}

//refreshes everything, checks game status and sets next active character
//called every time someone finishes their turn(after spending their action/making their move)
function nextTurn() {
    if(checkGameOver() == false)
    {
        cleanupDeadTargets();
        turnIndex++;
        if(turnIndex > (turnOrder.length -1))
        {
            turnIndex = 0;
            console.log("Looped back around!");
        }
        targetManager.clearTarget();
        activeCharacter = turnOrder[turnIndex];
        uiManager.refreshDisplays();
        // console.log(turnOrder[turnIndex].name + "'s turn!");
        if(activeCharacter.isNPC == true)
        {
            controlNPCTurn();
            disableTargetSelection();
        }
        else if(activeCharacter.isNPC == false)
        {
            enableTargetSelection();
        }
    }
    else if(checkGameOver() == true)
    {
        endEncounter();
    }
}

//goes through an enemy's actions when it's their turn
function controlNPCTurn() {
    targets = aiManager.getTargetList(playerTeam);
    setTimeout(() => {
        targetManager.selectRandomTarget(targets);
    }, 1000);
    setTimeout(() => {
        combatCalc.attackTarget(activeCharacter, currentTarget);
    }, 2500);
    setTimeout(() => {
        nextTurn();
    }, 3000);
}

//[TO DO] should this be somewhere else?
//makes the div elements on the enemy team clickable for target selection
function enableTargetSelection() {
    clickTargetingEnabled = true;
}

function disableTargetSelection() {
    clickTargetingEnabled = false;
}

//resets turn order and sets active character and target to null
function cancelTurnOrder() {
    turnIndex = 0;
    activeCharacter = null;
    currentTarget = null;
    console.log("Canceling turn order...");
}

//calls all functions needed to setup an encounter
function initializeEncounter() {
    dialogueWindow.style.display = "none";
    gameBoard.style.display = "flex";
    loadAllData();
    console.log("Creating Avatars...");
    setTimeout(() => {
        createCharacterAvatars();
        clearResponseButtons();
    }, 200);
    console.log("Creating character displays...");
    setTimeout(() => {
        uiManager.createPartyDisplays();
        console.log("Assigning turn order...");
        assignTurnOrder();
    }, 300);
    setTimeout(() => {
        uiManager.displayEncounterActionButtons();
        createTargetSelectors();
        console.log("Starting Encounter...");
        console.log(turnOrder[turnIndex].name + "'s turn!");
        activeCharacter = turnOrder[turnIndex];
        uiManager.setActiveDisplay(activeCharacter);
        if(activeCharacter.isNPC == false)
        {
            enableTargetSelection();
        }
    }, 400);
}

//cancels everything and displays a game over message
function endEncounter() {
    console.log("Game Over");
    clearResponseButtons();
    cancelTurnOrder();
    removeCharacterAvatars();
    gameBoard.style.display = "none";
    dialogueWindow.style.display = "block";
    loadDialogueNode(encounterData.exitNode);
    playerTeam = [];
    enemyTeam = [];
    encounterData = null;
    enemyPartyData = null;
    playerPartyData = null;
}

//BUTTONS FOR INTERACTIVITY AND TESTING
// const attackButton = document.getElementById('button_attack');
// attackButton.addEventListener("click", function() {
//     combatCalc.attackTarget(activeCharacter, currentTarget);
//     //[TO DO] check if current character has actions remaining, when that is implemented
//     nextTurn();
// });

// const skipButton = document.getElementById('button_skip');
// skipButton.addEventListener("click", function() {
//     nextTurn();
// })

// const resetButton = document.getElementById('button_reset');
// resetButton.addEventListener("click", function() {
//     enemyTeam = [];
//     playerTeam = [];
//     turnOrder = [];
//     uiManager.clearAllCharacterDisplays();
//     initializeEncounter();
// });