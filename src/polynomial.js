/*
 * 
 * */
polynomial = { 
		
	/* 
	 * Función que dada una constantes devuelve un función de la 
	 * forma y = c0 + c1*x + c2*x^2 + ... + cn*x^n que se puede
	 * evaluar de la forma f(x).
	 * 
	 * @param {Vector} constants 
	 * 
	 * */
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
}