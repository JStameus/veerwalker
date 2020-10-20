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

}