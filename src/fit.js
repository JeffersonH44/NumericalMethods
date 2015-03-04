/**
 * 
 */

fit = {
	/*
	 * Ajuste lineal de la forma y = Ax + B
	 * 
	 * @param {Vector} X
	 * @param {Vector} Y
	 * @return {Object} ret (Accediendo a los índices A y B)
	 * */
	linearFit : function(X, Y) {
		/*
		var xmean = math.mean(X);
		var ymean = math.mean(Y);
		var sumx2 = math.multiply(math.add(X, -xmean), math.transpose(math.add(X, -xmean)));
		var sumxy = math.multiply(math.add(Y, -ymean), math.transpose(math.add(X, -xmean)));
		alert(sumx2);
		alert(sumxy);
		var A = math.divide(sumx2, sumxy);
		var B = math.add(ymean, -math.multiply(A, xmean));
		*/
		
		var x2 = math.sum(math.dotPow(X, 2));
		var x = math.sum(X);
		var y = math.sum(Y);
		var xy = math.sum(math.dotMultiply(X, Y));
		var n = math.subset(math.size(X), math.index(0));
		
		var A = math.matrix([[x2, x], [x, n]]);
		var B = math.matrix([[xy], [y]]);
		
		var result = solutionLinearSystem.solve(A, B);
		
		A = math.subset(result, math.index(0, 0));
		B = math.subset(result, math.index(1, 0));
		
		return {
			A : A,
			B : B
		};
	},
	
	/*
	 * Ajuste Potencial de la forma y = Ax^M con un M dado
	 * 
	 * @param {Vector} X
	 * @param {Vector} Y
	 * @param {Number, BigNumber} M
	 * */
	potentialFit : function(X, Y, M) {
		var numerator = 0;
		var denominator = 0;
		var size = math.subset(math.size(X), math.index(0));
		for(var i = 0; i < size; ++i) {
			numerator += math.multiply( math.pow(math.subset(X, math.index(i)), M), math.subset(Y, math.index(i)));
			denominator += math.pow(math.subset(X, math.index(i)), math.multiply(2, M));
		}
		alert(numerator);
		alert(denominator);
		return math.divide(numerator, denominator);
	},
	
	/* 
	 * Linealización de la forma y = Ce^(A * x)
	 * 
	 * @param {Vector} X
	 * @param {Vector} Y
	 * @return {Object} ret
	 * */
	linearization : function(X, Y) {
		var result = this.linearFit(X, math.log(Y));
		return {
			A : result.A,
			C : math.exp(result.B)
		};
	},
	
	/*
	 * Ajuste polinomial a un polinomio de grado M
	 * 
	 * @param {Vector} X
	 * @param {Vector} Y
	 * @param {Number, BigNumber} M 
	 * */
	
	polinomialFit : function(X, Y, M) {
		M++;
		var n = math.subset(math.size(X), math.index(0));
		var F = math.zeros(n, M);
		var B = math.zeros(M);
		for(var k = 0; k < M; ++k) {
			var temp1 = math.subset(F, math.index([0, n], k));
			var temp2 = math.transpose(math.dotPow(X, k));
			F = math.subset(F, math.index([0, n], k), math.transpose(math.dotPow(X, k)));
		}
		var transposeF = math.transpose(F);
		var A = math.multiply(transposeF, F);
		B = math.multiply(transposeF, math.transpose(Y));
		
		/*
		 * Transponer el vector, no soportado por Mathjs
		 * */
		var size = math.subset(math.size(B), math.index(0));
		var BTransposed = []
		for(var i = 0; i < size; ++i) {
			BTransposed[i] = [];
			BTransposed[i][0] = math.subset(B, math.index(i));
		}
		B = math.matrix(BTransposed);
		var constants = solutionLinearSystem.solve(A, B);
		return constants;
	}
}