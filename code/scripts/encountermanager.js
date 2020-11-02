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
let aiManager = new AIManager();

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
        console.log(turnOrder[turnIndex].name + "'s turn!");
        if(activeCharacter.isNPC == true)
        {
            controlNPCTurn();
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
        console.log("Starting Encounter...");
        console.log(turnOrder[turnIndex].name + "'s turn!");
        activeCharacter = turnOrder[turnIndex];
        uiManager.setActiveDisplay(activeCharacter);
    }, 400);
}

//resets turn order and sets active character and target to null
function cancelTurnOrder() {
    turnIndex = 0;
    activeCharacter = null;
    currentTarget = null;
    console.log("Canceling turn order...");
}

//cancels everything and displays a game over message
function endEncounter() {
    console.log("Game Over");
    cancelTurnOrder();
}

const attackButton = document.getElementById('button_attack');
attackButton.addEventListener("click", function() {
    combatCalc.attackTarget(activeCharacter, currentTarget);
});

const resetButton = document.getElementById('button_reset');
resetButton.addEventListener("click", function() {
    enemyTeam = [];
    playerTeam = [];
    turnOrder = [];
    uiManager.clearAllCharacterDisplays();
    initializeEncounter();
});