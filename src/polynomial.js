var math = require("../lib/math");

Polynomial = {
		
	/*
	 * Function that given a constant returns a function in the form
	 * y = c0 + c1*x + c2*x^2 + ... + cn*x^n, which cam be evaluate at
	 * the form f(x).
	 * 
	 * @param {Vector} constants - Constants of the function
	 * @return {Function} f - function in the form y = c0 + c1*x + c2*x^2 + ... + cn*x^n
	 * */
    // TODO: support for mathjs vectors
 	poly: function(constants) {
		var constantsReverse = constants.reverse();
		var func = 'f(x) = ';
		for(var i = 0; i < constants.length; ++i){
			if(constants[i] == 0) {
				continue;
			}
			if(i != constants.length - 1) {
				func += constantsReverse[i] + ' * x ^ ' + i + ' + ';
			} else {
				func += constantsReverse[i] + ' * x ^ ' + i;
			}
		}
		return math.eval(func);
	}
};