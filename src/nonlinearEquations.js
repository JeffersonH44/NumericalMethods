/*
 * 
 * */

nonlinearEquations = {
	// TODO: Cambiar el modo de recibir los parámetros
	/*getRoot : function(arguments) {
		switch(arguments.type) {
			case "bisection":
				return nonlinearEquations.bisectionMethod(arguments.f, arguments.args[0], arguments.args[1], arguments.args[2])
			case "false position":
				return nonlinearEquations.falsePositionMethod(f, a, b, delta, epsilon, maxIterations)
			case "newton":
				return nonlinearEquations.newtonMethod(f, df, p0, delta, epsilon, maxIterations);
			case "secant":
				return nonlinearEquations.secantMethod(f, p0, p1, delta, epsilon, maxIterations);
		}
	},*/
	
	/*
	 * Función que halla la raíz de la función "f" en el intervalo 
	 * dado [a, b] por medio del método de la bisección
	 * 
	 * @param {Function} f
	 * @param {Number, BigNumber} a
	 * @param {Number, BigNumber} b
	 * @param {Number, BigNumber} delta
	 * */
	bisectionMethod : function(f, a, b, delta) {
		var ya = f(a);
		var yb = f(b);
		var c;
		if(math.largerEq(math.multiply(ya, yb), 0)) {
			throw "Bisection method requires that f(a) and f(b) be of diferent sign.";
		}
		// maxIterations is an aproximation of the number of iterations that need the method to converge
		var maxIterations = 1 + math.round((math.log(b - a) - math.log(delta))/math.log(2));
		for(var i = 0; i < maxIterations; ++i) {
			c = (a + b) / 2;
			var yc = f(c);
			if(yc == 0) {
				a = c;
				b = c;
				break;
			} else if(yc*yb > 0) {
				b = c;
				yb = yc;
			} else {
				a = c;
				ya = c;
			}
			if(b - a < delta)
				break;
		}
		return c;
	},
	
	/*
	 * Función que halla la raíz de la función "f" en el intervalo 
	 * dado [a, b] por medio del método de la posición falsa.
	 * 
	 * Requiere un delta para la diferencia entre los puntos a y b
	 * y un epsilon para la decir cuando es 0 en el método.
	 * 
	 * @param {Function} f
	 * @param {Number, BigNumber} a
	 * @param {Number, BigNumber} b
	 * @param {Number, BigNumber} delta
	 * @param {Number, BigNumber} epsilon
	 * @param {Number} maxIterations
	 * */
	
	falsePositionMethod : function (f, a, b, delta, epsilon, maxIterations) {
		var ya = f(a);
		var yb = f(b);
		var c;
		if(ya * yb > 0) {
			throw "Bisection method requires that f(a) and f(b) be of diferent sign.";
		}
		for(var i = 0; i < maxIterations; ++i) {
			dx = yb * (b - a)/(yb - ya);
			c = b - dx;
			ac = c - a;
			yc = f(c);
			if (yc == 0) {
				break;
			} else if (yb * yc > 0) {
				b = c;
				yb = yc;
			} else {
				a = c;
				ya = yc;
			}
			dx = math.min(math.abs(dx), ac);
			if (math.abs(dx) < delta || math.abs(yc) < epsilon)
				break;
		}
		return c;
	},
	
	/*
	 * 
	 * Función que haya la raíz de una función f con su derivada df
	 * por medio del método de Newton.
	 * 
	 * Requiere un delta para la diferencia entre los puntos a y b
	 * y un epsilon para la decir cuando es 0 en el método.
	 * 
	 * @param {Function} f
	 * @param {Function} df
	 * @param {Number, BigNumber} p0
	 * @param {Number, BigNumber} delta
	 * @param {Number, BigNumber} epsilon
	 * @param {Number} maxIterations
	 * 
	 * */
	newtonMethod : function(f, df, p0, delta, epsilon, maxIterations) {
		for(var i = 0; i < maxIterations; ++i) {
			var p1 = p0- f(p0)/df(p0);
			var absoluteError = math.abs(p1 - p0);
			var relativeError = 2*absoluteError /(math.abs(p1) + delta);
			p0 = p1;
			y = f(x);
			if(absoluteError < delta || relativeError < delta || abs(y) < epsilon) {
				break;
			}
		}
		return p0;
	},
	
	/*
	 * Función que haya la raíz de la función f por medio de dos puntos
	 * P0 y P1 por medio del método de la secante.
	 * 
	 * Requiere un delta para la diferencia entre los puntos a y b
	 * y un epsilon para la decir cuando es 0 en el método.
	 * 
	 * @param {Function} f
	 * @param {Number, BigNumber} p0
	 * @param {Number, BigNumber} p1
	 * @param {Number, BigNumber} delta
	 * @param {Number, BigNumber} epsilon
	 * @param {Number} maxIterations
	 * 
	 * */
	secantMethod : function(f, p0, p1, delta, epsilon, maxIterations) {
		for(var i = 0; i < maxIterations; ++i) {
			var p2 = p1 - f(p1)*(p1 - p0)/(f(p1) - f(p0));
			var absoluteError = math.abs(p2 - p1);
			var relativeError = 2*relativeError/(math.abs(p2) + delta);
			p0 = p1;
			p1 = p2;
			y = f(p1);
			if(absoluteError < delta || relativeError < delta || abs(y) < epsilon) {
				break;
			}
		}
		return p1;
	}
}
