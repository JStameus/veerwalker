var playerName = "Big Jobo";

var actorJiub = {
    actorName: 'Jiub',
    //portrait reference here
}

var dialogueChoice01 = {
    text: "I'm not sure. Everything is a bit foggy.",
    nextNode: dialogueNode02,
}

var dialogueChoice02 = {
    text: "Me? I am Lord Nerevar, of course! Don't you recognize me?",
}

var dialogueChoice03 = {
    text: "I'm not telling you my name. I'm not sure I can trust you.",
}

var dialogueChoice04 = {
    text: "My name is " + playerName + ". And you are...?",
}

<<<<<<< HEAD
let dialogueChoice05 = {
    text: "O shit o fuk",
}

let dialogueChoice06 = {
    text: "Come on then bruv lez go",
}
=======
>>>>>>> 0b35f9439be8e01a71fe88472b8859e838f9abf5

function refreshDialogueNode(dialogueNode) {
    document.getElementById("dialogue_text_main").innerHTML = dialogueNode.text;
    document.getElementById("dialogue_eventlabel").innerHTML = dialogueNode.location;
    document.getElementById("choice_button_01").innerHTML = dialogueNode.choices[0].text;
    document.getElementById("choice_button_02").innerHTML = dialogueNode.choices[1].text;
    document.getElementById("choice_button_03").innerHTML = dialogueNode.choices[2].text;
    document.getElementById("choice_button_04").innerHTML = dialogueNode.choices[3].text;
}

function refreshDialogueChoice(dialogueChoice, newText, newNextNode) {
    dialogueChoice.text = newText;
    dialogueChoice.newText = newNextNode;
}

var dialogueNode01 = {
    responseTo: null,
    location: "Prison Boat",
    actor: actorJiub,
    text: "Stand up. There you go. You were dreaming. What's your name?",
    choices: [dialogueChoice01, dialogueChoice02, dialogueChoice03, dialogueChoice04]
}

var dialogueNode02 = {
    responseTo: dialogueChoice02,
    location: "Prison Boat",
    actor: actorJiub,
    text: "Well, not even last night's storm could wake you. I heard them say we've reached Morrowind, I'm sure they'll let us go...Quiet, here comes the guard.",
    choices: [dialogueChoice05, dialogueChoice06, dialogueChoice01, dialogueChoice02],
}


document.onload = refreshDialogueNode(dialogueNode01);