var playerPartyURL = '/code/json/parties/testparty_player.json';
var playerParty = null;
var enemyPartyURL = '/code/json/parties/testparty_enemy.json';
var enemyParty = null;

function loadPlayerParty(fileURL) {
    fetch(fileURL).then(response => response.json()).then(json => {playerParty = json});
}

function loadEnemyParty(fileURL) {
    fetch(fileURL).then(response => response.json()).then(json => {enemyParty = json});
}

document.onload = loadPlayerParty(playerPartyURL);
document.onload = loadEnemyParty(enemyPartyURL);

let leftSide = document.getElementById("arena_leftside");
let rightSide = document.getElementById("arena_rightside");

let calc = new CombatCalculator();
let ui = new EncounterUIManager();

let turnOrder = [];
let currentTurnIndex = 0;
let currentAttacker = null;
let currentTarget = null;
let punchSound01 = new Audio("../../assets/sfx/combat/sfx_punch_01.wav"); 

function displayTurnOrder() {
    console.log("Turn order: ");
    for(let i = 0; i < turnOrder.length; i++)
    {
        let n = i + 1;
        console.log(n + ": " + turnOrder[i].name);
    }
}

function assignTurnOrder() {
    turnOrder.length = 0;
    for(let i = 0; i < playerParty.members.length; i++)
    {
        turnOrder.push(playerParty.members[i]);  
    }
    for(let i = 0; i < enemyParty.members.length; i++)
    {
        turnOrder.push(enemyParty.members[i]);
    }
    currentTurnIndex = 0;
    currentAttacker = turnOrder[currentTurnIndex];
    displayTurnOrder();
    console.log(turnOrder[currentTurnIndex].name + "'s turn!");
}

function controlEnemyNPC() {
    let selectionIndex = Math.floor(Math.random() * playerParty.members.length);
    currentTarget = playerParty.members[selectionIndex];
    console.log(currentAttacker.name + "'s target: " + currentTarget.name);
    calc.attackTarget(currentAttacker, currentTarget);
    punchSound01.play();
    endTurn();
}

function endTurn() {
    checkDeadTargets();
    currentTarget = null;
    currentTurnIndex++;
    currentAttacker = turnOrder[currentTurnIndex];
    if(currentTurnIndex >= turnOrder.length)
    {
        currentTurnIndex = 0;
        currentAttacker = turnOrder[currentTurnIndex];
        console.log("Looped back around!");
    }
    console.log(turnOrder[currentTurnIndex].name + "'s turn!");
    if(currentAttacker.isNPC == true)
    {
        controlEnemyNPC();
    }
}

function checkDeadTargets() {
    for(let i = 0; i < playerParty.members.length; i++)
    {
        if(playerParty.members[i].isDead == true)
        {
            console.log(playerParty.members[i].name + " is dead! Removing..."); 
            ui.setDeadDisplay(playerParty.members[i]);
        }
    }
    for(let i = 0; i < enemyParty.members.length; i++)
    {
        if(enemyParty.members[i].isDead == true)
        {
            console.log(enemyParty.members[i].name + " is dead! Removing..."); 
            ui.setDeadDisplay(enemyParty.members[i]);
        }
    }
    displayTurnOrder();

}

function loadEncounter() {
    ui.createPartyDisplays();
    assignTurnOrder();
}



const attackButton = document.getElementById("button_attack");
attackButton.addEventListener("click", function() {
    calc.attackTarget(currentAttacker, currentTarget)
    punchSound01.play();
    endTurn();
})

const resetEncounterButton = document.getElementById("button_reset");
resetEncounterButton.addEventListener("click", function() {
    ui.clearAllCharacterDisplays();
    loadEncounter();
})