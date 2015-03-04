/**
 * 
 */

solutionLinearSystem = {
		
	/*
	 * 
	 * Funcion que dado un vector columna y el máximo de ese vector
	 * devuelve el índice donde se encuentra el máximo, en caso de 
	 * haber más de un máximo, devuelve el índice el primero que 
	 * encuentra.
	 * 
	 * @param {Vector} vector
	 * @param {Number, BigNumber} max
	 * 
	 * */
	_getMaxIndex : function(vector, max) {
		var size = math.subset(math.size(vector), math.index(0));
		for(var i = 0; i < size; ++i) {
			var value = math.subset(vector, math.index(i, 0));
			if( math.equal(value, max) ) {
				return i;
			}
		}
	},
	
	/*
	 * Función que recibe una matriz A de la forma triangular superior y un vector
	 * B como vector columna y devuelve la solución del sistema por medio de la 
	 * sustitución regresiva. (Usado por la función solve)
	 * 
	 * @param {Matrix} A
	 * @param {Vector} B
	 * 
	 * */
	_backSubstitution : function(A, B) {
		var n = math.subset(math.size(B), math.index(0));
		var X = math.zeros(n, 1);
		var numerator = math.subset(B, math.index(n - 1, 0));
		var denominator = math.subset(A, math.index(n - 1, n - 1));
		X = math.subset(X, math.index(n - 1, 0), math.divide(numerator, denominator));
		for(var k = n - 2; k >= 0; --k) {
			var firstMultiplier = math.subset(A, math.index(k, [k + 1, n]));
			var secondMultiplier = math.subset(X, math.index([k + 1, n], 0));
			var multiplier = math.multiply(firstMultiplier, secondMultiplier);
			var numerator = math.add(math.subset(B, math.index(k, 0)), math.multiply(-1, multiplier));
			var denominator = math.subset(A, math.index(k, k));
			X = math.subset(X, math.index(k, 0), math.divide(numerator, denominator));
		}
		return X;
	},
	
	/* Función que soluciona el sistema de ecuaciones.
	 * B debe ser dado como vector columna
	 *  
	 * @param {Matrix} A 
	 * @param {Matrix} B 
	 * @return {Matrix} res
	 * */
	solve : function(A, B) {
		var size = math.subset(math.size(A), math.index(0));
		var X = math.zeros(size);
		var C = math.zeros(1, size+1);
		var augmentedMatrix = math.concat(A, B);
		for(var q = 0; q < size - 1; ++q) {
			var subMatrix = math.subset(augmentedMatrix, math.index([q, size], q));
			var maxk = math.max(subMatrix);
			var maxIndex = this._getMaxIndex(subMatrix, maxk);
			var C = math.subset(augmentedMatrix, math.index(q, [0, size + 1]));
			var replaceMatrix = math.subset(augmentedMatrix, math.index(maxIndex + q, [0, size + 1]));
			augmentedMatrix = math.subset(augmentedMatrix, math.index(q, [0, size + 1]), replaceMatrix, 0);
			augmentedMatrix = math.subset(augmentedMatrix, math.index(maxIndex + q, [0, size + 1]), C);
			if(math.equal(math.subset(augmentedMatrix, math.index(q, q)), 0)) {
				throw "the matrix A is singular";
			}
			for(var k = q + 1; k < size; ++k) {
				var numerator = math.subset(augmentedMatrix, math.index(k, q));
				var denominator = math.subset(augmentedMatrix, math.index(q, q));
				var m = math.divide(numerator, denominator);
				var firstSum = math.subset(augmentedMatrix, math.index(k, [q, size + 1]));
				var secondSum = math.multiply(-m, math.subset(augmentedMatrix, math.index(q, [q, size + 1])));
				var value = math.add(firstSum, secondSum);
				augmentedMatrix = math.subset(augmentedMatrix, math.index(k, [q, size + 1]), value);
			}
		}
		var A = math.subset(augmentedMatrix, math.index([0, size], [0, size]));
		var B = math.subset(augmentedMatrix, math.index([0, size], size));
		return this._backSubstitution(A, B);
	}
}