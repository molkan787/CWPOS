const electron = require("electron");
global.imp = function (module){
    return electron.remote.require(module)
}