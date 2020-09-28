// let dialogueText = "Jiub: Stand up. There you go. You were dreaming...What's your name?"

// function refreshDialogueWindow() {
//     document.getElementById("dialogue_text_main").innerHTML = dialogueText;
//     document.getElementById("dialogue_choice_text_01").innerHTML = dialogueChoice01;
//     document.getElementById("dialogue_choice_text_02").innerHTML = dialogueChoice02;
//     document.getElementById("dialogue_choice_text_03").innerHTML = dialogueChoice03;
//     document.getElementById("dialogue_choice_text_04").innerHTML = dialogueChoice04;
// }

let dialogueChoice01 = {
    text = "I'm not sure. Everything is a bit foggy.",
    dialogueNode = dialogueNode02,
}

let actorJiub = {
    name = "Jiub",
    //portrait reference here
}

let dialogueNode01 = {
    location = "Prison Boat",
    actor = actorJiub,
    text = "Stand up. There you go. You were dreaming. What's your name?",
    choices = [dialogueChoice01, dialogueChoice02, dialogueChoice03, dialogueChoice04] 
}

let dialogueNode02 = {
    location = "Prison Boat",
    actor = actorJiub,
    text = "Well, not even last night's storm could wake you. I heard them say we've reached Morrowind, I'm sure they'll let us go.",
    choices = [23, 1, 6],
}
