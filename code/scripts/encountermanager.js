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

let calc = new CombatCalculator();

let playerCharacter = new CharacterAvatar("Jeff", 25, 10, 3, 15, 2);
let enemyCharacter = new CharacterAvatar("Shrek", 30, 10, 2, 14, 2);

let leftSide = document.getElementById("arena_leftside");
let rightSide = document.getElementById("arena_rightside");

//functions for displaying and updating character stats
function createCharacterDisplay(character, position) {
    let newName = document.createElement('h3');
    let newNameText = document.createTextNode(character.name);
    newName.appendChild(newNameText);
    let newLine = document.createElement('hr');

    let newHealthDisplay = document.createElement('p');
    let newHealthDisplayText = document.createTextNode("HP: " + character.HP);
    newHealthDisplay.id = "display_hp_" + character.name;
    newHealthDisplay.appendChild(newHealthDisplayText);

    let newActionPointDisplay = document.createElement('p');
    let newActionPointDisplayText = document.createTextNode("AP: " + character.AP);
    newActionPointDisplay.id = "display_ap_" + character.name;
    newActionPointDisplay.appendChild(newActionPointDisplayText);

    let newAttackDisplay = document.createElement('p');
    let newAttackDisplayText = document.createTextNode("ATK: " + character.ATK);
    newAttackDisplay.id = "display_atk_" + character.name;
    newAttackDisplay.appendChild(newAttackDisplayText);

    let newDefenseDisplay = document.createElement('p');
    let newDefenseDisplayText = document.createTextNode("DEF: " + character.DEF);
    newDefenseDisplay.id = "display_def_" + character.name;
    newDefenseDisplay.appendChild(newDefenseDisplayText);

    let newDamageDisplay = document.createElement('p');
    let newDamageDisplayText = document.createTextNode("DMG: " + character.DMG);
    newDamageDisplay.id = "display_dmg_" + character.name;
    newDamageDisplay.appendChild(newDamageDisplayText);

    let newDiv = document.createElement('div');
    newDiv.appendChild(newName);
    newDiv.appendChild(newLine);
    newDiv.appendChild(newHealthDisplay);
    newDiv.appendChild(newActionPointDisplay);
    newDiv.appendChild(newAttackDisplay);
    newDiv.appendChild(newDefenseDisplay);
    newDiv.appendChild(newDamageDisplay);
    newDiv.className = "characteravatar_display";

    let arenaField = position;
    arenaField.appendChild(newDiv);
}

function loadEncounter() {
    createCharacterDisplay(playerCharacter, leftSide);
    createCharacterDisplay(enemyCharacter, rightSide);
}