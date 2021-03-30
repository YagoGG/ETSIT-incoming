const bcrypt = require('bcrypt');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config.json')[env];

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('Users', [{
			name: 'John Doe',
			email: 'student@example.com',
			passwordHash: await bcrypt.hash('student', config.server.passwordSaltRounds),
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			name: 'Administrator',
			email: 'international@example.com',
			passwordHash: await bcrypt.hash('admin', config.server.passwordSaltRounds),
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
