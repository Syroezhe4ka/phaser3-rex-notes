import Sizer from '../../../sizer/Sizer.js';
import InputFiledBase from './InputFieldBase.js';
import CreateCanvasInput from '../utils/CreateCanvasInput.js';

class NumberInput extends InputFiledBase(Sizer) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sizerConfig = {
            orientation: 0, // x            
        }
        super(scene, sizerConfig);
        this.type = 'rexTweaker.NumberInput';

        var inputTextConfig = config.inputText || config.inputText;
        var inputText = CreateCanvasInput(scene, inputTextConfig)
            .setNumberInput();

        this.add(
            inputText,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('inputText', inputText);

        inputText.on('close', function () {
            this.setValue(inputText.value);
        }, this);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }


        var text = (this.textFormatCallback) ? this.textFormatCallback(value) : value;
        this.childrenMap.inputText.setText(text);
        super.value = value;
    }

}

export default NumberInput;