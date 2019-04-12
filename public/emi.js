const electron = require("electron");
global.app = electron.remote.app;
global.imp = function (module){
    return electron.remote.require(module)
}
global.req = function (module){
    return require(module);
}