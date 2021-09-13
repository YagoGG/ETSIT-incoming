import { User } from '../models';

export default {
	up: async (queryInterface) => {
		const studentUser = await User.findOne({
			where: { email: 'student@example.com' },
		});
		await queryInterface.bulkInsert('Applications', [{
			userId: studentUser.id,
			createdAt: new Date(),
			updatedAt: new Date(),
		}], {});
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Applications', null, {});
	},
};
