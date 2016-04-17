define([
    "lib/pixi"
], function(
    PIXI
) {

    var self = {
        width: 800,
        height: 400,

        add: add,
        remove: remove,
        render: render
    };

    var r, stage;

    var backgroundColor = 0xf1c55b; //0xCDDBDE;

    init();

    return self;

    //////////////

    function init() {
        r = PIXI.autoDetectRenderer(self.width, self.height, {
            transparent: true
                //backgroundColor: backgroundColor
        });
        document.body.appendChild(r.view);

        stage = new PIXI.Container();
    }

    function add(obj) {
        stage.addChild(obj);
    }

    function remove(obj) {
        // TODO
    }

    function render() {
        r.render(stage);
    }

});