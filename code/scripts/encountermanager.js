var playerPartyURL = '/code/json/parties/testparty_player.json';
var playerParty = null;
var enemyPartyURL = '/code/json/parties/testparty_enemy.json';
var enemyParty = null;

let leftSide = document.getElementById("arena_leftside");
let rightSide = document.getElementById("arena_rightside");

let calc = new CombatCalculator();
let ui = new EncounterUIManager();

let currentAttacker = null;
let currentTarget = null;

function loadPlayerParty(fileURL) {
    fetch(fileURL).then(response => response.json()).then(json => {playerParty = json});
}

function loadEnemyParty(fileURL) {
    fetch(fileURL).then(response => response.json()).then(json => {enemyParty = json});
}

document.onload = loadPlayerParty(playerPartyURL);
document.onload = loadEnemyParty(enemyPartyURL);

function loadEncounter() {
    ui.createPartyDisplays();
}

const attackButton = document.getElementById("button_attack");
attackButton.addEventListener("click", function() {
    calc.attackTarget(currentAttacker, currentTarget)
})

const resetEncounterButton = document.getElementById("button_reset");
resetEncounterButton.addEventListener("click", function() {
    ui.clearAllCharacterDisplays();
    loadEncounter();
})