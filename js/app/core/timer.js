define(function() {

    var timestep = 1 / 60;
    var drawstep = 0;
    var accumulated = 0;
    var prevtime = 0;
    var prevdraw = 0;
    var running = false;
    var stepcallbacks = [];
    var drawcallbacks = [];

    var self = {
        start: start,
        stop: stop,
        onDraw: onDraw,
        onStep: onStep,

        fixedDeltaTime: timestep,
        deltaTime: 0
    };

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
        window.setTimeout(f, 1 / 30);
    };

    return self;

    /////////////

    function start() {
        if (!running) {
            running = true;
            accumulated = 0;
            prevtime = Date.now();
            prevdraw = Date.now();
            innerLoop();
        }
    }

    function stop() {
        running = false;
    }

    function onDraw(f) {
        drawcallbacks.push(f);
    }

    function onStep(f) {
        stepcallbacks.push(f);
    }

    function innerLoop() {
        var time = Date.now();
        var t = time - prevtime;
        var d = 0;
        if (t > 0)
            d = t / 1000;
        if (d > 1 / 4)
            d = 1 / 4;
        accumulated += d;
        self.deltaTime = d;
        while (accumulated >= timestep) {
            accumulated -= timestep;

            // step
            for (var i = 0; i < stepcallbacks.length; i++)
                stepcallbacks[i](timestep);
        }
        prevtime = time;

        // draw
        t = time - prevdraw;
        var d = 0;
        if (t > 0)
            d = t / 1000;
        if (d >= drawstep) {
            prevdraw = time;
            for (var i = 0; i < drawcallbacks.length; i++)
                drawcallbacks[i]();
        }

        if (running)
            window.requestAnimationFrame(innerLoop);
    }
});