define([
    "core/renderer",
    "core/input",
    "core/timer",
    "core/physics",
    "lib/pixi"
], function(
    renderer,
    input,
    timer,
    physics,
    PIXI
) {

    timer.onStep(function(d) {
        input.update();

        physics.update(d);
    });
    timer.onDraw(function() {
        renderer.render();
    });

    timer.start();

    //////////////

    var bg = PIXI.Sprite.fromImage("img/paper_bg_light.jpg");
    bg.width = renderer.width;
    bg.height = renderer.height;
    renderer.add(bg);


    // draw a shape
    var x = renderer.width / 2;
    var y = renderer.height / 2;
    var d = 160;

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xF371AC);
    graphics.lineStyle(0, 0, 0);
    graphics.moveTo(x + d / 2, y + d / 2);
    graphics.lineTo(x - d / 2, y + d / 2);
    graphics.lineTo(x, y - (1 / Math.sqrt(2)) * d / 2);
    graphics.lineTo(x + d / 2, y + d / 2);
    graphics.endFill();

    var dummy = new PIXI.Graphics();
    dummy.beginFill(0xF371AC);
    dummy.lineStyle(0, 0, 0);
    dummy.moveTo(x + d / 2, y + d / 2);
    dummy.lineTo(x - d / 2, y + d / 2);
    dummy.lineTo(x, y - (1 / Math.sqrt(2)) * d / 2);
    dummy.lineTo(x + d / 2, y + d / 2);
    dummy.endFill();

    var mask = PIXI.Sprite.fromImage("img/paper_bg_dark.jpg");
    mask.anchor.set(0.5);
    mask.position.x = x;
    mask.position.y = y;
    graphics.mask = mask;
    renderer.add(mask);

    var dropShadow1 = new PIXI.filters.DropShadowFilter();
    dropShadow1.color = "0x000000";
    dropShadow1.alpha = 0.2;
    dropShadow1.angle = Math.PI / 2;
    dropShadow1.blur = 15;
    dropShadow1.distance = 4;

    var dropShadow2 = new PIXI.filters.DropShadowFilter();
    dropShadow2.color = "0x000000";
    dropShadow2.alpha = 0.4;
    dropShadow2.angle = Math.PI / 4;
    dropShadow2.blur = 3;
    dropShadow2.distance = 1;

    graphics.filters = [dropShadow2];
    dummy.filters = [dropShadow1];

    renderer.add(dummy);
    renderer.add(graphics);

});