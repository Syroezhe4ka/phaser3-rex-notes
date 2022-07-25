import Canvas from '../canvas/Canvas.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class AlphaMaskImage extends Canvas {
    constructor(scene, x, y, key, frame, config) {
        super(scene, x, y);

        this.type = 'rexAlphaMaskImage';
        this.maskFrame = null;
        this.setTexture(key, frame, config);
    }

    setTexture(key, frame, config) {
        if (typeof (frame) === 'object') {
            config = frame;
            frame = undefined;
        }

        var maskKey, maskFrame, invertMaskAlpha, maskScale, backgroundColor;
        if (typeof (config) === 'string') {
            maskKey = config;
            maskFrame = undefined;
            invertMaskAlpha = false;
            maskScale = undefined;
            backgroundColor = undefined;
        } else {
            maskKey = GetValue(config, 'mask');
            maskFrame = GetValue(config, 'maskFrame');
            invertMaskAlpha = GetValue(config, 'invertMaskAlpha', false);
            maskScale = GetValue(config, 'maskScale');
            backgroundColor = GetValue(config, 'backgroundColor');
        }

        if (maskKey) {
            this._maskKey = maskKey;
            this._maskFrame = maskFrame;
            this._maskScale = maskScale;

            var texture = (maskKey) ? this.scene.sys.textures.get(maskKey) : null;
            this.maskFrame = (texture) ? texture.get(maskFrame) : null;
        }

        this._textureKey = key;
        this._frameName = frame;

        var maskTextureFrame = this.maskFrame;
        if (maskTextureFrame === null) {
            this.loadTexture(key, frame);
            this.dirty = true;
            return this;
        }

        var hasBackgroundColor = (backgroundColor != null);
        this.loadTexture(key, frame);

        // Draw mask
        var canvas = this.canvas,
            ctx = this.context;
        var width = canvas.width,
            height = canvas.height;

        ctx.save();
        ctx.globalCompositeOperation = (invertMaskAlpha) ? 'destination-out' : 'destination-in';

        var maskWidth, maskHeight;
        if (this._maskScale != null) {
            maskWidth = maskTextureFrame.cutWidth * this._maskScale;
            maskHeight = maskTextureFrame.cutHeight * this._maskScale;
        } else {
            maskWidth = width;
            maskHeight = height;
        }
        var maskX = (width - maskWidth) / 2;
        var maskY = (height - maskHeight) / 2;

        ctx.drawImage(maskTextureFrame.source.image,
            maskTextureFrame.cutX, maskTextureFrame.cutY, maskTextureFrame.cutWidth, maskTextureFrame.cutHeight,
            maskX, maskY, maskWidth, maskHeight);

        ctx.restore();

        if (hasBackgroundColor) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }

        this.dirty = true;
        return this;
    }

    resize(width, height) {
        // Don't draw content again.
        this.setDisplaySize(width, height);
        return this;
    }
}

export default AlphaMaskImage;