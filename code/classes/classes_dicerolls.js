class Diceroller {
    rollD4() {
        return Math.floor(Math.random() * (4 - 1 + 1) ) + 1;
    }
    rollD6() {
        return Math.floor(Math.random() * (6 - 1 + 1) ) + 1;
    }
    rollD20() {
        return Math.floor(Math.random() * (20 - 1 + 1) ) + 1;
    }
    rollCustomDice(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + 1);
    }
}