define([
    "core/physics"
], function(
    ph
) {

    function Body(params) {
        // Create the definition
        def = new ph.b2BodyDef();

        // Set up the definition
        for (var k in this.defDefaults) {
            def[k] = params[k] || this.defDefaults[k];
        }
        def.position = new ph.b2Vec2(params.x || 0, params.y || 0);
        def.linearVelocity = new ph.b2Vec2(params.vx || 0, params.vy || 0);
        def.userData = this;
        def.type = params.type == "static" ? ph.b2Body.b2_staticBody : ph.b2Body.b2_dynamicBody;

        // Create the Body
        this.body = ph.world.CreateBody(def);

        // Create the fixture
        fixtureDef = new ph.b2FixtureDef();
        for (var l in this.fixtureDefaults) {
            fixtureDef[l] = params[l] || this.fixtureDefaults[l];
        }

        params.shape = params.shape || this.defaults.shape;

        switch (params.shape) {
            case "circle":
                params.radius = params.radius || this.defaults.radius;
                fixtureDef.shape = new ph.b2CircleShape(params.radius);
                break;
            case "polygon":
                fixtureDef.shape = new ph.b2PolygonShape();
                fixtureDef.shape.SetAsArray(params.points, params.points.length);
                break;
            case "block":
            default:
                params.width = params.width || this.defaults.width;
                params.height = params.height || this.defaults.height;

                fixtureDef.shape = new ph.b2PolygonShape();
                fixtureDef.shape.SetAsBox(params.width / 2, params.height / 2);
                break;
        }

        this.body.CreateFixture(fixtureDef);
    }

    Body.prototype.getPos = function() {
        return this.body.GetPosition();
    };

    Body.prototype.getAngle = function() {
        return this.body.GetAngle();
    };

    Body.prototype.defaults = {
        shape: "block",
        width: 5,
        height: 5,
        radius: 2.5
    };

    Body.prototype.fixtureDefaults = {
        density: 10,
        friction: 1,
        restitution: 0.2
    };

    Body.prototype.definitionDefaults = {
        active: true,
        allowSleep: true,
        angle: 0,
        angularVelocity: 0,
        awake: true,
        bullet: false,
        fixedRotation: false
    };

    return Body;

});