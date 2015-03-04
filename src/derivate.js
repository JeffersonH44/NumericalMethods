/**
 * 
 */
derivate = {
	/* 
	 * 
	 * Esta función recibe dos vectores de coordenadas X's y Y's, la posición en el 
	 * vector donde queremos sacar la derivada, el numero de la derivada y el h a
	 * usar en la fórmula y devuelve la derivada en el punto Position con las fórmulas
	 * de diferencias centradas según el número proporcionado en fórmula.
	 * 
	 * @param {Vector} X
	 * @param {Vector} Y
	 * @param {Number} position
	 * @param {Number} derivate
	 * @param {Number} h
	 * @param {Number} formula
	 * @param {Number} derivate
	 * 
	 * */	
	derivate : function(X, Y, position, derivate, h, formula) {
		switch(formula) {
			case 2:
				return this.centeredDifferencesH2(X, Y, position, derivate, h);
			case 4:
				return this.centeredDifferencesH4(X, Y, position, derivate, h);
			default:
				throw "there is no formula for O(h" + formula + ").";
		}
	},
	/*
	 * Función que retorna un vector con las posiciones respectivas para las diferencias centradas
	 * 
	 * */	
	_getPositions : function(X, Y, position, h) {
		var values = [null, null, null, math.subset(Y, math.index(position)), null, null, null];
		var size = math.subset(math.size(Y), math.index(0));
		var valueAtPosition = math.subset(X, math.index(position));
		var otherH = h;
		var pos = 3;
		for(var i = position - 1; i >= 0 && pos != -1; --i) {
			var actualValue = math.subset(X, math.index(i));
			var value = math.abs(math.add(valueAtPosition , -actualValue));
			if(math.equal(value, otherH)) {
				values[--pos] = math.subset(Y, math.index(i));
				otherH = math.add(otherH, h);
			}
		}
		var otherH = h;
		var pos = 3;
		for(var i = position + 1; i < size && pos != 7; ++i) {
			var actualValue = math.subset(X, math.index(i));
			var value = math.abs(math.add(valueAtPosition , -actualValue));
			if(math.equal(value, otherH)) {
				values[++pos] = math.subset(Y, math.index(i));
				otherH = math.add(otherH, h);
			}
		}
		return values;
	},
	/*
	 * Esta función recibe dos vectores de coordenadas X's y Y's, la posición en el 
	 * vector donde queremos sacar la derivada, el numero de la derivada y el h a
	 * usar en la fórmula y devuelve la derivada en el punto Position con las fórmulas
	 * de diferencias centradas O(h^2).
	 * 
	 * 
	 * @param {Vector} Y
	 * @param {Number} position
	 * @param {Number} derivate
	 * @param {Number} h
	 * @return {Number} derivada en el punto "Position"
	 * */
	centeredDifferencesH2 : function(X, Y, position, derivate, h) {
		var size = math.subset(math.size(Y), math.index(0));
		if(position < 0 || position >= size) {
			throw "Invalid position " + position;
		}
		
		var values = this._getPositions(X, Y, position, h);
		var numerator;
		var denominator;
		switch(derivate) {
			case 1:
				if(!values[2] && !values[4]) {
					// TODO: enviar un mejor mensaje
					throw "f(-1) and f(+1) is not defined for h = " + h;
				}
				numerator = math.add(values[4], -values[2]);
				denominator = math.multiply(2, h);
				break;
			case 2:
				if(!values[2] && !values[4]) {
					// TODO: enviar un mejor mensaje
					throw "f(-1) and f(+1) is not defined for h = " + h;
				}
				numerator = math.add( math.add(values[4], -math.multiply(2, values[3])), values[2]);
				denominator = math.pow(h, 2);
				break;
			case 3:
				if(!values[1] && !values[2] && !values[4] && !values[5]) {
					// TODO: enviar un mejor mensaje
					throw "the f(-2), f(-1), f(+1) and f(+2) is not defined for h = " + h;
				}
				numerator = math.add( values[5], math.add( -values[4], math.add( math.multiply(2, values[2]), -values[1] ) ) );
				denominator = math.multiply(2, math.pow(h, 3));
				break;
			case 4:
				if(!values[1] && !values[2] && !values[4] && !values[5]) {
					// TODO: enviar un mejor mensaje
					throw "f(-2), f(-1), f(+1) and f(+2) is not defined for h = " + h;
				}
				var firstSum = math.add(values[5], -math.multiply(4, values[4]));
				var secondSum = math.add( math.multiply(6, values[3]), -math.multiply(4, values[2]) );
				numerator = math.add(firstSum, math.add(secondSum, values[1]));
				denominator = math.pow(h, 4);
				break;
			default:
				throw "there is no implementation for derivatives greater than 4";
		}
		return math.divide(numerator, denominator);
	},
	
	/*
	 * Esta función recibe dos vectores de coordenadas X's y Y's, la posición en el 
	 * vector donde queremos sacar la derivada, el numero de la derivada y el h a
	 * usar en la fórmula y devuelve la derivada en el punto Position con las fórmulas
	 * de diferencias centradas O(h^4).
	 * 
	 * 
	 * @param {Vector} Y
	 * @param {Number} position
	 * @param {Number} derivate
	 * @param {Number} h
	 * @return {Number} derivate en el punto "Position"
	 * */
	
	centeredDifferencesH4 : function(X, Y, position, derivate, h) {
		var size = math.subset(math.size(Y), math.index(0));
		if(position < 0 || position >= size) {
			throw "Invalid position " + position;
		}
		
		var values = this._getPositions(X, Y, position, h);
		var numerator;
		var denominator;
		alert(values);
		switch(derivate) {
			case 1:
				if(!values[1] && !values[2] && !values[4] && !values[5]) {
					// TODO: enviar un mejor mensaje
					throw "f(-2), f(-1), f(+1) and f(+2) is not defined for h = " + h;
				}
				var firstSum = math.add(-values[5], math.multiply(values[4], 8));
				var secondSum = math.add(-math.multiply(8, values[2]), values[1]);
				numerator = math.add(firstSum, secondSum);
				denominator = math.multiply(12, h);
				break;
			case 2:
				if(!values[1] && !values[2] && !values[4] && !values[5]) {
					// TODO: enviar un mejor mensaje
					throw "f(-2), f(-1), f(+1) and f(+2) is not defined for h = " + h;
				}
				var firstSum = math.add(-values[5], math.multiply(16, values[4]));
				var secondSum = math.add(math.multiply(-30, values[3]), math.multiply(16, values[2]));
				numerator = math.add(firstSum, math.add(secondSum, -values[1]));
				denominator = math.multiply(12, math.pow(h, 2));
				break;
			case 3:
				if(!values[0] && !values[1] && !values[2] && !values[4] && !values[5] && !values[6] ) {
					// TODO: enviar un mejor mensaje
					throw "f(-3), f(-2), f(-1), f(+1), f(+2) and f(+3) is not defined for h = " + h;
				}
				var firstSum = math.add(-values[6], math.multiply(8, values[5]));
				var secondSum = math.add(math.multiply(-13, values[4]), math.multiply(13, values[2]));
				var thirdSum = math.add(multiply(-8, values[1]), values[0]);
				numerator = math.add(firstSum, math.add(secondSum, thirdSum));
				denominator = math.multiply(8, math.pow(h, 3));
				break;
			case 4:
				if(!values[0] && !values[1] && !values[2] && !values[4] && !values[5] && !values[6] ) {
					// TODO: enviar un mejor mensaje
					throw "f(-3), f(-2), f(-1), f(+1), f(+2) and f(+3) is not defined for h = " + h;
				}
				var firstSum = math.add(-values[6], math.multiply(12, values[5]));
				var secondSum = math.add(math.multiply(-39, values[4]), math.multiply(56, values[3]));
				var thirdSum = math.add(math.multiply(-39, values[2]), math.multiply(12, values[1]));
				numerator = math.add(firstSum, math.add(secondSum, math.add(thirdSum, -values[0])));
				denominator = math.multiply(6, math.pow(h, 4));
				break;
			default:
				throw "there is no implementation for derivatives greater than 4";
		}
		return math.divide(numerator, denominator);
	}
}