class AIManager {
    getTargetList(targetTeam) {
        let targetList = [];
        for(let i = 0; i < targetTeam.length; i++)
        {
            if(targetTeam[i].isDead == false)
            {
                targetList.push(targetTeam[i]);
            }
        }
        return targetList;
    }
}