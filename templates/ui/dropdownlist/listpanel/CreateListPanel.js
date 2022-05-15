import Buttons from '../../buttons/Buttons.js';
import FixWidthButtons from '../../fixwidthbuttons/FixWidthButtons.js';

var CreateListPanel = function (scene) {
    var background;
    var createBackgroundCallback = this.createBackgroundCallback;
    if (createBackgroundCallback) {
        background = createBackgroundCallback.call(this, scene);
        scene.add.existing(background);
    }

    var buttons = [];
    var createButtonCallback = this.createButtonCallback;
    if (createButtonCallback) {
        var options = this.options;
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var button = createButtonCallback.call(this, scene, options[i], i, options);
            scene.add.existing(button);
            buttons.push(button);
        }
    }

    var width = this.listWidth;
    if (width === undefined) {
        if (this.listAlignMode === 'text') {
            width = this.getElement('text').width;
        } else {
            width = this.width;
        }
    }
    var height = this.listHeight;

    var listPanel;
    if (!this.listWrapEnable) {
        listPanel = new Buttons(scene, {
            width: width, height: height,

            orientation: 'y',
            background: background,
            buttons: buttons,
        });
    } else {
        listPanel = new FixWidthButtons(scene, {
            width: width, height: height,

            background: background,
            buttons: buttons,
        });
    }

    scene.add.existing(listPanel);

    return listPanel;
}

export default CreateListPanel;