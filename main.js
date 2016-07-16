var menubar = require('menubar');
var path = require('path');
var electron = require('electron');
const app = electron.app;

var opts = {
  tooltip: "clipboard helper",
  width: 400,
  height: 400
};

var mb = menubar(opts);

mb.on('ready', function ready () {
});

mb.on('after-create-window', function () {
    mb.window.openDevTools();
});
