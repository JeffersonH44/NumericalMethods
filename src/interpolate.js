/**
 * 
 */
interpolate = {
	
	/*
	 * Función que devuelve un polinomio interpolador de Lagrange que
	 * se puede evaluar de la forma f(x)
	 * 
	 * @param {Vector} X
	 * @param {Vector} Y
	 * 
	 * */	
	
	lagrange : function(X, Y) {
		var size = math.subset(math.size(X), math.index(0));
		var denominators = math.ones(size);
		var func = "f(x) = ";
		for(var i = 0; i < size; ++i) {
			for(var j = 0; j < size; ++j) {
				if(i != j) {
					var value = math.multiply(math.subset(denominators, math.index(i)), math.add(math.subset(X, math.index(i)), -math.subset(X, math.index(j))));
					denominators = math.subset(denominators, math.index(i), value);
				}
			}
			var actualCoefficient = math.divide(math.subset(Y, math.index(i)), math.subset(denominators, math.index(i)));
			if(i != 0) {
				func += " + ";
			}
			func += actualCoefficient + " * ";
			var firstTime = true;
			for(var j = 0; j < size; ++j) {
				if(i != j) {
					if(firstTime) {
						firstTime = false;
					} else {
						func += " * ";
					}
					func += "( x - " + math.subset(X, math.index(j)) + " )";
				}
			}
		}
		alert(func);
		return math.eval(func);
		
	},
	
	/*
	 * función que devuelve los coeficientes del polinomio interpolador de Newton
	 * 
	 * @param {Vector} X
	 * @param {Vector} Y
	 * @return {Vector} coefficients
	 * */
	newton : function(X, Y) {
		var lengthX = math.subset(math.size(X), math.index(0));
		var D = math.zeros(lengthX, lengthX);
		D = math.subset(D, math.index([0, lengthX], 0), math.transpose(Y));
		for(var j = 1; j < lengthX; ++j) {
			for(var k = j; k < lengthX; ++k){
				var numerator = math.add(math.subset(D, math.index(k, j - 1)), -math.subset(D, math.index(k - 1, j - 1)));
				var denominator = math.add(math.subset(X, math.index(k)), -math.subset(X, math.index(k - j)) );
				D = math.subset(D, math.index(k, j), numerator / denominator);
			}
		}
		alert(D);
		var coefficients = math.zeros(lengthX);
		for(var i = 0; i < lengthX; ++i) {
			var value = math.subset(D, math.index(i, i));
			coefficients = math.subset(coefficients, math.index(i), value);
		}
		return coefficients;
	}
}