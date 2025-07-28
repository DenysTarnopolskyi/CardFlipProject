import { Container, Point } from "pixi.js";
import { CARDS_COUNTER, CARD_SPACE, GAME_HEIGHT, GAME_WIDTH } from "../consts/CGame";
import { CARD_NAME } from "../consts/CText";
import { Card } from "./Card";

export class CardsDeck extends Container{
    private cards: Card[] = [];
    private movedCards: Card[] = [];

    constructor(assets:any) {
        super();
        this.initCards(assets);
    }

    private initCards(assets: any) {
        let cardName:string;
        let card:Card;

        for (let i: number = 0; i < CARDS_COUNTER; i++) {
            cardName = CARD_NAME + i;
            card = new Card(assets, cardName);
            card.setMovedPosition(this.getMovedPosition());
            card.x = i * CARD_SPACE;
            this.addChild(card);
            this.cards.push(card);
        }
    }

    public revealNext(callback:Function) {
        if(!this.cards.length) {
            return
        }

        const index = this.cards.length - 1;
        const card:Card = this.cards[index];
        this.cards.splice(index, 1);

        this.movedCards.push(card);
        card.move(this.getNextZIndex(), callback);
    }

    private getNextZIndex() {
        return this.children.length + this.movedCards.length;
    }

    public getMovedPosition() {
        return new Point(GAME_WIDTH * 0.25, GAME_HEIGHT * 0.5);
    }

    public isAllCardsMoved() {
        return !this.cards.length;
    }

    public destroy() {
        this.removeCards();
    }

    private removeCards():void {
       this.cards.forEach((card) => {
            card.destroy();
       });
       this.cards = [];

       this.movedCards.forEach((card) => {
            card.destroy();
       });
       this.movedCards = [];
    }
}