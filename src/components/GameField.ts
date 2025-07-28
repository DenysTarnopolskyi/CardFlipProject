import { Text } from 'pixi.js';
import { GAME_FIELD_BG_COLOR } from '../consts/CColor';
import { GAME_HEIGHT, GAME_WIDTH } from '../consts/CGame';
import { GAME_TEXT } from '../consts/CText';
import { BaseElement } from './BaseElement';

export class GameField extends BaseElement {
    private completeTextField!:Text;

    constructor() {
        super();
        this.initCompleteTextField();
    }

    protected draw(): void {
        this.background.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.background.fill(GAME_FIELD_BG_COLOR);
        this.addChild(this.background);
    }

    private initCompleteTextField():void {
        this.completeTextField = new Text({ text: GAME_TEXT, style: this.getFont() });
        this.completeTextField.x = 140;
        this.completeTextField.y = 200;
        this.addChild(this.completeTextField);
        
        this.showCompleteText(false);
    }

    public showCompleteText(visible:boolean = true):void {
        this.completeTextField.visible = visible;
    }

    public destroy() {
        super.destroy();
        this.removeChild(this.completeTextField);
        this.completeTextField.destroy();
    }
}