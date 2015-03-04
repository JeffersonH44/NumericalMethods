var fs = require("../src/fit");
require("../lib");

var x = math.matrix([-1, 0, 1, 2, 3, 4, 5, 6]);
var y = math.matrix([10, 9, 7, 5, 4, 3, 0, -1]);
f = fit.linearFit(x, y);

console.log(f);