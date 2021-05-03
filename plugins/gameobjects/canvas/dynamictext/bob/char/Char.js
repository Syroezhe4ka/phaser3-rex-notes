import Base from '../Base.js';
import TextStyle from './TextStyle.js';

class Char extends Base {
    constructor(
        parent,
        text,
        style
    ) {
        super(parent, 'text');
        this.style = new TextStyle(style);
        this.setText(text);
    }

    get autoRound() {
        return this.parent.autoRound;
    }

    get xOffset() {
        return this.style.x;
    }

    set xOffset(value) { }

    get yOffset() {
        return this.style.y;
    }

    set yOffset(value) { }

    modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);
        return this;
    }

    setText(text) {
        this.setDirty(this.text != text);
        this.text = text;

        if (text === '\n') {
            this.textWidth = 0;
            this.textHeight = 0;
        } else {
            var metrics = this.style.getTextMetrics(this.context, this.text);
            this.textWidth = metrics.width;

            var ascent, descent;
            if (metrics.hasOwnProperty('actualBoundingBoxAscent')) {
                ascent = metrics.actualBoundingBoxAscent;
                descent = metrics.actualBoundingBoxDescent;
            } else {
                ascent = 0;
                descent = 0;
            }
            this.textHeight = ascent + descent;
        }

        return this;
    }

    get width() {
        return this.textWidth * this.scaleX;
    }

    set width(value) {
        if (this.textWidth > 0) {
            this.scaleX = value / this.textWidth;
        } else {
            this.scaleX = 1;
        }
    }

    get height() {
        return this.textHeight * this.scaleY;
    }

    set height(value) {
        if (this.textHeight > 0) {
            this.scaleY = value / this.textHeight;
        } else {
            this.scaleY = 1;
        }
    }

    drawContent() {
        var context = this.context;
        var textStyle = this.style;

        textStyle.syncFont(context).syncStyle(context);

        if (textStyle.stroke && textStyle.strokeThickness) {
            context.strokeText(this.text, 0, 0);
        }

        if (textStyle.color) {
            context.fillText(this.text, 0, 0);
        }
    }

    draw() {
        if (!this.visible || (this.text === '') || (this.text === '\n')) {
            return this;
        }

        super.draw();
    }
}

export default Char;