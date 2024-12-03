require('dotenv').config();

module.exports = {
	development: {
		host: process.env.DB_HOST,
		port: process.env.MONGO_PORT,
		dbName: process.env.MONGO_DB_NAME,
	},
};
