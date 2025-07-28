import { sound } from "@pixi/sound";
import { SOUND_CLICK_URL, SOUND_FLIP_URL, SOUND_MOVE_URL, SOUND_WIN_URL } from "../consts/CResources";
import { CLICK, FLIP, MOVE, WIN } from "../consts/CSound";

export class SoundManager {
    private static _instance: SoundManager;

    public static getInstance(): SoundManager {
        if (!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance;
    }

    public initialize(): void {
        sound.add(CLICK, SOUND_CLICK_URL);
        sound.add(FLIP, SOUND_FLIP_URL);
        sound.add(MOVE, SOUND_MOVE_URL);
        sound.add(WIN, SOUND_WIN_URL);
    }

    public playSound(name: string): void {
        sound.play(name);
        console.log("SoundManager playSound() name = " + name);
    }
}