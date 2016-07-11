var menubar = require('menubar');
var opts = {
  tooltip: "clipboard helper",
  width: 400,
  height: 400
};

var mb = menubar(opts);

mb.on('ready', function ready () {
  console.log('app is ready')
});
