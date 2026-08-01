/* © Paul Murray 2026 https://github.com/PaulMurrayCbr/Torchbearer */

export class Sound {

    static torchOnSound;
    static torchOffSound;
    static bellSound;

    constructor() {
        throw new Error("Static class");
    }

    static loadSounds() {
        try {
            Sound.torchOnSound = new Audio("../media/djartmusic-short-fire-whoosh_1-317280.mp3");
            Sound.torchOnSound.preload = "auto";
        } catch (e) {
            console.error(e);
        }

        try {
            Sound.torchOffSound = new Audio("../media/musicholder-fire-extinguishing-212651.mp3");
            Sound.torchOffSound.preload = "auto";
        } catch (e) {
            console.error(e);
        }

        try {
            Sound.bellSound = new Audio("../media/universfield-church-bell-toll-156464.mp3");
            Sound.bellSound.preload = "auto";
        } catch (e) {
            console.error(e);
        }
    }

    static ignite() {
        try {
            Sound.torchOnSound.currentTime = 0;
            Sound.torchOnSound.play();
        } catch (e) {
            console.error(e);
        }
    }

    static extinguish() {
        try {
            Sound.torchOffSound.currentTime = 0;
            Sound.torchOffSound.play();
        } catch (e) {
            console.error(e);
        }
    }

    static alarm() {
        try {
            Sound.bellSound.currentTime = 0;
            Sound.bellSound.play();
        } catch (e) {
            console.error(e);
        }
    }
}