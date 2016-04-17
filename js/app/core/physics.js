define([
    "lib/box2d"
], function(
    Box2d
) {

    var self = {
        world: null,

        update: update
    };

    // commons
    var b2Vec2 = self.b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2BodyDef = self.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = self.b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = self.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = self.b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = self.b2World = Box2D.Dynamics.b2World;
    var b2MassData = self.b2MassData = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape = self.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = self.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = self.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2MouseJointDef = self.b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

    init();

    return self;

    //////////////////////////

    function init() {
        var gravity = new b2Vec2(0, 8);
        self.world = new b2World(gravity, true);
    }

    function update(d) {
        self.world.Step(d,
            8, // velocity iterations
            3); // position iterations
    }

});