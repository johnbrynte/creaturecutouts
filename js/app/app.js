define([
    "core/renderer",
    "core/input",
    "core/timer",
    "core/physics",
    "entities/Cutout",
    "entities/Body",
    "lib/pixi"
], function(
    renderer,
    input,
    timer,
    physics,
    Cutout,
    Body,
    PIXI
) {

    var step = 0;

    var cutouts = [];

    var obj, joint;

    input.onMouseStart(function(pos) {
        physics.world.QueryPoint(function(fixture) {
            obj = fixture.GetBody().GetUserData();
        }, pos);
    });

    input.onMouseDrag(function(pos) {
        if (!obj) {
            return;
        }

        if (!joint) {
            var jointDefinition = new physics.b2MouseJointDef();

            jointDefinition.bodyA = physics.world.GetGroundBody();
            jointDefinition.bodyB = obj.body;
            jointDefinition.target.Set(pos.x, pos.y);
            jointDefinition.maxForce = 10000000;
            jointDefinition.timeStep = timer.fixedDeltaTime;
            joint = physics.world.CreateJoint(jointDefinition);
        }

        joint.SetTarget(new physics.b2Vec2(pos.x, pos.y));
    });

    input.onMouseEnd(function() {
        obj = null;
        if (joint) {
            physics.world.DestroyJoint(joint);
            joint = null;
        }
    });

    timer.onStep(function(d) {
        input.update();

        physics.update(d);

        step += d;
    });
    timer.onDraw(function() {
        for (var i = 0; i < cutouts.length; i++) {
            cutouts[i].update();
        }
        renderer.render();
    });

    //////////////

    var bg = PIXI.Sprite.fromImage("img/paper_bg_light.jpg");
    bg.width = renderer.viewWidth;
    bg.height = renderer.viewHeight;
    renderer.add(bg);

    /////////////

    var cutout = new Cutout({
        x: renderer.viewWidth / 2 - 2,
        y: renderer.viewHeight / 2 - 1,
        radius: 1.3,
        shape: "triangle"
    });
    cutouts.push(cutout);
    var cutout2 = new Cutout({
        x: renderer.viewWidth / 2 + 2,
        y: renderer.viewHeight / 2 - 1,
        width: 2,
        height: 2,
        shape: "rectangle"
    });
    cutouts.push(cutout2);
    var cutout3 = new Cutout({
        x: renderer.viewWidth / 2,
        y: renderer.viewHeight / 2 + 2,
        radius: 1,
        shape: "circle"
    });
    cutouts.push(cutout3);

    var ground = new Body({
        type: "static",
        x: renderer.viewWidth / 2,
        y: renderer.viewHeight,
        width: renderer.width,
        height: 2
    });

    /////////////

    timer.start();

});