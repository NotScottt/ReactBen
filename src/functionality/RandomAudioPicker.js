export function playRandomSound() {
    const sounds = [
        new Audio("assets/sounds/ben.mp3"),
        new Audio("assets/sounds/laugh.mp3"),
        new Audio("assets/sounds/no.mp3"),
        new Audio("assets/sounds/ugh.mp3"),
        new Audio("assets/sounds/yes.mp3"),
    ];

    const randomIndex = Math.floor(Math.random() * sounds.length);
    sounds[randomIndex].play();
}