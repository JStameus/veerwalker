class Dice {
    rollD4() {
        return Math.floor(Math.random() * (4 - 1 + 1) ) + 1;
    }
    rollD6() {
        return Math.floor(Math.random() * (6 - 1 + 1) ) + 1;
    }
    rollD20() {
        return Math.floor(Math.random() * (20 - 1 + 1) ) + 1;
    }
}

class CombatCalculator {
    constructor() {
        this.dice = new Dice();
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
        console.log(`${attacker.name} deals ${damageTotal} damage.`);
        return damageTotal;
    }

    dealDamage(target, damage) {
        target.HP -= damage;
        console.log(target.name);
    }
}

