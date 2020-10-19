//Character data should be stored somewhere else later!
function Character(name, HP, AP, ATK, DEF, DMG) {
    this.characterName = name;
    this.maxHP = HP;
    this.maxAP = AP;
    this.attack = ATK;
    this.defense = DEF;
    this.damage = DMG;
}

let playerCharacter = new Character("Big Jeff", 25, 10, 3, 14, 2);
let enemyCharacter = new Character("MONSTER", 20, 10, 2, 12, 1);

//---------------------------------------------------------------------
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

function CharacterAvatar(character) {
    maxHP = character.maxHP;
    maxAP = character.maxAP;
    attack = character.attack;
    defense = character.defense;
    damage = character.damage;

    currentHP = maxHP;
    currentAP = maxAP;
} 

//creating character avatars
function createCharacterAvatar() {
    
}

//functions for displaying and updating character stats
function createCharacterDisplay(character, position) {
    let newName = document.createElement('h3');
    let newNameText = document.createTextNode(character.characterName);
    newName.appendChild(newNameText);
    let newLine = document.createElement('hr');

    let newHealthDisplay = document.createElement('p');
    let newHealthDisplayText = document.createTextNode("HP: " + character.maxHP);
    newHealthDisplay.id = "display_hp_" + character.characterName;
    newHealthDisplay.appendChild(newHealthDisplayText);

    let newActionPointDisplay = document.createElement('p');
    let newActionPointDisplayText = document.createTextNode("AP: " + character.maxAP);
    newActionPointDisplay.id = "display_ap_" + character.characterName;
    newActionPointDisplay.appendChild(newActionPointDisplayText);

    let newAttackDisplay = document.createElement('p');
    let newAttackDisplayText = document.createTextNode("ATK: " + character.attack);
    newAttackDisplay.id = "display_atk_" + character.characterName;
    newAttackDisplay.appendChild(newAttackDisplayText);

    let newDefenseDisplay = document.createElement('p');
    let newDefenseDisplayText = document.createTextNode("DEF: " + character.defense);
    newDefenseDisplay.id = "display_def_" + character.characterName;
    newDefenseDisplay.appendChild(newDefenseDisplayText);

    let newDamageDisplay = document.createElement('p');
    let newDamageDisplayText = document.createTextNode("DMG: " + character.damage);
    newDamageDisplay.id = "display_dmg_" + character.characterName;
    newDamageDisplay.appendChild(newDamageDisplayText);

    let newDiv = document.createElement('div');
    newDiv.appendChild(newName);
    newDiv.appendChild(newLine);
    newDiv.appendChild(newHealthDisplay);
    newDiv.appendChild(newActionPointDisplay);
    newDiv.appendChild(newAttackDisplay);
    newDiv.appendChild(newDefenseDisplay);
    newDiv.appendChild(newDamageDisplay);
    newDiv.className = "characteravatar";

    let arenaField = position;
    arenaField.appendChild(newDiv);
}

function loadEncounter() {
    //in finished version, begin by loading an encounter "prefab" file!
    //roll for initiative(just take a d20 for now)
    //assign turn to winner of initiative roll(what is a turn?)
    createCharacterDisplay(playerCharacter, leftSide);
    createCharacterDisplay(enemyCharacter, rightSide);
}

function rollInitiative(character) {
    let rollResult = rollD20();
    console.log(character.characterName + " rolled " + rollResult);
}

function attackTarget(attacker, target) {
    let hitResult = rollAttack(attacker, target);
    if(hitResult == true) {
        let damage = rollDamage(1);
        console.log("Dealt " + damage + " damage.");
    }
}

function rollAttack(attacker, target) {
    console.log("Rolling attack...");
    let attackRoll = rollD20();
    let attackModifier = attacker.attack;
    let attackResult = attackRoll + attackModifier;
    console.log("Attack Roll: " + attackResult);
    if(attackResult >= target.defense) {
        console.log("Hit!");
        return true;
    }
    else {
        console.log("Miss!");
        return false;
    }
}

function rollDamage(attacker) {
    let damageRoll = rollD6();
    let damageModifier = attacker.damage;
    let damageTotal = damageRoll + damageModifier;
    return damageTotal;
}