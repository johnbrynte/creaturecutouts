define([
    "lib/pixi"
], function(
    PIXI
) {

    var self = {
        x: 0,
        y: 0,
        width: 800,
        height: 400,
        viewWidth: 0,
        viewHeight: 0,
        scale: 60,

        add: add,
        remove: remove,
        render: render
    };

    var r, root, stage;

    var backgroundColor = 0xf1c55b; //0xCDDBDE;

    init();

    return self;

    //////////////

    function init() {
        r = new PIXI.WebGLRenderer(self.width, self.height, {
            transparent: true,
            antialias: true
                //backgroundColor: backgroundColor
        });
        document.body.appendChild(r.view);

        self.viewWidth = self.width / self.scale;
        self.viewHeight = self.height / self.scale;

        window.addEventListener("resize", update);

        update();

        //root = new PIXI.Container();
        //root.scale.x = self.scale;
        //root.scale.y = self.scale;
        //root.position.x = self.width / 2;
        //root.position.x = self.height / 2;

        stage = new PIXI.Container();
        stage.scale.x = self.scale;
        stage.scale.y = self.scale;
        //stage.position.x = +self.viewWidth / 2;
        //stage.position.y = -self.height * self.scale / 2;
        //root.addChild(stage);
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

    function update() {
        self.x = r.view.offsetLeft;
        self.y = r.view.offsetTop;
    }

});