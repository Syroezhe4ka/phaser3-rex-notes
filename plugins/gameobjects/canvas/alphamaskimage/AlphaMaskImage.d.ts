import Canvas from '../canvas/Canvas';

export default AlphaMaskImage;

declare namespace AlphaMaskImage {

    interface IConfig {
        mask?: string,
        maskFrame?: string,
        invertMaskAlpha?: boolean,
        maskScale?: number,
        backgroundColor?: string,
    }
}

declare class AlphaMaskImage extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        key?: string, frame?: string,
        config?: AlphaMaskImage.IConfig
    );

    setTexture(
        key?: string, frame?: string,
        config?: AlphaMaskImage.IConfig
    ): this;
}