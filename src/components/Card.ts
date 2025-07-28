import { TweenLite } from 'gsap';
import { Container, Point, Sprite, Texture } from 'pixi.js';
import { CARD_ANIMATION_TIME, CARD_DISAPPEAR_TIME, CARD_UPDATE_ORDER_TIME } from '../consts/CGame';
import { FLIP, MOVE } from '../consts/CSound';
import { DEFAULT_CARD_NAME } from '../consts/CText';
import { SoundManager } from '../managers/SoundManager';

export class Card extends Container {
    private frontTexture!:Texture; 
    private backTexture!:Texture; 
    private card!:Sprite;
    private tween!:TweenLite;
    private movedPosition!:Point;
    private orderTimeOutId!:number;

    constructor(assets:any, cardName:string) {
        super();

        this.init(assets, cardName);
    } 

    private init(assets:any, cardName:string): void {
        this.backTexture = assets[DEFAULT_CARD_NAME];
        this.frontTexture = assets[cardName];

        this.card = new Sprite(this.backTexture);
        this.card.anchor = 0.5;
        this.addChild(this.card);
    }

    private revealCard(callback:Function): void {
        this.tween = TweenLite.to(this.card.scale, {
            duration: CARD_ANIMATION_TIME,
            x: 0.08,
            onComplete: () => {
                this.updateTexture();
                this.playFlip();
                
                this.tween = TweenLite.to(this.card.scale, {
                    duration: CARD_ANIMATION_TIME,
                    x: 1,
                    onComplete: () => {
                        this.disappear();
                        callback && callback();
                    }
                });
            },
        });
    }

    private updateTexture(): void {
        this.card.texture = this.frontTexture;
    }

    private playFlip(): void {
        SoundManager.getInstance().playSound(FLIP);
    }

    private updateCardZIndex(zIndex:number): void {
        if(zIndex) {
            const that = this;
            this.orderTimeOutId = setTimeout(() => {
                that.zIndex = zIndex;
            }, CARD_UPDATE_ORDER_TIME);
        }
    }

    public setMovedPosition(position:Point): void {
        this.movedPosition = position;
    }

    public move(zIndex:number, callback:Function): void {
        this.tween = new TweenLite(this.card, CARD_ANIMATION_TIME, {x: this.movedPosition.x, y: this.movedPosition.y, onComplete: this.revealCard.bind(this, callback)});
        this.updateCardZIndex(zIndex);
        SoundManager.getInstance().playSound(MOVE);
    }

    public disappear(): void {
        this.tween = new TweenLite(this.card, CARD_ANIMATION_TIME, {alpha: 0, delay: CARD_DISAPPEAR_TIME});
    }

    public destroy(): void {
        clearTimeout(this.orderTimeOutId);
        this.tween.kill();
        this.removeChild(this.card);
        this.card.destroy();
        this.backTexture.destroy();
        this.frontTexture.destroy();
    }
}