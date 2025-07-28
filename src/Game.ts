import { Application } from 'pixi.js';
import { CardsDeck } from './components/CardsDeck';
import { GameButton } from './components/GameButton';
import { GameField } from './components/GameField';
import { DELAY_BEFORE_CARD_MOVE } from './consts/CGame';
import { CLICK, WIN } from './consts/CSound';
import { SoundManager } from './managers/SoundManager';

enum GameResult {
    GAME,
    WIN,
    LOSE
};

export class Game {
    private app: Application;
    private gameField!: GameField;
    private revealButton!: GameButton;
    private cardsDeck!: CardsDeck;
    private revealNextTimeOutId!:number;
    private gameResult!:number;

    constructor(app:Application, assets: any) {
        this.app = app;

        this.init(assets);
    }

     private init(assets: any):void {
        this.initComponents(assets);
        this.enableRevealButton();
        this.startGame();
    }

    private startGame():void {
        this.gameResult = GameResult.GAME;
    }

    private initComponents(assets: any): void {
        this.gameField = new GameField();
        this.app.stage.addChild(this.gameField);

        this.cardsDeck = new CardsDeck(assets);
        this.cardsDeck.x = 100;
        this.cardsDeck.y = 120;
        this.gameField.addChild(this.cardsDeck);

        this.revealButton = new GameButton();
        this.revealButton.x = 300;
        this.revealButton.y = 550;
        this.revealButton.on('pointerdown', () => {
            SoundManager.getInstance().playSound(CLICK);
            //Was added special delay 0.5 sec to listen click sound and than - move card sound
            this.disableRevealButton();

            let that = this;
            this.revealNextTimeOutId = setTimeout(function() {
                that.cardsDeck.revealNext(that.checkCompeteGame.bind(that));
            }, DELAY_BEFORE_CARD_MOVE);
        });
        this.gameField.addChild(this.revealButton);
    }

    private disableRevealButton():void {
        this.revealButton.interactive = false;
        this.revealButton.cursor = 'static';
    }

    private enableRevealButton():void {
        this.revealButton.interactive = true;
        this.revealButton.cursor = 'pointer';
    }

    private checkCompeteGame():void {
        if(this.gameResult === GameResult.WIN) {
            return;
        }

        if(this.cardsDeck.isAllCardsMoved()) {
            this.showCompleteText();
            this.gameResult = GameResult.WIN;
        } else {
            this.enableRevealButton();
        }
    }

    private showCompleteText():void {
       this.gameField.showCompleteText();
       SoundManager.getInstance().playSound(WIN);
    }

    public destroy():void {
        clearTimeout(this.revealNextTimeOutId);
        this.revealButton.off('pointerdown');
        this.revealButton.destroy();
        this.gameField.destroy();
        this.cardsDeck.destroy();
    }
}