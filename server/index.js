const http = require('http');
// ====================================
require('dotenv').config();
// ====================================
const app = require('./src/app');
const db = require('./src/db/models');
const dbMongo = require('./src/db/mongo-models');
const { users, roles } = require('./src/constants/mongoDate');

const {User, Role} = dbMongo;

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const dbCheck = async () => {
	try {
		await db.sequelize.authenticate();
		console.log(
			`Connection with DB << ${process.env.DB_NAME} >> has been done successfully`
		);
	} catch (error) {
		console.log(
			`Can't connect to DB ${process.env.DB_NAME}`,
			error.message
		);
	}
};

dbCheck();

const createUsers = async () => {
	await User.create(users);
};

const createRoles = async () => {
	await Role.insertMany(roles);
};

// createRoles();
// createUsers();

server.listen(PORT, () =>
	console.log(`Server has been started on port ${PORT}`)
);
