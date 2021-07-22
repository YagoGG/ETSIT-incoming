import { User } from '../models';

export default {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('Users', [{
			firstName: 'John',
			lastName: 'Doe',
			email: 'student@example.com',
			password: await User.hashPassword('student'),
			role: User.STUDENT_ROLE,
			temporaryPassword: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		}, {
			firstName: 'Administrator',
			email: 'international@example.com',
			password: await User.hashPassword('admin'),
			role: User.ADMIN_ROLE,
			temporaryPassword: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
