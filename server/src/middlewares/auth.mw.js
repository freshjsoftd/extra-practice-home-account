const AuthError = require('../errors/auth-error');
const tokenService = require('../services/token-service');

module.exports.authHandler = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		console.log('Headers is: ', req.headers);
		if (!authHeader) {
			return next(AuthError.unAuthorizedError());
		}
		const accessToken = authHeader.split(' ')[1];
		console.log('Access token is: ', accessToken);
		if (!accessToken) {
			return next(AuthError.unAuthorizedError());
		}
		const data = tokenService.validateAccessToken(accessToken);
		if (!data) {
			return next(AuthError.unAuthorizedError());
		}
		req.user = data;
		next();
	} catch (error) {
		return next(AuthError.unAuthorizedError());
	}
};
