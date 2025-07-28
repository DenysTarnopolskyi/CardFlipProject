import { Application, Assets } from 'pixi.js';
import { PIXI_APP_BG_COLOR } from './consts/CColor';
import { CARD0_URL, CARD1_URL, CARD2_URL, CARD3_URL, CARD4_URL, CARD5_URL, CARD_TITLE_URL } from './consts/CResources';
import { Game } from './Game';
import { SoundManager } from './managers/SoundManager';

export const app = new Application();
(globalThis as any).__PIXI_APP__ = app;

function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    app.renderer.canvas.style.width = `${windowWidth}px`;
    app.renderer.canvas.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);
    app.renderer.resize(windowWidth, windowHeight);
}

window.onload = () => {
    loadResources();
};

async function loadResources() {
    SoundManager.getInstance().initialize();
    
    Assets.addBundle('gameAssets', {
        title: CARD_TITLE_URL,
        card0: CARD0_URL,
        card1: CARD1_URL,
        card2: CARD2_URL,
        card3: CARD3_URL,
        card4: CARD4_URL,
        card5: CARD5_URL,
    });

    const assets = await Assets.loadBundle('gameAssets');
    init(assets);
};

async function init(assets:any) {
    await app.init({
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: PIXI_APP_BG_COLOR,
    });

    document.body.appendChild(app.canvas);
    window.addEventListener('resize', resize);
    resize();

    new Game(app, assets);
}