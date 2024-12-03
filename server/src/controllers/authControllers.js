const authService = require('../services/auth-service');

class AuthControllers {
	async registration(req, res, next) {
		try {
			const { fullName, email, password } = req.body;
			const authData = await authService.registration(
				fullName,
				email,
				password
			);
			res.cookie('refreshToken', authData.refreshToken, {
				maxAge: 60 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.status(200).json(authData);
		} catch (error) {
			console.log('Error is: ', error);
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const authData = await authService.login(email, password);
			res.cookie('refreshToken', authData.refreshToken, {
				maxAge: 60 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.status(200).json(authData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const token = await authService.logout(refreshToken)
			res.clearCookie('refreshToken')
			res.status(200).json(token)
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			console.log('Refresh token is: ------------', refreshToken)
			const authData = await authService.refresh(refreshToken);
			console.log('Auth data is: ------------', authData)
			res.cookie('refreshToken', authData.refreshToken, {
				maxAge: 60 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.status(200).json(authData);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await authService.getAllusers();
			console.log('Users is: ------------', users)
			if(users.length > 0){
				res.status(200).json(users);
			}else {
				res.status(401)
			}
			
		} catch (error) {
			console.log('Get users error is: ', error);
			next(error);
		}
	}
}

module.exports = new AuthControllers();
