define([
    "lib/pixi",
    "core/renderer",
    "entities/Body"
], function(
    PIXI,
    renderer,
    Body
) {

    function Cutout(params) {
        params.x = params.x || renderer.width / 2;
        params.y = params.y || renderer.height / 2;

        this.graphics = new PIXI.Container();
        this.graphics.position.x = params.x;
        this.graphics.position.y = params.y;

        function noise(n) {
            return (n || 1) * (0.5 - Math.random());
        }

        var points = [];
        switch (params.shape) {
            case "triangle":
                var r = params.radius || 1;
                var x = r * Math.cos(Math.PI / 6);
                var y = r * Math.sin(Math.PI / 6);
                var ns = 0.05;

                points = [{
                    x: x + noise(ns),
                    y: y + noise(ns)
                }, {
                    x: -x + noise(ns),
                    y: y + noise(ns)
                }, {
                    x: 0 + noise(ns),
                    y: -r + noise(ns)
                }];

                this.body = new Body({
                    x: params.x,
                    y: params.y,
                    points: points,
                    shape: "polygon"
                });
                break;
            case "rectangle":
                var width = params.width || 1;
                var height = params.height || 1;
                var ns = 0.05;

                points = [{
                    x: -width / 2 + noise(ns),
                    y: -height / 2 + noise(ns)
                }, {
                    x: width / 2 + noise(ns),
                    y: -height / 2 + noise(ns)
                }, {
                    x: width / 2 + noise(ns),
                    y: height / 2 + noise(ns)
                }, {
                    x: -width / 2 + noise(ns),
                    y: height / 2 + noise(ns)
                }];

                this.body = new Body({
                    x: params.x,
                    y: params.y,
                    points: points,
                    shape: "polygon"
                });
                break;
            case "circle":
                var r = params.radius || 1;
                var n = 16 + Math.floor(Math.random() * 4);
                var a = 0;
                var ns1 = 0.05;
                var ns2 = 0.05;

                for (var i = 0; i < n; i++) {
                    points.push({
                        x: r * Math.cos(a) + noise(ns1),
                        y: r * Math.sin(a) + noise(ns1)
                    });
                    a += Math.PI * 2 * (1 / n + noise(ns2));
                }

                this.body = new Body({
                    x: params.x,
                    y: params.y,
                    radius: r,
                    shape: "circle"
                });
                break;
            default:
                throw new Error("No such shape: " + params.shape);
                break;
        }

        var shape = new PIXI.Graphics();
        var color = 0xF371AC;
        shape.beginFill(color);
        shape.lineStyle(0, 0, 0);
        for (var i = 0; i < points.length; i++) {
            if (i == 0) {
                shape.moveTo(points[i].x, points[i].y);
            } else {
                shape.lineTo(points[i].x, points[i].y);
            }
        }
        shape.endFill();

        var dummyShape = shape.clone();

        var mask = PIXI.Sprite.fromImage("img/paper_bg_dark.jpg");
        mask.anchor.set(0.5);
        mask.width = 500 / renderer.scale;
        mask.height = 500 / renderer.scale;
        shape.mask = mask;

        var dropShadow1 = new PIXI.filters.DropShadowFilter();
        dropShadow1.color = "0x000000";
        dropShadow1.alpha = 0.4;
        dropShadow1.angle = Math.PI / 2;
        dropShadow1.blur = 15;
        dropShadow1.distance = 5;

        var dropShadow2 = new PIXI.filters.DropShadowFilter();
        dropShadow2.color = "0x000000";
        dropShadow2.alpha = 0.4;
        dropShadow2.angle = Math.PI / 4;
        dropShadow2.blur = 4;
        dropShadow2.distance = 1;

        dummyShape.filters = [dropShadow1];
        shape.filters = [dropShadow2];

        this.graphics.addChild(mask);
        this.graphics.addChild(dummyShape);
        this.graphics.addChild(shape);

        renderer.add(this.graphics);

        // add a nut
        this.nut = PIXI.Sprite.fromImage("img/nut.png");
        this.nut.anchor.set(0.5);
        this.nut.width = 0.7;
        this.nut.height = 0.7;
        this.graphics.addChild(this.nut);
    }

    Cutout.prototype.update = function() {
        var pos = this.body.getPos();
        var rot = this.body.getAngle();

        this.graphics.position.x = pos.x;
        this.graphics.position.y = pos.y;
        this.graphics.rotation = rot;

        this.nut.rotation = -rot;
    };

    return Cutout;

});