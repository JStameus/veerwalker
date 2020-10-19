class DiceRoller {
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