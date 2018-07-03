
import { Container, Application, ApplicationOptions, Sprite } from 'pixi.js';

// Custom classes
import * as Shape from './shapes';
import './style/global.less';


new class Main {
    app: Application

    settings: ApplicationOptions = {
        backgroundColor: 0xFFFFFF,
        antialias: true
    }

    scroller: PIXI.Container

    constructor() {
        this.app = new Application(window.innerWidth, window.innerHeight, this.settings);
        document.body.appendChild(this.app.view);
        this.scroller = new PIXI.Container()
        PIXI.loader
            .add('bg', require('./asset/image/background.jpg'))
            .add('magic', require('./asset/image/magic.png'))
            .add('bubble', require('./asset/image/bubble.png'))
            .load(this.onAssetsLoaded.bind(this))
        
    }

    onAssetsLoaded() {
        let bg = new PIXI.Sprite(PIXI.loader.resources['bg'].texture)
        let magic = new PIXI.Sprite(PIXI.loader.resources['magic'].texture)
        
        bg.width = window.innerWidth
        bg.height = window.innerHeight
        
        magic.position.set((window.innerWidth/2 - magic.width/2), window.innerHeight - 100)

        this.renderScroller()

        this.app.stage.addChild(bg)
        this.app.stage.addChild(magic)
        this.app.stage.addChild(this.scroller)
        this.app.ticker.add(delta => this.scroll(delta))
    }

    renderScroller() {
        for (let i = 0; i < 1000; i++) {
            let bubble = new PIXI.Sprite(PIXI.loader.resources['bubble'].texture)
            bubble.width = 40
            bubble.height = 40
            bubble.position.set((window.innerWidth * Math.random()), -i * 80)
            this.scroller.addChild(bubble)
        }
    }

    scroll(delta:number) {
        this.scroller.y += 1 + delta
    }
}
