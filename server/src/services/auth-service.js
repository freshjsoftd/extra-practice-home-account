const bcrypt = require('bcrypt');
// ====================================
const { User } = require('../db/mongo-models');
const tokenService = require('./token-service');
const AuthError = require('../errors/auth-error');

class AuthService {
	async registration(fullName, email, password) {
		const person = await User.findOne({ email });

		if (person) throw AuthError.badRequest('This user already exists');

		// if (person) throw new Error('This user already exists');
		const user = await User.create({
			fullName,
			email,
			password,
		});

		const tokens = tokenService.generateTokens({ email });

		const userId = user._id;

		// console.log(userId);

		await tokenService.saveToken(userId, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: userId,
				email,
			},
		};
	}

	async login(email, password) {
		const user = await User.findOne({ email });

		if (!user) throw AuthError.unAuthorizedError();

		const isPassRight = await bcrypt.compare(password, user.password);

		if (!isPassRight) throw AuthError.unAuthorizedError();

		const tokens = tokenService.generateTokens({ email });

		const userId = await User.findOne({ email }, { _id: 1 });

		await tokenService.saveToken(userId, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: userId,
				email,
			},
		};
	}

	async logout(refreshToken) {
		const token = await tokenService.deleteToken(refreshToken);

		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw AuthError.unAuthorizedError();

		const data = tokenService.validateRefreshToken(refreshToken);

		console.log('Data is: ', data);

		const dbToken = await tokenService.findToken(refreshToken);

		if (!data || !dbToken) throw AuthError.unAuthorizedError();

		// const user = await User.findById(data._id);

		const { email } = data;

		console.log('Email is:', email);

		const tokens = tokenService.generateTokens({ email });

		const userId = await User.findOne({ email }, { _id: 1 });

		await tokenService.saveToken(userId, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: userId,
				email,
			},
		};
	}

	async getAllusers() {
		const users = await User.find();
		return users;
	}
}

module.exports = new AuthService();
