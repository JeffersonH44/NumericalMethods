
var Integrals = {
	/*
	 * Función que calcula la integral dado uno de los dos métodos (simpson, trapezium)
	 * 
	 * @param {Function} f
	 * @param {Number, BigNumber} a
	 * @param {Number, BigNumber} b
	 * @param {Number, BigNumber} M
	 * @param {String} method
	 * 
	 * */
	integrate : function(f, a, b, M, method) {
		switch(method) {
			case "simpson":
				return this.simpsonRule(f, a, b, M);
			case "trapezium":
				return this.trapezoidalRule(f, a, b, M);
			default:
				throw "There is no " + method + " method for integrals";
		}
	},
	
	/*
	 * Función que calcula la integral por medio de la regla del trapecio
	 * compuesta dado un número de subintervalos M
	 * 
	 * @param {Function} f
	 * @param {Number, BigNumber} a
	 * @param {Number, BigNumber} b
	 * @param {Number, BigNumber} M
	 * 
	 * @return {Number, BigNumber} integral
	 * */
	
	trapezoidalRule : function(f, a, b, M) {
		var h = math.divide(math.add(b, -a), M);
		var sum = 0;
		for(var k = 1; k < M; ++k) {
			var x = math.add(a, math.multiply(h, k));
			sum = math.add(sum, f(x));
		}
		var firstTerm = math.divide(math.multiply(h, math.add(f(a), f(b))), 2);
		var secondTerm = math.multiply(h, sum);
		return math.add(firstTerm, secondTerm);
	},
	
	/*
	 * Función que calcula la integral por medio de la regla de Simpson
	 * dado un número impar de subintervalos M
	 * 
	 * @param {Function} f
	 * @param {Number, BigNumber} a
	 * @param {Number, BigNumber} b
	 * @param {Number, BigNumber} M
	 * @return {Number, BigNumber} integral
	 * 
	 * */
	
	simpsonRule : function(f, a, b, M) {
		if(M % 2 == 0) {
			throw "the simpson rule requires an odd number of subintervals";
		}
		var h = math.divide(math.add(b, -a), math.multiply(2, M));
		var sum1 = 0;
		var sum2 = 0;
		for(var k = 1; k <= M; ++k) {
			var x = math.add(a, math.multiply(h, 2 * k - 1));
			sum1 = math.add(sum1, f(x));
			if(k != M) {
				x = math.add(a, math.multiply(h, 2 * k));
				sum2 = math.add(sum2, f(x));
			}
		}
		var firstSum = math.add(f(a), f(b));
		var secondSum = math.multiply(4, sum1);
		var thirdSum = math.multiply(2, sum2);
		var numerator = math.multiply(h, math.add(firstSum, math.add(secondSum, thirdSum)));
		return math.divide(numerator, 3);
	}
}