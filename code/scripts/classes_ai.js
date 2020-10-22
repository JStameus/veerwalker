class AIManager {
    getTargetList(party) {
        let targetList = [];
        for(let i = 0; i < party.members.length; i++)
        {
            if(party.members[i].isDead == false)
            {
                targetList.push(party.members[i]);
                console.log("Added " + party.members.name + " to target list.");
            }
        }
        return targetList;
    }
}