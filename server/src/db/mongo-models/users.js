const { Schema, model }= require('mongoose');
const bcrypt = require('bcrypt');

const { EMAIL_VALIDATION_SCHEMA } = require('../../utils/validSchemas');

const saltRounds = 10;

const usersSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			validate: {
				validator: (value) =>
					EMAIL_VALIDATION_SCHEMA.isValidSync(value),
			},
		},
		password: {
			type: String,
			required: true,
		},
    roleId: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

usersSchema.pre('save', async function (next) {
	const user = this;

	if (!user.isModified('password')) {
	console.log('Not hashed')
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(saltRounds)
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
		console.log('Is hashed')
		next();
	} catch (error) {
		next(error);
	}
});

const User = model('User', usersSchema)

module.exports = User;
