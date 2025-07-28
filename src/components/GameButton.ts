import { Text } from 'pixi.js';
import { BUTTON_COLOR } from '../consts/CColor';
import { BUTTON_HEIGHT, BUTTON_ROUND_RADIUS, BUTTON_WIDTH } from '../consts/CGame';
import { BUTTON_TEXT } from '../consts/CText';
import { BaseElement } from './BaseElement';

export class GameButton extends BaseElement {
    private textField!:Text;

    constructor() {
        super();
        this.initTextField();
    }

    protected draw():void {
        this.background.roundRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_ROUND_RADIUS);
        this.background.fill(BUTTON_COLOR);
        this.addChild(this.background);
    }

    private initTextField():void {
        this.textField = new Text({ text: BUTTON_TEXT, style: this.getFont() });
        this.textField.x = 22;
        this.textField.y = 0;
        this.addChild(this.textField);
    }

    public destroy() {
        super.destroy();
        this.removeChild(this.textField);
        this.textField.destroy();
    }
}