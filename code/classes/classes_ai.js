class AIManager {
    getTargetList(targetTeam) {
        let targetList = [];
        for(let i = 0; i < targetTeam.length; i++)
        {
            if(targetTeam[i].isDead == false)
            {
                targetList.push(targetTeam[i]);
                console.log("Added " + targetTeam[i].name + " to target list.");
            }
        }
        return targetList;
    }
}