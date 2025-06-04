let lastPlayed = 0; // Zeitstempel des letzten Abspielens

export function playPhoneRing() {
    const now = Date.now();
    if (now - lastPlayed < 10 * 1000) {
        // Noch keine Minute vergangen, Funktion nicht ausführen
        return;
    }
    lastPlayed = now;

    const audio = new Audio("/assets/sounds/phone.mp3");
    audio.play();

    setTimeout(() => {
        const audio2 = new Audio("/assets/sounds/phone.mp3");
        audio2.play();
    }, 2000); // 2 Sekunden Delay

    setTimeout(() => {
        const audio3 = new Audio("/assets/sounds/phone-answer.mp3");
        audio3.play();
    }, 3100); // 3 Sekunden Delay
}