function Character(name, HP, AP, ATK, DEF, DMG) {
    this.characterName = name;
    this.maxHP = HP;
    this.maxAP = AP;
    this.attack = ATK;
    this.defense = DEF;
    this.damage = DMG;
}

let playerCharacter = new Character("Player", 25, 10, 3, 14, 2);
let enemyCharacter = new Character("Enemy", 20, 10, 2, 12, 1);

let leftSide = document.getElementById("arena_leftside");
let rightSide = document.getElementById("arena_rightside");

function createCharacterAvatar(character, position) {
    let newName = document.createElement('h3');
    let newNameText = document.createTextNode(character.characterName);
    newName.appendChild(newNameText);
    let newLine = document.createElement('hr');

    let newHealthDisplay = document.createElement('p');
    let newHealthDisplayText = document.createTextNode("HP: " + character.maxHP);
    newHealthDisplay.appendChild(newHealthDisplayText);

    let newActionPointDisplay = document.createElement('p');
    let newActionPointDisplayText = document.createTextNode("AP: " + character.maxAP);
    newActionPointDisplay.appendChild(newActionPointDisplayText);

    let newAttackDisplay = document.createElement('p');
    let newAttackDisplayText = document.createTextNode("ATK: " + character.attack);
    newAttackDisplay.appendChild(newAttackDisplayText);

    let newDefenseDisplay = document.createElement('p');
    let newDefenseDisplayText = document.createTextNode("DEF: " + character.defense);
    newDefenseDisplay.appendChild(newDefenseDisplayText);

    let newDamageDisplay = document.createElement('p');
    let newDamageDisplayText = document.createTextNode("DMG: " + character.damage);
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
    //create avatars for all characters
    //roll for initiative(just take a d20 for now)
    //assign turn to winner of initiative roll(what is a turn?)
    createCharacterAvatar(playerCharacter, leftSide);
    createCharacterAvatar(enemyCharacter, rightSide);
}

