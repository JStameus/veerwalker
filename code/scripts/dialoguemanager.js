let dialogueText = "Jiub: Stand up. There you go. You were dreaming...What's your name?"

let dialogueChoice01 = "I don't remember. Everything's foggy."
let dialogueChoice02 = "I am Lord Nerevar, of course! Don't you recognize me?"
let dialogueChoice03 = "I'm not telling you my name. I'm not sure I trust you."
let dialogueChoice04 = "My name is Joseph. Nice to meet you, mister...?"

function refreshDialogueWindow() {
    document.getElementById("dialogue_text_main").innerHTML = dialogueText;
    document.getElementById("dialogue_choice_text_01").innerHTML = dialogueChoice01;
    document.getElementById("dialogue_choice_text_02").innerHTML = dialogueChoice02;
    document.getElementById("dialogue_choice_text_03").innerHTML = dialogueChoice03;
    document.getElementById("dialogue_choice_text_04").innerHTML = dialogueChoice04;
}

// let diagTxt01 = {
//     choice01 = diag01Choice01,
//     choice02 = diag01Choice02,
//     choice03 = diag01Choice03,
//     choice04 = diag01Choice04,
// }

// let diag01Choice01 = {
//     text = "I don't remember. Everything's foggy."
// }

// let diag01Choice02 = {
//     text = "I am Lord Nerevar, of course! Don't you recognize me?"
// }

// let diag01Choice03 = {
//     text = "I'm not telling you my name. I'm not sure I trust you."
// }

// let diag01Choice04 = {
//     text = "My name is Joseph. Nice to meet you, mister...?"
// }
