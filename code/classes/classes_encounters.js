class EncounterUIManager {
    updateHPDisplay(character) {
        let element = document.getElementById("display_ap_" + character.name);
        element.innerHTML = "HP: " + character.HP;
    }
    
    createCharacterDisplay(character, position) {
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

        let newLine2 = document.createElement('hr');
        let newTargetSelectButton = document.createElement('button');
        let newTargetSelectButtonText = document.createTextNode('Select This Target');
        newTargetSelectButton.appendChild(newTargetSelectButtonText);
        newTargetSelectButton.addEventListener("click", function() {
            currentTarget = character;
            console.log("Target: " + character.name);
        })

        let newDiv = document.createElement('div');
        newDiv.appendChild(newName);
        newDiv.appendChild(newLine);
        newDiv.appendChild(newHealthDisplay);
        newDiv.appendChild(newActionPointDisplay);
        newDiv.appendChild(newAttackDisplay);
        newDiv.appendChild(newDefenseDisplay);
        newDiv.appendChild(newDamageDisplay);
        newDiv.appendChild(newLine2);
        newDiv.appendChild(newTargetSelectButton);
        newDiv.className = "characteravatar_display";
        newDiv.id = ("characteravatar_" + character.name);

        let arenaField = position;
        arenaField.appendChild(newDiv);
    }

    createPartyDisplays() {
        for(let i = 0; i < playerParty.members.length; i++)
        {
            this.createCharacterDisplay(playerParty.members[i], leftSide);
        }
        for(let i = 0; i < enemyParty.members.length; i++)
        {
            this.createCharacterDisplay(enemyParty.members[i], rightSide);
        }
    }

    clearAllCharacterDisplays() {
        document.querySelectorAll('.characteravatar_display').forEach(function(a){a.remove()});
    }

    setRegularDisplay(character) {
        let characterDiv = document.querySelector("#characteravatar_" + character.name);
        characterDiv.className = "characteravatar_display";
    }

    setActiveDisplay(character) {
        let characterDiv = document.querySelector("#characteravatar_" + character.name);
        characterDiv.className = "characteravatar_display active";
    }

    setTargetedDisplay(character) {
        let characterDiv = document.querySelector("#characteravatar_" + character.name);
        characterDiv.className = "characteravatar_display targeted";
    }

    setDeadDisplay(character) {
        let characterDiv = document.querySelector("#characteravatar_" + character.name);
        characterDiv.className = "characteravatar_display dead";
    }


}

class CombatCalculator {
    constructor(dice) {
        this.dice = new Diceroller();
    }

    rollInitiative(character) {
        let rollResult = this.dice.rollD20();
        console.log(character.name + " rolled " + rollResult + " initiative!");
    }

    attackTarget(attacker, target) {
        let attackRoll = this.rollAttack(attacker, target);
        if(attackRoll == true) 
        {
            let damageRoll = this.rollDamage(attacker);
            this.dealDamage(target, damageRoll);
        }
    }

    rollAttack(attacker, target) {
        console.log("Rolling attack...");
        let attackRoll = this.dice.rollD20();
        let attackModifier = attacker.ATK;
        let attackTotal = attackRoll + attackModifier;
        console.log(`${attacker.name}'s Attack Roll: ${attackTotal}`);
        if(attackTotal >= target.DEF)
        {
            console.log("Hit!");
            return true;
        }
        else 
        {
            console.log("Miss!");
            return false;    
        }
    }

    rollDamage(attacker) {
        let damageRoll = this.dice.rollD6();
        let damageModifier = attacker.DMG;
        let damageTotal = damageRoll + damageModifier;
        return damageTotal;
    }

    dealDamage(target, damage) {
        target.HP -= damage;
        console.log(`${target.name} takes ${damage} damage!`);
        let healthDisplay = document.getElementById("display_hp_" + target.name);
        healthDisplay.innerHTML = "HP: " + target.HP;
        if(target.HP <= 0)
        {
            target.isDead = true;
        }
    }

    rollInitiative(turnOrder) {
        for(let i = 0; i < playerParty.members.length; i++)
        {
            
        }
    }
}

class TargetManager {
    constructor() {
        this.ui = new EncounterUIManager;
    }

    selectTarget(characterAvatar) {

    }
}
