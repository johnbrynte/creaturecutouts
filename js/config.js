requirejs.config({
    baseUrl: "js/app",
    paths: {
        lib: "../lib"
    },
    shim: {
        "lib/pixi": {
            exports: "pixi"
        },
        "lib/box2d": {
            exports: "box2d"
        }
    }
});